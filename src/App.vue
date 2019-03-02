<template>
  <div id="app">

    <AdditionalOptions
      :hand='hand'
    ></AdditionalOptions>

    <div class="calculate-action">
      <button @click="calculate" class="btn btn-primary">Calculate</button>
    </div>

  </div>
</template>

<script>
import Tile from './classes/tile.js'
import Meld from './classes/meld.js'
import Hand from './classes/hand.js'
import { Helpers } from './classes/helpers.js'
import { Suits, Winds, Dragons, MeldTypes } from './classes/constants.js'
import AdditionalOptions from './components/AdditionalOptions.vue'

export default {
  name: 'app',
  components: {
    AdditionalOptions
  },
  data: function() {
    return {
      hand: new Hand(),
      calculated: {},
      current_meld_id: 0,
      last_meld: false,
      normal_melds: 0,
      pairs: 0,
      show_calculate: false,
    };
  },
  created: function() {
    this.hand.addMeld(new Meld(false, MeldTypes.CHI, [], 0)); 
  },
  computed: {

  },
  methods: {
    calculate: function() {
      // make sure dora isn't empty
      this.hand.dora = this.hand.dora || 0;
      //this.calculated = this.hand.calculate();
      //this.calculated['all'] = this.hand.tsumo;
    }
  }
}
</script>

<style>
body {
  background: #fff;
  color: #333;
  font: 62.5% Verdana, Arial, sans-serif;
  line-height: 1.6;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  margin: 0;
  padding: 0;
}
#app {
  max-width: 1000px;
  margin: 30px auto;
  font-size: 1.6em;
}
.inner-wrapper {
  max-width: 800px;
  margin: 0 auto;

}
.flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px 0;
}
.flex-row__col {
  flex-grow: 1;
  padding: 0 10px;
}
.calculate-action {
  text-align: center;
}
.btn {
  font-size: 1.1em;
  padding: 10px 15px;
  border: 1px solid transparent;
  border-radius: 5px;
}
.btn:hover {
  cursor: pointer;
}
.btn-primary {
  background: #007bff;
  border-color: #007bff;
  color: #fff;
}
.btn-primary:hover {
  background: #006de5;
  border-color: #006de5;
}
</style>
