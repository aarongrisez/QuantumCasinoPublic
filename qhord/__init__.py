import os

from flask import Flask
from flask_admin import Admin
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import qhord
from qhord.config.configuration_objects import TestConfig, InstanceConfig

bcrypt = Bcrypt()
db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'
mail = Mail()
migrate = Migrate()
admin = Admin()

print('Components Built')

def create_app():
    # Create and configure app
    print("Beginning App Creation")
    app = Flask(__name__)
    print("App Created")

    mode = os.environ['QCASINO_MODE']

    if mode == 'prod':
        # load instance config, if it exists, when not testing
        configuration = InstanceConfig()
        app.config.from_object(configuration)
        app.testing = False
    elif mode == 'test':
        # load test config if passed in
        configuration = TestConfig()
        app.config.from_object(configuration)
        app.testing = True
    else:
        raise ValueError('''Operating mode is ambiguous, set the QCASINO_MODE env
                         variable to be "prod" or "test"''')

    print("Config Loaded")

    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)
    admin.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    print("Externals initialized")

    from qhord import models
    print("Models Loaded")

    from qhord.blueprints.auth import auth
    from qhord.blueprints.main import main
    from qhord.blueprints.games.game import game
    from qhord.blueprints.admin import AdminUserDashboard, AdminTrialDashboard, AdminGameDashboard
    admin.add_view(AdminUserDashboard())
    admin.add_view(AdminTrialDashboard())
    admin.add_view(AdminGameDashboard())
    app.register_blueprint(auth)
    app.register_blueprint(main)
    app.register_blueprint(game)

    print("Blueprints registered")

    return app
