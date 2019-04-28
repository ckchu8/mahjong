import Meld from './meld.js'
import Vue from 'vue'

var TestHelpers = {
  
  createMeldOf(type, suit, value, is_open) {
    let set_is_open = is_open || false;
    return new Meld(set_is_open, type, Meld.createTiles(type, suit, value), 0);
  },

  mountComponent(Component, propsData) {
    const Constructor = Vue.extend(Component);
    const vm = new Constructor({ propsData: propsData }).$mount();
    return vm;
  },

};

export { TestHelpers }
