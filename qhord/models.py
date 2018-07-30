from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app
from flask_sqlalchemy import SQLAlchemy
import qhord
from flask_login import UserMixin, login_manager
import logging
import uuid

from qhord import db

@qhord.login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

#logging.basicConfig()
#logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    confirmed = db.Column(db.Boolean, nullable=False, default=False)
    confirmed_on = db.Column(db.DateTime, nullable=True,
                                   default=db.func.now())

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f"User: {self.username}"

class Bellgame(db.Model):
    __tablename__ = 'bellgame'
    host_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    guest_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    token = db.Column(db.String(40), unique=True, nullable=False,
                      primary_key=True)
    wins = db.Column(db.Integer, default=0, nullable=True)
    losses = db.Column(db.Integer, default=0, nullable=True)
    awaiting_guest = db.Column(db.Boolean, default=True, nullable=False)

    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)

    host = db.relationship(User, lazy='joined',
                           foreign_keys='Bellgame.host_id',
                           backref='games_ashost')
    guest = db.relationship(User, lazy='joined',
                            foreign_keys='Bellgame.guest_id',
                            backref='games_asguest')

    def __repr__(self):
        if self.wins + self.losses != 0:
            return (f"""Host: {self.host}, Guest: {self.guest}, Token: {self.token},
                    Score: {self.wins / (self.wins + self.losses):.2f}""")
        else:
            return (f"""Host: {self.host}, Guest: {self.guest}, Token: {self.token},
                    Score: None yet""")

class Trial_DB(db.Model):
    __tablename__ = 'trial_db'
    id = db.Column(db.Integer, primary_key=True)
    hint_one = db.Column(db.SmallInteger, nullable=False)
    hint_two = db.Column(db.SmallInteger, nullable=True)
    measurement_one = db.Column(db.SmallInteger, nullable=False)
    measurement_two = db.Column(db.SmallInteger, nullable=True)
    score = db.Column(db.SmallInteger, nullable=True)
    strategy = db.Column(db.SmallInteger, default=0, nullable=False)
    token = db.Column(db.String(40), db.ForeignKey('bellgame.token'))

    def __init__(self, hint_one, hint_two, measurement_one, measurement_two,
                 score, strategy, token):
        self.hint_one = hint_one
        self.hint_two = hint_two
        self.measurement_one = measurement_one
        self.measurement_two = measurement_two
        self.score = score
        self.strategy = strategy
        self.token = token
    game = db.relationship(Bellgame, lazy='joined',
                           foreign_keys='Trial_DB.token',
                           backref='trials')
