import click
import flask
from flask_admin import Admin
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from qhord import create_app

application = create_app()

if __name__ == "__main__":
    application.run()
