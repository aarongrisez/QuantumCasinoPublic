# Quantum Casino

[DEMO](http://qhord-test.us-west-2.elasticbeanstalk.com/)

This is a Flask application that is meant to get non-physicists interested in
and understanding Bell's Theorem in Quantum Mechanics. It is a simple
implementation of the CHSH game.

*Note*: This is a copy of the primary repo which is kept private. I am
currently working on purging that repo of any sensitive info (passwords, etc)
that I may have slopily hard-coded.

## Features

### Implemented
* 1-player game with an AI with no strategy

### In Development
* 2-player offline (not real-time)
* Hacked-Together mobile interface

### Future
* AI with strategy
* 2-player online (with sockets)
* Quantum Version -- allowing communication via entangled qubit
* Unlocking Strategies
* Native mobile interface

## Installation
After cloning the repo, I suggest setting up a virtual environment. After
activating the environment, run:

```bash
pip install requirements.txt
```

This installs all required dependencies. Then, run

```bash
bash install/install_test.sh
```

This will ensure the filesystem is set up properly and create a local database
file. The `install_production.sh` script is specifically set up for the
instance on AWS.

## Development
### (aka: hints if you just want to dive into code)
Everything is a fairly straightforward implementation of a Flask App. If you
aren't familiar with Flask, a few quick notes:
1. All the code that's interesting is inside `qhord/`
2. In `qhord/__init__.py`, the main web app is created. The database and a
   bunch of Flask extensions get registered, and the configuration gets loaded.
3. There are 2 main components to every aspect of the component: the blueprint
   and the template. The templates (conveniently in `templates/`) are all the
   html that get sent to users. If you want to make something in the user
   interface, it's probably something to do in the templates. Flask uses a
   library called Jinja to render html templates. This lets us dynamically
   generate html. Anything in `{{}}` is from Jinja.
4. The blueprints (in `blueprints`) are all the endpoints for url's. When a
   client requests a url, Flask runs whatever blueprint is registered at that
   url. Take a look at the `game.py` blueprint. This is where most of the
   action happens. There's an auxiliary module `bellgame.py` with some classes
   that actually contain the game logic.

## Contributing
I GLADLY welcome any and all contributions, from
documentation, to feature implementation, testing/debugging, to
packaging/code-cleanup, etc. My goal is to get this as a public repo by the
middle of August.

Let me know if you have any questions, ideas, or concerns!

-Aaron
