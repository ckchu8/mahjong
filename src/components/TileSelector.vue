<template>
  
  <div class="suit-selector">

    <div class="suit-selector__meld-selector">
      <div class="btn-group suit-selector__meld-types">
        <button
          type="button"
          v-for="meld_type in meldTypes"
          :key="meld_type['name']"
          :class="{ btn: true, 'btn-secondary': true, active: meld_type['name'] === currentMeldType() }"
          :disabled="!meld_type['active']"
          @click="changeMeldType(meld_type['name'])"
        >
          {{ meld_type['name'] }}
        </button>
      </div>
      
      <div class="suit-selector__note">
        <span v-if="currentMeldType() === chi">starting with...</span>
        <span v-else>of...</span>
      </div>
    </div>

    <Tiles
      :suit="suit"
      :range="range"
      :current_tile="currentTile"
      @add-tile="addTiles"
    ></Tiles>
  </div>

</template>

<script>
import { MeldTypes, Suits } from '../classes/constants.js'
import { Helpers } from '../classes/helpers.js'
import Tiles from './Tiles.vue'

export default {
  name: 'TileSelector',
  components: {
    Tiles,
  },
  data: function() {
    return {
      current_meld_type: '',
      chi: MeldTypes.CHI,
    };
  },
  props: ['suit', 'meld'],
  created: function() {
    this.current_meld_type = this.$props.meld.type;
  },
  computed: {
    range: function() {
      if(this.$props.suit  === Suits.DRAGON) {
        return 3;
      }
      else if(this.$props.suit === Suits.WIND) {
        return 4;
      }
      else if(this.current_meld_type === MeldTypes.CHI) {
        return 7;
      }
      else {
        return 9;
      }
    },
    meldTypes: function() {
      let meld_types = [];
      meld_types.push( { name: MeldTypes.CHI, active: !Helpers.isHonorsSuit(this.$props.suit) } );
      meld_types.push( { name: MeldTypes.PON, active: true } );
      meld_types.push( { name: MeldTypes.KAN, active: true } );
      meld_types.push( { name: MeldTypes.PAIR, active: true } );
      return meld_types;
    },
    currentTile: function() {
      if(this.$props.meld.tiles.length > 0) {
        return this.$props.meld.tiles[0];
      }
      else {
        return {};
      }
    },
  },
  methods: {
    changeMeldType: function(new_meld_type) {
      this.current_meld_type = new_meld_type;
    },
    currentMeldType: function() {
      if(this.current_meld_type === MeldTypes.CHI && Helpers.isHonorsSuit(this.$props.suit)) {
        this.current_meld_type = MeldTypes.PON;
      }
      return this.current_meld_type;
    },
    addTiles: function(tile) {
      
    },
  },
}

</script>

<style lang="scss">
.suit-selector__meld-selector {
  display: flex;
  align-items: center;
}
.suit-selector__meld-types {
  padding-right: 10px;
}
</style>
