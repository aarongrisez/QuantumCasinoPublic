"""Tracking trials_to_games

Revision ID: 5b76768cef6a
Revises: e2d85c64c617
Create Date: 2018-07-24 13:55:46.981705

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5b76768cef6a'
down_revision = 'e2d85c64c617'
branch_labels = None
depends_on = None

def upgrade():
    #I am choosing to drop the column for trial_db token to add this forign
    #key, it seems SQLite does not support adding constraints to existing
    #columns. This means a very small loss of data on the production server
    #because this is only the second migration. Just beware moving forward
    with op.batch_alter_table('trial_db') as batch_op:
        batch_op.drop_column('token')
        batch_op.drop_column('score')
        batch_op.add_column(
                    sa.Column('token', sa.String(40),
                              sa.ForeignKey('bellgame.token', name='trial_to_game')))
        batch_op.add_column(sa.Column('score', sa.Integer, default=0,
                                      nullable=True))
        batch_op.add_column(sa.Column('hint_two', sa.SmallInteger,
                                      nullable=True))
        batch_op.add_column(sa.Column('measurement_two', sa.SmallInteger,
                                      nullable=True))
    with op.batch_alter_table('bellgame') as batch_op:
        batch_op.drop_column('score')
        batch_op.add_column(sa.Column('wins', sa.Integer, default=0,
                                      nullable=True))
        batch_op.add_column(sa.Column('losses', sa.Integer, default=0,
                                      nullable=True))
        batch_op.add_column(sa.Column('awaiting_guest', sa.Boolean,
                                      default=True,
                                      nullable=False))

def downgrade():
    pass
