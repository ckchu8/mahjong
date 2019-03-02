<template>

  <div class="btn-group">
    <button v-for="wind in winds"
      :class="{ btn: true, 'btn-secondary': true, active: checkActive(wind) }"
      @click="changeWind(wind)"
    >
      {{ wind['name'] }}
    </button>
  </div>

</template>

<script>
import { Winds } from '../classes/constants.js'

export default {
  name: 'WindSelector',
  props: ['hand', 'type'],
  created: function() {
    this.winds = [
      { name: 'East', value: Winds.EAST },
      { name: 'South', value: Winds.SOUTH },
    ];
    if(this.$props.type === 'seat') {
      this.winds = this.winds.concat([
        { name: 'West', value: Winds.WEST },
        { name: 'North', value: Winds.NORTH },
      ]);
    }
  },
  methods: {
    checkActive(wind) {
      if(this.$props.type === 'seat') {
        return wind['value'] === this.$props.hand.seat_wind;
      }
      else if(this.$props.type === 'round') {
        return wind['value'] === this.$props.hand.round_wind;
      }
      return false;
    },
    changeWind(wind) {
      if(this.$props.type === 'seat') {
        this.$props.hand.seat_wind = wind['value'];
      }
      else if(this.$props.type === 'round') {
        this.$props.hand.round_wind = wind['value'];
      }
    },
  }
}

</script>
