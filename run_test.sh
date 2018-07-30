export QCASINO_SECRET_KEY=dev
export QCASINO_MODE=test
export QCASINO_BASE_DIR=$(pwd)
export QCASINO_RECAPTCHA_PUBLIC=None
export QCASINO_RECAPTCHA_PRIVATE=None
export RDS_HOSTNAME=None
export RDS_PORT=None
export RDS_DB_NAME=None
export RDS_DB_UNAME=None
export RDS_PASSWORD=None

python application.py
