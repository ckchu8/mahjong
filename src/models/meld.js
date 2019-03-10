import { MeldTypes, Suits, Dragons } from './constants.js'
import Tile from './tile.js'

export default class Meld {

  constructor(is_open, type, tiles, id) {
    this.is_open = is_open;
    this.type = type;
    this.tiles = tiles;
    this.id = id;
  }

  to_s() {
    var result = [];
    result.push(this.is_open ? 'Open:' : 'Closed:');
    this.tiles.forEach(tile => {
      result.push(tile.to_s());
    });
    return result.join(' ');
  }

  static createTiles(type, suit, value) {
    let tiles = [];
    if(type == MeldTypes.CHI) {
      if(value > 7) {
        value = 7;
      }
      tiles = [new Tile(suit, value), new Tile(suit, value + 1), new Tile(suit, value + 2)];
    }
    else {
      var additional = 0;
      switch(type) {
        case MeldTypes.PAIR:
          additional = 2; break;
        case MeldTypes.PON:
          additional = 3; break;
        case MeldTypes.KAN:
          additional = 4; break;
      }
      for(let i = 0; i < additional; ++i) {
        tiles.push(new Tile(suit, value));
      }
    }
    return tiles;
  }

  isChi() {
    return this.type === MeldTypes.CHI;
  }

  isPon() {
    return this.type === MeldTypes.PON;
  }

  isKan() {
    return this.type === MeldTypes.KAN;
  }

  isPair() {
    return this.type === MeldTypes.PAIR;
  }

  isHonors() {
    if(this.tiles.length > 0) {
      return this.tiles[0].isHonor();
    }
    return false;
  }

  isSimples() {
    return this.tiles.every(function(tile) {
      return tile.isSimple()
    })
  }

  isOuters() {
    return this.tiles.some(function(tile) {
      return tile.isOuter()
    })
  }

  suit() {
    if(this.tiles.length > 0) {
      return this.tiles[0].suit;
    }
    return '';
  }

  baseValue() {
    return this.tiles.length > 0 ? this.tiles[0].value : 0;
  }

  isDragon() {
    return this.suit() === Suits.DRAGON
  }

  isWind() {
    return this.suit() === Suits.WIND
  }

  isDots() {
    return this.suit() === Suits.DOTS
  }

  isCharacters() {
    return this.suit() === Suits.CHARACTERS
  }

  isSticks() {
    return this.suit() === Suits.STICKS
  }

  size() {
    return this.tiles.length;
  }

  isGreen() {
    let base_value = this.baseValue();
    let suit = this.suit();
    if(suit === Suits.DRAGON && base_value === Dragons.GREEN) {
      return true
    }

    if(suit === Suits.STICKS && this.isChi() && base_value == 2) {
      return true
    }

    if(suit == Suits.STICKS &&
      (this.isPon() || this.isKan() || this.isPair()) &&
      [2,3,4,6,8].indexOf(base_value) > -1) {
      return true
    }

    return false
  }

}
