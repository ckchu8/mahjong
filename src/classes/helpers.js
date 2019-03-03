import { Suits } from './constants.js'

var Helpers = {
  image_path: function(suit, value) {
    return "assets/tiles/" + suit + "-" + value + ".png";
  },
  isHonorsSuit: function(suit) {
    return [ Suits.DRAGON, Suits.WIND ].indexOf(suit) !== -1;
  },
  allSuits: function() {
    return [ Suits.DOTS, Suits.STICKS, Suits.CHARACTERS, Suits.DRAGON, Suits.WIND ];
  },
  capitalize: function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
};

export { Helpers }
