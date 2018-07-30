from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import RadioField, SubmitField, BooleanField, IntegerField
from wtforms.validators import (
    DataRequired, Length, Email, EqualTo, ValidationError)
from flask_login import current_user

class MakeBellgameForm(FlaskForm):
    game_type = RadioField('What Type of Game?',
                           choices=[
                               ('1', 'Single Player'),
                               ('2', '2-Player')],
                           validators=[DataRequired()])
    submit = SubmitField('Start Playing!')

class JoinBellgameForm(FlaskForm):
    game_to_join = RadioField('Which Game do you want to join?',
                              choices=[],
                              validators=[DataRequired()])
    submit = SubmitField('Join Game!')

class BellgameForm(FlaskForm):
    pass
