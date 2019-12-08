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
}