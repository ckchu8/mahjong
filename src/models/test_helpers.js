import Meld from './meld.js'

var TestHelpers = {
  
  createMeldOf(type, suit, value, is_open) {
    let set_is_open = is_open || false;
    return new Meld(set_is_open, type, Meld.createTiles(type, suit, value), 0);
  },

};

export { TestHelpers }
