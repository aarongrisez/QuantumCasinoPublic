export QCASINO_SECRET_KEY=dev
export QCASINO_MODE=test
export QCASINO_BASE_DIR=$(pwd)
export QCASINO_RECAPTCHA_PUBLIC=None
export QCASINO_RECAPTCHA_PRIVATE=None
export RDS_HOSTNAME=None
export RDS_PORT=None
export RDS_DB_NAME=None
export RDS_DB_USERNAME=None
export RDS_PASSWORD=None

rm qhord/tmp/site.db
mkdir qhord/tmp
pip install -r requirements.txt
python install/test_build.py db init
python install/test_build.py db upgrade
python install/test_build.py add_admin
