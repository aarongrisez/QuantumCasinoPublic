export const G = {
  'state': 'test'
}

export const BellgameVanilla = {
  // The name of the game.
  name: 'bellgame-vanilla',

  // Function that returns the initial value of G.
  // setupData is an optional custom object that is
  // passed through the Game Creation API.
  setup: (ctx, setupData) => {
    return { 'state': 'test' }
  },

  moves: {},

  // Everything below is OPTIONAL.

  // Function that allows you to tailor the game state to a specific player.
  playerView: (G, ctx, playerID) => G,

  // The seed used by the pseudo-random number generator.
  seed: 'random-string',

  turn: {

    // Called at the beginning of a turn.
    onBegin: (G, ctx) => G,

    // Called at the end of a turn.
    onEnd: (G, ctx) => G,

    // Ends the turn if this returns true.
    endIf: (G, ctx) => true,

    // Called at the end of each move.
    onMove: (G, ctx) => G,

    // Ends the turn automatically after a number of moves.
    moveLimit: 1,

    // Calls setActivePlayers with this as argument at the
    // beginning of the turn.
    activePlayers: {},

    stages: {},
  },

  phases: {},

  // Ends the game if this returns anything.
  // The return value is available in `ctx.gameover`.
  endIf: (G, ctx) => {},
}