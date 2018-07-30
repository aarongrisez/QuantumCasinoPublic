"""
Defines Admin views and permissions
"""

from flask import redirect, url_for
from flask_admin.contrib.sqla import ModelView
from flask_login import current_user
from flask_sqlalchemy import SQLAlchemy
from qhord.models import User, Trial_DB, Bellgame

db = SQLAlchemy()

class BaseAdmin(ModelView):

    def __init__(self, *args, **kwargs):
        super(BaseAdmin, self).__init__(*args, **kwargs)

    def is_accessible(self):
        return current_user.is_authenticated and current_user.admin

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('auth.login'))

class AdminUserDashboard(BaseAdmin):

    def __init__(self):
        super(AdminUserDashboard, self).__init__(User, db.session)

class AdminTrialDashboard(BaseAdmin):

    def __init__(self):
        super(AdminTrialDashboard, self).__init__(Trial_DB, db.session)

class AdminGameDashboard(BaseAdmin):

    def __init__(self):
        super(AdminGameDashboard, self).__init__(Bellgame, db.session)
