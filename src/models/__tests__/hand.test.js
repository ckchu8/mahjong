import Hand from '../hand.js'
import Meld from '../meld.js'
//import Tile from '../tile.js'
import { Suits, MeldTypes } from '../constants.js'
import { TestHelpers } from '../test_helpers.js'

test('checkValid with valid melds', () => {
  let meld1 = new Meld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.DOTS, 1), 0);
  let meld2 = new Meld(false, MeldTypes.CHI, TestHelpers.createMeldTiles(MeldTypes.CHI, Suits.STICKS, 2), 1);
  let meld3 = new Meld(false, MeldTypes.KAN, TestHelpers.createMeldTiles(MeldTypes.KAN, Suits.DRAGON, 1), 2);
  let meld4 = new Meld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.CHARACTERS, 5), 3);
  let pair = new Meld(false, MeldTypes.PAIR, TestHelpers.createMeldTiles(MeldTypes.PAIR, Suits.WINDS, 2), 4);
  let hand = new Hand();
  hand.addMeld(meld1);
  hand.addMeld(meld2);
  hand.addMeld(meld3);
  hand.addMeld(meld4);
  hand.addMeld(pair);
  let result = hand.checkValid();
  expect(result['valid']).toBeTruthy();
});

test('checkValid with seven pairs', () => {
  let pairs = [
    [Suits.DOTS, 1],
    [Suits.DOTS, 2],
    [Suits.STICKS, 3],
    [Suits.STICKS, 4],
    [Suits.CHARACTERS, 5],
    [Suits.CHARACTERS, 6],
    [Suits.WINDS, 1]
  ];
  let hand = new Hand();
  pairs.forEach(function(pair) {
    hand.addMeld(new Meld(false, MeldTypes.PAIR, TestHelpers.createMeldTiles(MeldTypes.PAIR, pair[0], pair[1]), 0));
  });
  let result = hand.checkValid();
  expect(result['valid']).toBeTruthy();
});
