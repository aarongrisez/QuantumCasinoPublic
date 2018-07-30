"""First Revision

Revision ID: e2d85c64c617
Revises:
Create Date: 2018-07-19 11:49:28.188282

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e2d85c64c617'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'user',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('username', sa.String(20), unique=True, nullable=False),
        sa.Column('email', sa.String(120), unique=True, nullable=False),
        sa.Column('password', sa.String(60), nullable=False),
        sa.Column('admin', sa.Boolean, nullable=False, default=False),
        sa.Column('confirmed', sa.Boolean, nullable=False, default=False),
        sa.Column('confirmed_on', sa.DateTime, nullable=True)
    )
    op.create_table(
        'bellgame',
        sa.Column('host_id', sa.Integer, sa.ForeignKey('user.id')),
        sa.Column('guest_id', sa.Integer, sa.ForeignKey('user.id')),
        sa.Column('token', sa.String(40), unique=True, nullable=False,
                  primary_key=True),
        sa.Column('score', sa.Integer, default=0, nullable=False),
    )
    op.create_table(
        'trial_db',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('hint_one', sa.SmallInteger, nullable=False),
        sa.Column('hint_two', sa.SmallInteger, nullable=False),
        sa.Column('measurement_one', sa.SmallInteger, nullable=False),
        sa.Column('measurement_two', sa.SmallInteger, nullable=False),
        sa.Column('score', sa.SmallInteger, nullable=False),
        sa.Column('strategy', sa.SmallInteger, default=0, nullable=False),
        sa.Column('token', sa.String(40))
    )

def downgrade():
    op.drop_table('user')
    op.drop_table('bellgame')
    op.drop_table('trial_db')
