import functools
import uuid
from flask_login import login_user, current_user, logout_user, login_required
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for,
    jsonify)
from qhord import db
from qhord.models import User, Bellgame
from qhord.server.visualization import success_pi
from qhord.blueprints.games.bellgame import BellgameManager
from .bellgame_forms import MakeBellgameForm, BellgameForm, JoinBellgameForm

game = Blueprint('game', __name__, url_prefix='/game')

@game.route('/bellgame_make_lobby', methods=('GET', 'POST'))
def bellgame_make_lobby():
    if not current_user.is_authenticated:
        flash('Uh oh...looks like you aren\'t logged it. You need to '+
              'be logged in to play.', 'danger')
        return redirect(url_for('main.home'))
    make_game_form = MakeBellgameForm(prefix='newGame')
    if make_game_form.validate_on_submit():
        token = str(uuid.uuid4())
        if make_game_form.game_type.data == '1':
            mode = 'SinglePlayer'
        elif make_game_form.game_type.data == '2':
            mode = 'TwoPlayerHost'
        game_manager = BellgameManager(host_id_=current_user.get_id(),
                                       guest_id_=0,
                                       token=token,
                                       mode=mode)
        session['game_manager'] = game_manager.to_json()
        flash('Congrats, your game is set up!', 'info')
        if mode=='SinglePlayer':
            return redirect(url_for('game.bellgame_single_player') + '?token=' +
                            str(token))
        if mode=='TwoPlayerHost':
            return redirect(url_for('game.bellgame_two_player') + '?token=' +
                            str(token))
    return render_template('games/make_bellgame.html',
                           title='Get Ready to Play',
                           form=make_game_form)

@game.route('/bellgame_join_lobby', methods=('GET', 'POST'))
def bellgame_join_lobby():
    if not current_user.is_authenticated:
        flash('Uh oh...looks like you aren\'t logged it. You need to '+
              'be logged in to play.', 'danger')
        return redirect(url_for('main.home'))
    join_game_form = JoinBellgameForm(prefix='joinGame')
    join_game_form.game_to_join.choices = [('hi','hello'),('how','Are you')]
    if join_game_form.validate_on_submit():
        host_id = None #Get Host ID from query
        token = None #Get Token from query
        game_manager = BellgameManager(host_id_=host_id,
                                       guest_id_=current_user.get_id(),
                                       token=token,
                                       mode=mode)
        session['game_manager'] = game_manager.to_json()
        flash('Congrats, your game is set up!', 'info')
        return redirect(url_for('game.bellgame_two_player_complete') + '?token=' +
                        str(token))
    return render_template('games/join_bellgame.html',
                           title='Get Ready to Play',
                           form=join_game_form)

@game.route('/bellgame_single_player', methods=('GET', 'POST'))
def bellgame_single_player():
    if not current_user.is_authenticated:
        flash('Uh oh...looks like you aren\'t logged it. You need to '+
              'be logged in to play.', 'danger')
        return redirect(url_for('main.home'))
    try:
        token = request.args.get('token')
    except Exception as e:
        print(str(e))
    if not token:
        flash('Oops! Not sure how you got here... try logging back in and' + 
              'starting a new game')
        return redirect(url_for('main.home'))
    session_manager = session['game_manager']
    game_manager = BellgameManager(game_dict=session_manager,
                                   mode='SinglePlayer')
    game_manager.load_from_dict()
    game_manager.first_run()
    game_form = game_manager.form
    return render_template('games/bellgame.html',
                           title='Bellgame',
                           form=game_form,
                           hint=game_manager.game.trial.hint_one)

@game.route('/bellgame_two_player', methods=('GET', 'POST'))
def bellgame_two_player():
    if not current_user.is_authenticated:
        flash('Uh oh...looks like you aren\'t logged it. You need to '+
              'be logged in to play.', 'danger')
        return redirect(url_for('main.home'))
    try:
        token = request.args.get('token')
    except Exception as e:
        print(str(e))
    if not token:
        flash('Oops! Not sure how you got here... try logging back in and' + 
              'starting a new game')
        return redirect(url_for('main.home'))
    session_manager = session['game_manager']
    game_manager = BellgameManager(game_dict=session_manager,
                                   mode='TwoPlayer')
    game_manager.load_from_dict()
    game_manager.first_run()
    game_form = game_manager.form
    return render_template('games/bellgame_two_player.html',
                           title='Bellgame',
                           form=game_form,
                           hint=game_manager.game.trial.hint_one)

@game.route('/bellgame_two_player_complete', methods=('GET', 'POST'))
def bellgame_two_player_complete():
    if not current_user.is_authenticated:
        flash('Uh oh...looks like you aren\'t logged it. You need to '+
              'be logged in to play.', 'danger')
        return redirect(url_for('main.home'))
    try:
        token = request.args.get('token')
    except Exception as e:
        print(str(e))
    if not token:
        flash('Oops! Not sure how you got here... try logging back in and' + 
              'starting a new game')
        return redirect(url_for('main.home'))
    session_manager = session['game_manager']
    game_manager = BellgameManager(game_dict=session_manager,
                                   mode='TwoPlayer')
    game_manager.load_from_dict()
    game_manager.first_run_complete()
    game_form = game_manager.form
    return render_template('games/bellgame_two_player.html',
                           title='Bellgame',
                           form=game_form,
                           hint=game_manager.game.trial.hint_one)

@game.route('/bellgame_submit', methods=['GET', 'POST'])
def bellgame_submit():
    session_manager = session['game_manager']
    game_manager = BellgameManager(game_dict=session_manager)
    game_manager.load_from_dict()
    host_measurement = request.args.get('measurement', 2, type=int)
    game_manager.run(host_measurement=host_measurement)
    session['game_manager'] = game_manager.to_json()
    return jsonify(game_manager.game.get_stats())
