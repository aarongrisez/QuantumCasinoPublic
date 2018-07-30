import os
from qhord.server.utils import full_path

class InstanceConfig:
    try:
        SECRET_KEY = os.environ['QCASINO_SECRET_KEY']
        host = os.environ['RDS_HOSTNAME']
        port = os.environ['RDS_PORT']
        name = os.environ['RDS_DB_NAME']
        uname = os.environ['RDS_USERNAME']
        password = os.environ['RDS_PASSWORD']
        SQLALCHEMY_DATABASE_URI = 'postgres://' + uname + ':' + password + '@' + host + '/qhordapp'
        SQLALCHEMY_TRACK_MODIFICATIONS = False
        RECAPTCHA_PUBLIC_KEY = os.environ['QCASINO_RECAPTCHA_PUBLIC']
        RECAPTCHA_PRIVATE_KEY = os.environ['QCASINO_RECAPTCHA_PRIVATE']
    except:
        print('Something wonky went on with the InstanceConfig, hopefully you are in test mode right now.')

class TestConfig:
    try:
        SECRET_KEY = os.environ['QCASINO_SECRET_KEY'] 
        host = None
        port = None
        name = None
        uname = None
        password = None
        SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.environ['QCASINO_BASE_DIR'] + '/qhord/tmp/site.db'
        SQLALCHEMY_TRACK_MODIFICATIONS = False
        RECAPTCHA_PUBLIC_KEY = os.environ['QCASINO_RECAPTCHA_PUBLIC']
        RECAPTCHA_PRIVATE_KEY = os.environ['QCASINO_RECAPTCHA_PRIVATE']
    except:
        print('Something wonky went on with the TestConfig, hopefully you are in production mode right now.')
