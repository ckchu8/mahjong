import WindSelector from '../WindSelector.vue'
import { TestHelpers } from '../../models/test_helpers.js'
import { Winds } from '../../models/constants.js'
import Hand from '../../models/hand.js'

test('checkActive() for seat wind', () => {
  let hand = new Hand();
  hand.seat_wind = Winds.WEST;
  const vm = TestHelpers.mountComponent(WindSelector, { hand: hand, type: 'seat' });
  expect(vm.checkActive({ name: 'West', value: Winds.WEST })).toBeTruthy();
  expect(vm.checkActive({ name: 'East', value: Winds.EAST })).toBeFalsy();
});

test('checkActive() for round wind', () => {
  let hand = new Hand();
  hand.round_wind = Winds.SOUTH;
  const vm = TestHelpers.mountComponent(WindSelector, { hand: hand, type: 'round' });
  expect(vm.checkActive( { name: 'South', value: Winds.SOUTH })).toBeTruthy();
  expect(vm.checkActive( { name: 'East', value: Winds.EAST })).toBeFalsy();
});

test('changeWind() for seat wind', () => {
  let hand = new Hand();
  const vm = TestHelpers.mountComponent(WindSelector, { hand: hand, type: 'seat' });
  vm.changeWind({ name: 'North', value: Winds.NORTH });
  expect(hand.seat_wind).toEqual(Winds.NORTH);
});

test('changeWind() for round wind', () => {
  let hand = new Hand();
  const vm = TestHelpers.mountComponent(WindSelector, { hand: hand, type: 'round' });
  vm.changeWind({ name: 'South', value: Winds.SOUTH });
  expect(hand.round_wind).toEqual(Winds.SOUTH);
});
