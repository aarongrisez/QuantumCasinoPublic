from flask import render_template, request, Blueprint
from qhord.server.visualization import success_pi

main = Blueprint('main', __name__)

@main.route("/")
@main.route("/home")
def home():
    page = request.args.get('page', 1, type=int)
    plot = success_pi()
    return render_template('home.html', plot_placeholder=plot)

@main.route("/about")
def about():
    return render_template('about.html', title='About')
