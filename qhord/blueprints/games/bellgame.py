"""
This class contains everything needed for an instance of the Bellgame
"""

from flask import Blueprint
from qhord import db
from qhord.blueprints.games.bellgame_forms import BellgameForm
from qhord.models import User, Bellgame, Trial_DB
from qhord.server.visualization import success_pi
import random

class BellgameManager():
    """
    This class contains all information pertainent to a session instance of the
    game. It does not have direct access to trials or turns 
    """

    def __init__(self,
                 host_id_=None, #Players as ID
                 guest_id_=None, #Players as ID
                 token=None,
                 game_dict=None,
                 mode='SinglePlayer'):
        if game_dict == None:
            if mode=='SinglePlayer':
                self.host=Player(id_=host_id_)
                self.guest=Player(id_=0)
            elif mode=='TwoPlayerHost':
                self.host=Player(id_=host_id_)
                self.guest=Player(id_=2)
            elif mode=='TwoPlayerComplete':
                self.host=Player(id_=host_id_)
                self.guest=Player(id_=guest_id_)
            self.game=Game(host=self.host, #Players as objects
                           guest=self.guest, #Players as objects
                           token=token,
                           mode=mode)
            self.mode = mode
            self.form=BellgameForm()
            self.graph=success_pi(successes=0,
                                  failures=0)
            self.score = 0
        else:
            self.game_dict = game_dict
            self.form=BellgameForm()
            self.graph=success_pi(successes=0,
                                  failures=0)

    def first_run(self):
        self.load_from_dict()
        self.mode = self.game.mode
        self.game_db_entry = Bellgame(host=self.host.get_row(),
                                      guest=self.guest.get_row(),
                                      token=self.game.token)
        db.session.add(self.game_db_entry)
        db.session.commit()

    def first_run_complete(self):
        self.load_from_dict()
        self.mode = self.game.mode
        self.game_db_entry = Bellgame.query.filter_by(
                                      host=self.host.get_row(),
                                      guest=self.guest.get_row(),
                                      token=self.game.token)

    def run(self, **kwargs):
        self.load_from_dict()
        self.mode = self.game.mode
        self.game.play_trial(**kwargs)
        if self.mode == 'SinglePlayer':
            self.success = self.game.trial.score
            self.score += self.success
        self.update()

    def stash(self):
        pass

    def update(self):
        self.game.update()
        game_row = Bellgame.query.filter_by(token=self.game.token).first()
        game_row.wins = self.game.wins
        game_row.losses = self.game.losses
        db.session.commit()

    def to_json(self):
        return {
            'host': self.host.to_json(),
            'guest': self.guest.to_json(),
            'game': self.game.to_json(),
            'score': self.score
        }

    def load_from_dict(self):
        game_args = self.game_dict['game']
        host_args = self.game_dict['host']
        guest_args = self.game_dict['guest']
        self.score=self.game_dict['score']
        self.game=Game(**game_args)
        self.host = Player(**host_args)
        self.guest = Player(**guest_args)

    def __repr__(self):
        return 'Game manager for ' + str(self.game.token)

class Player():

    def __init__(self, id_=None, strategy=None, measurement=None, player_type=None):
        """
        Accepts 2 types of players, Human, and AI
        """
        if id_ == 0:
            self.player_type = 'ai'
        elif id_ == 2:
            self.player_type = 'waiting'
        elif id_ != 0:
            self.player_type = 'human'
        elif id_ == None:
            raise ValueError('Player did_ not get a proper user_ID')
        self.id_ = id_
        self.measurement = measurement
        self.strategy = strategy

    def set_measurement(self, measurement=None):
        if self.player_type == 'human':
            self.measurement = measurement
        elif self.player_type == 'waiting':
            self.measurement = 'Waiting'
        else:
            self.measurement = random.getrandbits(1)

    def get_row(self):
        """
        Return ORM Object
        """
        return User.query.get(self.id_)

    def set_strategy(self, strategy):
        if strategy != None:
            self.strategy = strategy

    def to_json(self):
        return {
            'player_type': self.player_type,
            'id_': self.id_,
            'measurement': self.measurement,
            'strategy': self.strategy
        }

