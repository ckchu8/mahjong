<template>
  <ul class="suit-selector__tiles">
    <li
      v-for="index in range"
      :key="index"
      :class="{ 'suit-selector__tile': true, active: current_tile.value === index }">
        <a href="javascript:void(0)" @click="$emit('add-tile', { suit: suit, value: index })">
          <img :src="imageFor(index)" :alt="altFor(index)" />
        </a>
      </li>
  </ul>
</template>

<script>
import { Helpers } from '../models/helpers.js'

export default {
  name: 'Tiles',
  props: ['suit', 'range', 'current_tile'],
  methods: {
    imageFor: function(index) {
      return require('../' + Helpers.image_path(this.$props.suit, index));
    },
    altFor: function(index) {
      return this.$props.suit + '-' + index;
    }
  }
}
</script>

<style lang="scss">
.suit-selector__tiles {
  padding-top: 15px;
  
  .suit-selector__tile {
    display: inline;

    img {
      border: 2px solid transparent;
      border-radius: 5px;
      padding: 2px;
      margin: 1px;
    }

    a:hover img {
      border-color: #999;
    }

    &.active img,
    &.active:hover img {
      border-color: #007bff;
    }
  }
}
</style>
