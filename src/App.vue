<template>
  <div id="app">

    <div class="wind-selector inner-wrapper">
      <div class="flex-row">

        <div class="flex-row__col">
          <div class="wind-selector__label">Seat Wind</div>
          <WindSelector
            :hand="hand"
            type="seat">
          ></WindSelector>
        </div>

        <div class="flex-row__col">
          <div class="wind-selector__label">Round Wind</div>
          <WindSelector
            :hand="hand"
            type="round">
          ></WindSelector>
        </div>

      </div>
    </div>

    <MeldForm
      v-if="show_meld_form"
      :meld="hand.melds[current_meld_id]"
    ></MeldForm>

    <AdditionalOptions
      :hand='hand'
    ></AdditionalOptions>

    <div class="calculate-action">
      <button @click="calculate" class="btn btn-primary">Calculate</button>
    </div>

  </div>
</template>

<script>
import Meld from './classes/meld.js'
import Hand from './classes/hand.js'
import { MeldTypes } from './classes/constants.js'
import AdditionalOptions from './components/AdditionalOptions.vue'
import WindSelector from './components/WindSelector.vue'
import MeldForm from './components/MeldForm.vue'

export default {
  name: 'app',
  components: {
    AdditionalOptions,
    WindSelector,
    MeldForm,
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
      show_meld_form: true,
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
      this.calculated = this.hand.calculate();
      this.calculated['all'] = this.hand.tsumo;
    }
  }
}
</script>

<style lang="scss">
@import './assets/bootstrap.min.css';

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
}
.inner-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;

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
.wind-selector {
  text-align: center;
}
.wind-selector__label {
  padding-bottom: 5px;
}
.btn-secondary {
  background: #7f8991;
  border-color: #7f8991;
}
</style>
