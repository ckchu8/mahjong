import { MeldTypes, Suits, Dragons } from './constants.js'

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
    return this.tiles[0].isHonor()
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

  base_value() {
    return this.tiles[0].value
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
    if(this.suit() == Suits.DRAGON && this.base_value() == Dragons.GREEN) {
      return true
    }

    if(this.suit() == Suits.STICKS && this.isChi() && this.base_value() == 2) {
      return true
    }

    if(this.suit() == Suits.STICKS && (this.isPon() || this.isKan() || this.isPair()) &&
       (
         this.base_value() == 2 ||
         this.base_value() == 3 ||
         this.base_value() == 4 ||
         this.base_value() == 6 ||
         this.base_value() == 8
       )
    ){
      return true
    }

    return false
  }

}
