import os
import sys
sys.path.append(os.environ['QCASINO_BASE_DIR'])
from flask_bcrypt import Bcrypt
import uuid
from flask_migrate import Migrate, MigrateCommand
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask import Flask, current_app
import qhord
from qhord.config.configuration_objects import TestConfig
from sqlalchemy.exc import IntegrityError

app = qhord.create_app()
app.config.from_object(TestConfig())

print('DB at ' + app.config['SQLALCHEMY_DATABASE_URI'])
db = SQLAlchemy(app)
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)

@manager.command
def add_admin():
    try:
        admin_pass = os.environ['QCASINO_ADMIN_PASS']
        admin_uname = os.environ['QCASINO_ADMIN_USERNAME']
        admin_email = os.environ['QCASINO_ADMIN_EMAIL']
    except:
        admin_pass = 'pass'
        admin_uname = 'uname'
        admin_email = 'e@e.com'
    ai_uname = 'ai'
    ai_email = 'ai@qhord.com'
    waiting_uname = 'Waiting on second player'
    waiting_email = 'waiting@qhord.com'

    crypt = Bcrypt()

    hashpass = crypt.generate_password_hash(admin_pass)
    hashed_password = hashpass.decode('utf-8')
    with manager.app.app_context():
        from qhord import db
        admin = qhord.models.User(username=admin_uname,
                     email=admin_email,
                     password=hashed_password,
                     admin=True,
                     confirmed=True,
                     confirmed_on=db.func.now())
        ai = qhord.models.User(id=0,
                               username=ai_uname,
                               email=ai_email,
                               password=str(uuid.uuid4()),
                               admin=False,
                               confirmed=True,
                               confirmed_on=db.func.now())
        waiting = qhord.models.User(id=2,
                               username=waiting_uname,
                               email=waiting_email,
                               password=str(uuid.uuid4()),
                               admin=False,
                               confirmed=True,
                               confirmed_on=db.func.now())
        try:
            db.session.add(admin)
            print('Admin set')
            db.session.add(ai)
            print('AI set')
            db.session.add(waiting)
            print('Waiting set')
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            print(e)
            print('Whoops! Admin already set!')

if __name__ == "__main__":
    manager.run()
