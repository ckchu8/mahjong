import Tile from '../tile.js'
import { Suits, Dragons, Winds } from '../constants.js'

test('isHonor() is true for dragons', () => {
  let dragon = new Tile(Suits.DRAGON, Dragons.RED);
  expect(dragon.isHonor()).toBeTruthy();
});

test('isHonor() is true for winds', () => {
  let wind = new Tile(Suits.WIND, Winds.EAST);
  expect(wind.isHonor()).toBeTruthy();
});

test('isHonor() is false for numbers', () => {
  let dot = new Tile(Suits.DOTS, 1),
      stick = new Tile(Suits.STICKS, 2),
      character = new Tile(Suits.CHARACTERS, 3);

  expect(dot.isHonor()).toBeFalsy();
  expect(stick.isHonor()).toBeFalsy();
  expect(character.isHonor()).toBeFalsy();
});

test('isSimple() is false for honors', () => {
  let dragon = new Tile(Suits.DRAGON, Dragons.GREEN),
      wind = new Tile(Suits.WIND, Winds.EAST);
  
  expect(dragon.isSimple()).toBeFalsy();
  expect(wind.isSimple()).toBeFalsy();
});

test('isSimple() with numbers', () => {
  let tile = new Tile(Suits.STICKS, 0);

  for(let i = 1; i <= 9; ++i) {
    tile.value = i;
    if(i > 1 && i < 9) {
      expect(tile.isSimple()).toBeTruthy();
    }
    else {
      expect(tile.isSimple()).toBeFalsy();
    }
  }
});

test('isOuter() is false for honors', () => {
  let dragon = new Tile(Suits.DRAGON, Dragons.GREEN),
      wind = new Tile(Suits.WIND, Winds.EAST);
  
  expect(dragon.isOuter()).toBeFalsy();
  expect(wind.isOuter()).toBeFalsy();
});

test('isOuter() with numbers', () => {
  let tile = new Tile(Suits.CHARACTERS, 0);

  for(let i = 1; i <= 9; ++i) {
    tile.value = i;
    if(i > 1 && i < 9) {
      expect(tile.isOuter()).toBeFalsy();
    }
    else {
      expect(tile.isOuter()).toBeTruthy();
    }
  }
});

test('isHonorsSuit()', () => {
  expect(Tile.isHonorsSuit(Suits.DRAGON)).toBeTruthy();
  expect(Tile.isHonorsSuit(Suits.WIND)).toBeTruthy();
  expect(Tile.isHonorsSuit(Suits.DOTS)).toBeFalsy();
  expect(Tile.isHonorsSuit(Suits.STICKS)).toBeFalsy();
  expect(Tile.isHonorsSuit(Suits.CHARACTERS)).toBeFalsy();
});

test('isDragon()', () => {
  let dragon_tile = new Tile(Suits.DRAGON, Dragons.RED),
      wind_tile = new Tile(Suits.WIND, Winds.EAST);

  expect(dragon_tile.isDragon()).toBeTruthy();
  expect(wind_tile.isDragon()).toBeFalsy();
});

test('isWind()', () => {
  let wind_tile = new Tile(Suits.WIND, Winds.EAST),
      dragon_tile = new Tile(Suits.DRAGON, Dragons.GREEN);

  expect(wind_tile.isWind()).toBeTruthy();
  expect(dragon_tile.isWind()).toBeFalsy();
});

test('isDots()', () => {
  let dots_tile = new Tile(Suits.DOTS, 1),
      sticks_tile = new Tile(Suits.STICKS, 1);

  expect(dots_tile.isDots()).toBeTruthy();
  expect(sticks_tile.isDots()).toBeFalsy();
});

test('isSticks()', () => {
  let sticks_tile = new Tile(Suits.STICKS, 2),
      dots_tile = new Tile(Suits.DOTS, 2);

  expect(sticks_tile.isSticks()).toBeTruthy();
  expect(dots_tile.isSticks()).toBeFalsy();
});

test('isCharacters()', () => {
  let chars_tile = new Tile(Suits.CHARACTERS, 3),
      dots_tile = new Tile(Suits.DOTS, 3);

  expect(chars_tile.isCharacters()).toBeTruthy();
  expect(dots_tile.isCharacters()).toBeFalsy();
});
