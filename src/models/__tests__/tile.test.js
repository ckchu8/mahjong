import Tile from '../tile.js'
import { Suits, Dragons, Winds } from '../constants.js'

test('isHonor', () => {
  let dragon = new Tile(Suits.DRAGON, Dragons.RED);
  let wind = new Tile(Suits.WIND, Winds.EAST);
  let dot = new Tile(Suits.DOTS, 1);
  let stick = new Tile(Suits.STICKS, 2);
  let character = new Tile(Suits.CHARACTERS, 3);

  expect(dragon.isHonor()).toBeTruthy();
  expect(wind.isHonor()).toBeTruthy();
  expect(dot.isHonor()).toBeFalsy();
  expect(stick.isHonor()).toBeFalsy();
  expect(character.isHonor()).toBeFalsy();
});

test('isSimple()', () => {
  let dragon = new Tile(Suits.DRAGON, Dragons.GREEN);
  let wind = new Tile(Suits.WIND, Winds.EAST);
  
  expect(dragon.isSimple()).toBeFalsy();
  expect(wind.isSimple()).toBeFalsy();

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

test('isOuter()', () => {
  let dragon = new Tile(Suits.DRAGON, Dragons.GREEN);
  let wind = new Tile(Suits.WIND, Winds.EAST);
  
  expect(dragon.isOuter()).toBeFalsy();
  expect(wind.isOuter()).toBeFalsy();

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
