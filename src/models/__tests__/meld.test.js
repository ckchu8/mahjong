import Meld from '../meld.js'
import { Suits, Dragons, Winds, MeldTypes } from '../constants.js'
import { TestHelpers} from '../test_helpers.js'

test('suit() with no tiles', () => {
  let meld = new Meld(false, MeldTypes.CHI, [], 0);
  expect(meld.suit()).toEqual('');
});

test('suit() with tiles', () => {
  let meld = TestHelpers.createMeldOf(MeldTypes.PAIR, Suits.DOTS, 1);
  expect(meld.suit()).toEqual(Suits.DOTS);
});

test('isHonors() is true for a dragon meld', () => {
  let dragons = TestHelpers.createMeldOf(MeldTypes.PON, Suits.DRAGON, Dragons.GREEN);
  expect(dragons.isHonors()).toBeTruthy();
});

test('isHonors() is true for a wind meld', () => {
  let winds = TestHelpers.createMeldOf(MeldTypes.PON, Suits.WIND, Winds.EAST);
  expect(winds.isHonors()).toBeTruthy();
});

test('isHonors() is false for numbers', () => {
  let sticks = TestHelpers.createMeldOf(MeldTypes.PON, Suits.STICKS, 1);
  expect(sticks.isHonors()).toBeFalsy();
});

test('isSimples() is false for honors', () => {
  let dragons = TestHelpers.createMeldOf(MeldTypes.PON, Suits.DRAGON, Dragons.GREEN),
      winds = TestHelpers.createMeldOf(MeldTypes.PON, Suits.WIND, Winds.EAST);
  expect(dragons.isSimples()).toBeFalsy();
  expect(winds.isSimples()).toBeFalsy();
});

test('isSimples() with numbers', () => {
  let simples_pon = TestHelpers.createMeldOf(MeldTypes.PON, Suits.STICKS, 3),
      outers_pon = TestHelpers.createMeldOf(MeldTypes.PON, Suits.STICKS, 1),
      simples_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 2),
      outers_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 7);
  
  expect(simples_pon.isSimples()).toBeTruthy();
  expect(outers_pon.isSimples()).toBeFalsy();
  expect(simples_chi.isSimples()).toBeTruthy();
  expect(outers_chi.isSimples()).toBeFalsy();
});

test('isOuters() is false for honors', () => {
  let dragons = TestHelpers.createMeldOf(MeldTypes.PON, Suits.DRAGON, Dragons.GREEN),
      winds = TestHelpers.createMeldOf(MeldTypes.PON, Suits.WIND, Winds.EAST);
  expect(dragons.isOuters()).toBeFalsy();
  expect(winds.isOuters()).toBeFalsy();
});

test('isOuters() with numbers', () => {
  let simples_pon = TestHelpers.createMeldOf(MeldTypes.PON, Suits.STICKS, 3),
      outers_pon = TestHelpers.createMeldOf(MeldTypes.PON, Suits.STICKS, 1),
      simples_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 2),
      outers_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 7);
  
  expect(simples_pon.isOuters()).toBeFalsy();
  expect(outers_pon.isOuters()).toBeTruthy();
  expect(simples_chi.isOuters()).toBeFalsy();
  expect(outers_chi.isOuters()).toBeTruthy();
});

test('isGreen() is true for green dragon', () => {
  let green = TestHelpers.createMeldOf(MeldTypes.PON, Suits.DRAGON, Dragons.GREEN),
      red = TestHelpers.createMeldOf(MeldTypes.PON, Suits.DRAGON, Dragons.RED),
      white = TestHelpers.createMeldOf(MeldTypes.PON, Suits.DRAGON, Dragons.WHITE);

  expect(green.isGreen()).toBeTruthy();
  expect(red.isGreen()).toBeFalsy();
  expect(white.isGreen()).toBeFalsy();
});

test('isGreen() is true for 234 sticks', () => {
  let green_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 2),
      nongreen_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 3),
      nonstick_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.DOTS, 2);

  expect(green_chi.isGreen()).toBeTruthy();
  expect(nongreen_chi.isGreen()).toBeFalsy();
  expect(nonstick_chi.isGreen()).toBeFalsy();
});

test('isGreen() is true for certain sticks', () => {
  let valids = [2, 3, 4, 6, 8],
      meld = new Meld(false, MeldTypes.PON, [], 0);

  for(let i = 1; i <= 9; ++i) {
    meld.tiles = Meld.createTiles(MeldTypes.PON, Suits.STICKS, i);
    if(valids.indexOf(i) === -1) {
      expect(meld.isGreen()).toBeFalsy();
    }
    else {
      expect(meld.isGreen()).toBeTruthy();
    }
  }
});

test('isChi()', () => {
  let chi_meld = new Meld(true, MeldTypes.CHI, [], 0),
      pon_meld = new Meld(true, MeldTypes.PON, [], 1);

  expect(chi_meld.isChi()).toBeTruthy();
  expect(pon_meld.isChi()).toBeFalsy();
});

test('isPon()', () => {
  let pon_meld = new Meld(true, MeldTypes.PON, [], 0),
      kan_meld = new Meld(true, MeldTypes.KAN, [], 1);

  expect(pon_meld.isPon()).toBeTruthy();
  expect(kan_meld.isPon()).toBeFalsy();
});

test('isKan()', () => {
  let kan_meld = new Meld(true, MeldTypes.KAN, [], 0),
      pon_meld = new Meld(true, MeldTypes.PON, [], 1);

  expect(kan_meld.isKan()).toBeTruthy();
  expect(pon_meld.isKan()).toBeFalsy();
});

test('isPair()', () => {
  let pair_meld = new Meld(true, MeldTypes.PAIR, [], 0),
      pon_meld = new Meld(true, MeldTypes.PON, [], 1);

  expect(pair_meld.isPair()).toBeTruthy();
  expect(pon_meld.isPair()).toBeFalsy();
});

test('createTiles() for chi', () => {
  let value = 2,
      tiles = Meld.createTiles(MeldTypes.CHI, Suits.STICKS, value),
      tile;

  expect(tiles.length).toEqual(3);
  for(let i = 0; i < tiles.length; ++i) {
    tile = tiles[i];
    expect(tile.suit).toEqual(Suits.STICKS);
    expect(tile.value).toEqual(value);
    ++value;
  }
});

test('createTiles() for pon', () => {
  let value = 3,
      tiles = Meld.createTiles(MeldTypes.PON, Suits.DOTS, value),
      tile;

  expect(tiles.length).toEqual(3);
  for(let i = 0; i < tiles.length; ++i) {
    tile = tiles[i];
    expect(tile.suit).toEqual(Suits.DOTS);
    expect(tile.value).toEqual(value);
  }
});

test('createTiles() for kan', () => {
  let value = Dragons.RED,
      tiles = Meld.createTiles(MeldTypes.KAN, Suits.DRAGON, value),
      tile;

  expect(tiles.length).toEqual(4);
  for(let i = 0; i < tiles.length; ++i) {
    tile = tiles[i];
    expect(tile.suit).toEqual(Suits.DRAGON);
    expect(tile.value).toEqual(value);
  }
});