class Game():

    def __init__(self,
                 host, #Players passed as objects
                 guest, #Players passed as objects
                 next_hint=None,
                 token=False,
                 num_trials=0,
                 mode='NONE'):
        if isinstance(host, Player):
            self.host = host
            self.guest = guest
        elif type(host) == dict:
            self.host = Player(**host)
            self.guest = Player(**guest)
        else:
            raise ValueError('Something funky with making Player objects')
        self.success = 0
        self.failure = 0
        self.next_hint = next_hint
        if not token:
            raise ValueError('Bellgame did_ not get a proper ID')
        else:
            self.token = token
        self.trial = Trial(token=token)
        self.mode=mode

    def valid_ate_players_single_player(self):
        assert self.host.player_type == 'human'
        assert self.guest.player_type == 'ai'

    def play_trial(self, host_measurement):
        """
        Takes the last element of Trial and plays, needs to wait for
        user input: user_measurement
        """
        self.host.set_measurement(host_measurement)
        if self.mode=='SinglePlayer':
            self.valid_ate_players_single_player()
            self.guest.set_measurement()
            self.trial.score_trial(self.host.measurement, self.guest.measurement)
        elif self.mode=='TwoPlayerHost':
            self.trial.stash_trial(self.host.measurement)
        else:
            raise AttributeError('Game did not receive a proper mode')
        self.update()

    def get_trials(self):
        return db.session.query(Trial_DB).filter(Trial_DB.token==self.token,
                                                 Trial_DB.measurement_two!=None)

    def get_wins(self):
        wins = 0
        for i in self.trials_complete:
            wins += i.score
        return wins

    def get_losses(self):
        return self.num_trials_complete - self.wins

    def update(self):
        self.trials_complete = self.get_trials()
        self.num_trials_complete = self.trials_complete.count()
        self.wins = self.get_wins()
        self.losses = self.get_losses()

    def get_stats(self):
        """
        Gets all trials associated with this token
        """
        self.update()
        self.next_hint = random.getrandbits(1)
        return {
            'next_hint': self.next_hint,
            'num_trials': self.num_trials_complete,
            'wins': self.wins,
            'losses': self.losses,
            'host_hint': self.trial.hint_one,
            'guest_hint': self.trial.hint_two,
            'host_measurement': self.trial.measurement_one,
            'guest_measurement': self.trial.measurement_two
        }

    def get_row(self):
        """
        Returns ORM object for the game's row, allows for relations to be built
        at runtime
        """
        return Bellgame.query.get(self.id_)

    def to_json(self):
        if type(self.host) == dict:
            return {
                'host': self.host,
                'guest': self.guest,
                'token': self.token,
                'next_hint': self.next_hint,
                'mode': self.mode
            }
        else:
            return {
                'host': self.host.to_json(),
                'guest': self.guest.to_json(),
                'token': self.token,
                'next_hint': self.next_hint,
                'mode': self.mode
            }

class Trial():

    def __init__(self,
                 single_player=True,
                 strategy=None,
                 token=None,
                 next_hint=None):
        if next_hint == None:
            self.hint_one = random.getrandbits(1)
        else:
            self.hint_one = next_hint
        self.hint_two = random.getrandbits(1)
        self.score = None
        self.strategy = strategy
        self.token = token

    def score_trial(self, p_one_m, p_two_m):
        self.measurement_one = p_one_m
        self.measurement_two = p_two_m
        self.score = self.success(self.hint_one,
                                  self.measurement_one,
                                  self.hint_two,
                                  self.measurement_two)
        self.entry = Trial_DB(hint_one=self.hint_one,
                        hint_two=self.hint_two,
                        measurement_one=self.measurement_one,
                        measurement_two=self.measurement_two,
                        score=self.score,
                        strategy=self.strategy,
                        token=self.token)
        db.session.add(self.entry)
        db.session.commit()

    def stash_trial(self, p_one_m):
        self.measurement_one = p_one_m
        self.measurement_two = None
        self.score = None
        self.entry = Trial_DB(hint_one=self.hint_one,
                        hint_two=self.hint_two,
                        measurement_one=self.measurement_one,
                        measurement_two=self.measurement_two,
                        score=self.score,
                        strategy=self.strategy,
                        token=self.token)
        db.session.add(self.entry)
        db.session.commit()

    def success(self, i, j, k, l):
        if k*l == 0:
            if i == j:
                return 1
            else:
                return 0
        if k*l == 1:
            if i == j:
                return 0
            else:
                return 1

    def to_json(self):
        return {
            'hint_one': self.hint_one,
            'hint_two': self.hint_two,
            'measurement_one': self.measurement_one,
            'measurement_two': self.measurement_two,
            'strategy': self.strategy,
            'token': self.token
        }
