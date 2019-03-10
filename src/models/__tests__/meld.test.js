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
  let dragons = TestHelpers.createMeldOf(MeldTypes.PON, Suits.DRAGON, Dragons.GREEN);
  let winds = TestHelpers.createMeldOf(MeldTypes.PON, Suits.WIND, Winds.EAST);
  expect(dragons.isSimples()).toBeFalsy();
  expect(winds.isSimples()).toBeFalsy();
});

test('isSimples() with numbers', () => {
  let simples_pon = TestHelpers.createMeldOf(MeldTypes.PON, Suits.STICKS, 3);
  let outers_pon = TestHelpers.createMeldOf(MeldTypes.PON, Suits.STICKS, 1);
  let simples_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 2);
  let outers_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 7);
  
  expect(simples_pon.isSimples()).toBeTruthy();
  expect(outers_pon.isSimples()).toBeFalsy();
  expect(simples_chi.isSimples()).toBeTruthy();
  expect(outers_chi.isSimples()).toBeFalsy();
});

test('isOuters() is false for honors', () => {
  let dragons = TestHelpers.createMeldOf(MeldTypes.PON, Suits.DRAGON, Dragons.GREEN);
  let winds = TestHelpers.createMeldOf(MeldTypes.PON, Suits.WIND, Winds.EAST);
  expect(dragons.isOuters()).toBeFalsy();
  expect(winds.isOuters()).toBeFalsy();
});

test('isOuters() with numbers', () => {
  let simples_pon = TestHelpers.createMeldOf(MeldTypes.PON, Suits.STICKS, 3);
  let outers_pon = TestHelpers.createMeldOf(MeldTypes.PON, Suits.STICKS, 1);
  let simples_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 2);
  let outers_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 7);
  
  expect(simples_pon.isOuters()).toBeFalsy();
  expect(outers_pon.isOuters()).toBeTruthy();
  expect(simples_chi.isOuters()).toBeFalsy();
  expect(outers_chi.isOuters()).toBeTruthy();
});

test('isGreen() is true for green dragon', () => {
  let green = TestHelpers.createMeldOf(MeldTypes.PON, Suits.DRAGON, Dragons.GREEN);
  let red = TestHelpers.createMeldOf(MeldTypes.PON, Suits.DRAGON, Dragons.RED);
  let white = TestHelpers.createMeldOf(MeldTypes.PON, Suits.DRAGON, Dragons.WHITE);

  expect(green.isGreen()).toBeTruthy();
  expect(red.isGreen()).toBeFalsy();
  expect(white.isGreen()).toBeFalsy();
});

test('isGreen() is true for 234 sticks', () => {
  let green_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 2);
  let nongreen_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.STICKS, 3);
  let nonstick_chi = TestHelpers.createMeldOf(MeldTypes.CHI, Suits.DOTS, 2);

  expect(green_chi.isGreen()).toBeTruthy();
  expect(nongreen_chi.isGreen()).toBeFalsy();
  expect(nonstick_chi.isGreen()).toBeFalsy();
});

test('isGreen() is true for certain sticks', () => {
  let valids = [2, 3, 4, 6, 8];
  let meld = new Meld(false, MeldTypes.PON, [], 0);
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
