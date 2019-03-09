//import Hand from './hand.js'
//import Meld from './meld.js'
import Tile from './tile.js'
import { MeldTypes } from './constants.js'

var TestHelpers = {
  
  createMeldTiles: function(type, suit, value) {
    if(type === MeldTypes.CHI) {
      return [new Tile(suit, value), new Tile(suit, value+1), new Tile(suit, value+2)];
    }
    let additional = 0;
    switch(type) {
      case MeldTypes.PON:
        additional = 3; break;
      case MeldTypes.KAN:
        additional = 4; break;
      case MeldTypes.PAIR:
        additional = 2; break;
    }
    let tiles = [];
    for(let i = 0; i < additional; ++i) {
      tiles.push(new Tile(suit, value));
    }
    return tiles;
  },

};

export { TestHelpers }
