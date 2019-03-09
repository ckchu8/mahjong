import Hand from '../hand.js'
import { Suits, MeldTypes } from '../constants.js'
import { TestHelpers } from '../test_helpers.js'

test('checkValid with valid melds', () => {
  let hand = new Hand();
  hand.createNextMeld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.DOTS, 1));
  hand.createNextMeld(false, MeldTypes.CHI, TestHelpers.createMeldTiles(MeldTypes.CHI, Suits.STICKS, 2));
  hand.createNextMeld(false, MeldTypes.KAN, TestHelpers.createMeldTiles(MeldTypes.KAN, Suits.DRAGON, 1));
  hand.createNextMeld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.CHARACTERS, 5));
  hand.createNextMeld(false, MeldTypes.PAIR, TestHelpers.createMeldTiles(MeldTypes.PAIR, Suits.WINDS, 2));
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
    hand.createNextMeld(false, MeldTypes.PAIR, TestHelpers.createMeldTiles(MeldTypes.PAIR, pair[0], pair[1]));
  });
  let result = hand.checkValid();
  expect(result['valid']).toBeTruthy();
});

test('checkValid with invalid melds', () => {
  let hand = new Hand();
  hand.createNextMeld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.DOTS, 1));
  hand.createNextMeld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.DOTS, 2));
  hand.createNextMeld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.DOTS, 3));
  hand.createNextMeld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.DOTS, 4));
  hand.createNextMeld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.DOTS, 5));
  let result = hand.checkValid();
  expect(result['valid']).toBeFalsy();
});

test('checkValid with missing tiles', () => {
  let hand = new Hand();
  hand.createNextMeld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.DOTS, 1));
  hand.createNextMeld();
  hand.createNextMeld(false, MeldTypes.KAN, TestHelpers.createMeldTiles(MeldTypes.KAN, Suits.DRAGON, 1));
  hand.createNextMeld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.CHARACTERS, 5));
  hand.createNextMeld(false, MeldTypes.PAIR, TestHelpers.createMeldTiles(MeldTypes.PAIR, Suits.WINDS, 2));
  let result = hand.checkValid();
  expect(result['valid']).toBeFalsy();
});

test('checkValid with too many of one tile', () => {
  let hand = new Hand();
  hand.createNextMeld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.DOTS, 1));
  hand.createNextMeld(false, MeldTypes.CHI, TestHelpers.createMeldTiles(MeldTypes.CHI, Suits.DOTS, 1));
  hand.createNextMeld(false, MeldTypes.CHI, TestHelpers.createMeldTiles(MeldTypes.CHI, Suits.DOTS, 1));
  hand.createNextMeld(false, MeldTypes.PON, TestHelpers.createMeldTiles(MeldTypes.PON, Suits.CHARACTERS, 5));
  hand.createNextMeld(false, MeldTypes.PAIR, TestHelpers.createMeldTiles(MeldTypes.PAIR, Suits.WINDS, 2));
  let result = hand.checkValid();
  expect(result['valid']).toBeFalsy();
});

test('createNextMeld with defaults', () => {
  let hand = new Hand();
  let meld = hand.createNextMeld();
  expect(meld.id).toBe(0);
  expect(meld.is_open).toBeFalsy();
  expect(meld.tiles.length).toBe(0);
  expect(meld.type).toEqual(MeldTypes.CHI);
});

test('createNextMeld with inputs', () => {
  let hand = new Hand();
  let tiles = TestHelpers.createMeldTiles(MeldTypes.PON, Suits.DOTS, 1);
  let meld = hand.createNextMeld(true, MeldTypes.PON, tiles);
  expect(meld.id).toBe(0);
  expect(meld.is_open).toBeTruthy();
  expect(meld.tiles).toEqual(tiles);
  expect(meld.type).toEqual(MeldTypes.PON);
});
