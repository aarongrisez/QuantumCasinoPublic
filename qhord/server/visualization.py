from jinja2 import Markup
from plotly.offline import plot
import plotly.graph_objs as go
from qhord.models import Trial_DB
import numpy as np

def default_stats():
    """
    Returns dict of default stats queried against all trials
    """
    return {
            'successes':Trial_DB.query.filter(Trial_DB.score == 1).count(),
            'failures':Trial_DB.query.filter(Trial_DB.score == 0).count()
            }


def success_pi(successes=None, failures=None):
    """
    Plots a pi chart with success rates, currently has dummy data in it
    """
    # Create random data with numpy

    if successes==None:
        defaults = default_stats()
        successes = defaults['successes']
        failures = defaults['failures']

    labels = ['Successes', 'Failures']
    values = [successes, failures]
    data = go.Pie(labels=labels, values=values)
    html = plot([data], output_type='div')

    return Markup(html)
