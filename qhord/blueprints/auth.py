import functools
from flask_login import login_user, current_user, logout_user, login_required
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for)
from werkzeug.security import check_password_hash, generate_password_hash
from qhord import bcrypt, db
from qhord.models import User
from qhord.blueprints.forms.auth import RegistrationForm, LoginForm

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/register', methods=('GET', 'POST'))
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashpass = bcrypt.generate_password_hash(form.password.data)
        hashed_password = hashpass.decode('utf-8')
        user = User(username=form.username.data,
                    email=form.email.data,
                    password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('auth.login'))
    return render_template('auth/register.html', title='Register', form=form)

@auth.route('/login', methods=('GET', 'POST'))
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            flash('Login Success! Welcome back to Qhord.', 'success')
            return redirect(next_page) if next_page else redirect(url_for('main.home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')

    return render_template('auth/login.html', title='Login', form=form)

@auth.route('/logout')
def logout():
    session.clear()
    logout_user()
    return redirect(url_for('main.home'))
