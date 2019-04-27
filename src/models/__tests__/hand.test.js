import Hand from '../hand.js'
import Meld from '../meld.js'
import { Suits, MeldTypes } from '../constants.js'

test('checkValid with valid melds', () => {
  let hand = new Hand();
  hand.createNextMeld(false, MeldTypes.PON, Meld.createTiles(MeldTypes.PON, Suits.DOTS, 1));
  hand.createNextMeld(false, MeldTypes.CHI, Meld.createTiles(MeldTypes.CHI, Suits.STICKS, 2));
  hand.createNextMeld(false, MeldTypes.KAN, Meld.createTiles(MeldTypes.KAN, Suits.DRAGON, 1));
  hand.createNextMeld(false, MeldTypes.PON, Meld.createTiles(MeldTypes.PON, Suits.CHARACTERS, 5));
  hand.createNextMeld(false, MeldTypes.PAIR, Meld.createTiles(MeldTypes.PAIR, Suits.WINDS, 2));
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
    hand.createNextMeld(false, MeldTypes.PAIR, Meld.createTiles(MeldTypes.PAIR, pair[0], pair[1]));
  });
  let result = hand.checkValid();
  expect(result['valid']).toBeTruthy();
});

test('checkValid with invalid melds', () => {
  let hand = new Hand();
  hand.createNextMeld(false, MeldTypes.PON, Meld.createTiles(MeldTypes.PON, Suits.DOTS, 1));
  hand.createNextMeld(false, MeldTypes.PON, Meld.createTiles(MeldTypes.PON, Suits.DOTS, 2));
  hand.createNextMeld(false, MeldTypes.PON, Meld.createTiles(MeldTypes.PON, Suits.DOTS, 3));
  hand.createNextMeld(false, MeldTypes.PON, Meld.createTiles(MeldTypes.PON, Suits.DOTS, 4));
  hand.createNextMeld(false, MeldTypes.PON, Meld.createTiles(MeldTypes.PON, Suits.DOTS, 5));
  let result = hand.checkValid();
  expect(result['valid']).toBeFalsy();
});

test('checkValid with missing tiles', () => {
  let hand = new Hand();
  hand.createNextMeld(false, MeldTypes.PON, Meld.createTiles(MeldTypes.PON, Suits.DOTS, 1));
  hand.createNextMeld();
  hand.createNextMeld(false, MeldTypes.KAN, Meld.createTiles(MeldTypes.KAN, Suits.DRAGON, 1));
  hand.createNextMeld(false, MeldTypes.PON, Meld.createTiles(MeldTypes.PON, Suits.CHARACTERS, 5));
  hand.createNextMeld(false, MeldTypes.PAIR, Meld.createTiles(MeldTypes.PAIR, Suits.WINDS, 2));
  let result = hand.checkValid();
  expect(result['valid']).toBeFalsy();
});

test('checkValid with too many of one tile', () => {
  let hand = new Hand();
  hand.createNextMeld(false, MeldTypes.PON, Meld.createTiles(MeldTypes.PON, Suits.DOTS, 1));
  hand.createNextMeld(false, MeldTypes.CHI, Meld.createTiles(MeldTypes.CHI, Suits.DOTS, 1));
  hand.createNextMeld(false, MeldTypes.CHI, Meld.createTiles(MeldTypes.CHI, Suits.DOTS, 1));
  hand.createNextMeld(false, MeldTypes.PON, Meld.createTiles(MeldTypes.PON, Suits.CHARACTERS, 5));
  hand.createNextMeld(false, MeldTypes.PAIR, Meld.createTiles(MeldTypes.PAIR, Suits.WINDS, 2));
  let result = hand.checkValid();
  expect(result['valid']).toBeFalsy();
});

test('createNextMeld with defaults', () => {
  let hand = new Hand(),
      meld = hand.createNextMeld();
  expect(meld.id).toBe(0);
  expect(meld.is_open).toBeFalsy();
  expect(meld.tiles.length).toBe(0);
  expect(meld.type).toEqual(MeldTypes.CHI);
});

test('createNextMeld with inputs', () => {
  let hand = new Hand(),
      tiles = Meld.createTiles(MeldTypes.PON, Suits.DOTS, 1),
      meld = hand.createNextMeld(true, MeldTypes.PON, tiles);

  expect(meld.id).toBe(0);
  expect(meld.is_open).toBeTruthy();
  expect(meld.tiles).toEqual(tiles);
  expect(meld.type).toEqual(MeldTypes.PON);
});
