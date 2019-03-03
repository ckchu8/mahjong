import { Suits } from './constants.js'
import { Helpers } from './helpers.js'

export default class Tile {

  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  to_s() {
    return this.suit + '-' + this.value;
  }

  image() {
    return Helpers.image_path(this.suit, this.value);
  }

  isDragon() {
    return this.suit === Suits.DRAGON;
  }

  isWind() {
    return this.suit === Suits.WIND;
  }

  isDots() {
    return this.suit === Suits.DOTS;
  }

  isSticks() {
    return this.suit === Suits.STICKS;
  }

  isCharacters() {
    return this.suit == Suits.CHARACTERS;
  }

  isHonor() {
    return this.isDragon() || this.isWind();
  }

  isSimple() {
    return !this.isHonor() && this.value >= 2 && this.value <= 8;
  }

  isOuter() {
    return !this.isHonor() && (this.value == 1 || this.value == 9);
  }
}
