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

    <hr />

    <HandDisplay
      v-if="hand.melds.length > 0"
      :melds="hand.melds"
      :current_meld_id="current_meld_id"
      :win_selection="promptWinner || lastStep"
      :winning_tile="hand.winning_tile"
      @add-winner="addWinner"
    ></HandDisplay>

    <div class="winning_tile" v-show="promptWinner">
      <div class="alert alert-primary" role="alert">
        Please select the winning tile
      </div>
    </div>

    <hr />

    <MeldForm
      v-if="show_meld_form"
      :meld="hand.melds[current_meld_id]"
      :prompt_winner="promptWinner"
      :finished="lastStep"
      @next-meld="nextMeld"
    ></MeldForm>

    <hr />

    <AdditionalOptions
      :hand='hand'
    ></AdditionalOptions>

    <div class="calculated_score" v-show="show_calculation">
      <div class="alert alert-success" role="alert">
        <div class="flex-row">

          <div class="calculated_score-yakus flex-row__col">
            <ul>
              <li v-for="yaku in calculated.hands" :key="yaku">{{ yaku }}</li>
            </ul>
          </div>
          <div class="calculated_score-numbers flex-row__col">
            <ul>
              <li v-if="calculated.han > 0"> {{ calculated.han }} Han </li>
              <li v-if="calculated.fu > 0"> {{ calculated.fu }} Fu </li>
              <li v-if="calculated.east_pay > 0" class="calculated_score-pay">East pays {{ calculated.east_pay }}</li> 
              <li v-if="calculated.east_pay > 0" class="calculated_score-pay">Everyone else pays {{ calculated.other_pay }}</li>
              <li v-if="calculated.east_pay === 0 && calculated.all" class="calculated_score-pay">All pay {{ calculated.other_pay }}</li>
              <li v-if="calculated.east_pay === 0 && !calculated.all" class="calculated_score-pay">Player pays {{ calculated.other_pay }}</li>
            </ul>
          </div>

        </div>
      </div>
    </div>

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
import HandDisplay from './components/HandDisplay.vue'

export default {
  name: 'app',
  components: {
    AdditionalOptions,
    WindSelector,
    MeldForm,
    HandDisplay,
  },
  data: function() {
    return {
      hand: new Hand(),
      calculated: {},
      current_meld_id: 0,
      last_meld: false,
      normal_melds: 0,
      pairs: 0,
      show_calculation: false,
      show_meld_form: true,
    };
  },
  created: function() {
    this.hand.addMeld(new Meld(false, MeldTypes.CHI, [], 0)); 
  },
  computed: {
    promptWinner: function() {
      return this.last_meld && this.hand.winning_tile.length === 0;
    },
    lastStep: function() {
      return this.last_meld && this.hand.winning_tile.length > 0;
    },
  },
  methods: {
    nextMeld: function() {
      if( this.hand.melds[this.current_meld_id] === MeldTypes.PAIR ) {
        this.pairs++;
      }
      else {
        this.normal_melds++;
      }
      if( (this.normal_melds > 0 && (this.normal_melds + this.pairs) === 5) || this.pairs === 7) {
        this.last_meld = true;
      }
      if(!this.last_meld) {
        let next_id = this.hand.melds.length;
        this.hand.addMeld(new Meld(false, MeldTypes.CHI, [], next_id));
        this.current_meld_id = next_id;
      }

    },
    addWinner: function(winning_tile) {
      this.hand.winning_tile = winning_tile;
    },
    calculate: function() {
      // make sure dora isn't empty
      this.hand.dora = this.hand.dora || 0;
      this.calculated = this.hand.calculate();
      this.calculated['all'] = this.hand.tsumo;
      this.show_calculation = true;
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
