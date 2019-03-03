<template>
  
  <div class="meld-form inner-wrapper">
    <div class="meld-form__opening-info">

      <div class="meld-form__opening-info--section meld-form__suits">

        <div class="meld-form__label">
          Suit is:
        </div>
        <div class="meld-form__suits-list">
          <ul class="meld-form__suits">
            <li v-for="suit in suits" :key="suit" :class="{ active: isSuit(suit) }">
              <a href="javascript:void(0)" @click="changeSuit(suit)">
                <img :src="imageFor(suit)" :alt="altFor(suit)" :data-suit="suit" />
              </a>
            </li>
          </ul>
        </div>

      </div>
      
      <div class="meld-form__opening-info--section meld-form__concealed">
        <div class="meld-form__label">
          Meld is:
        </div>
        <div class="btn-group" role="group">
          <button :class="{ btn: true, 'btn-secondary': true, active: !meld.is_open }" @click="changeOpen(false)">Concealed</button>
          <button :class="{ btn: true, 'btn-secondary': true, active: meld.is_open }" @click="changeOpen(true)">Open</button>
        </div>
      </div>

    </div>
      
    <div class="meld-form__tile-select">
      <TileSelector
        :suit="current_suit"
        :meld="meld"
        @add-meld="addTiles"
      ></TileSelector>
    </div>

    <div class="meld-form__submit" v-show="!prompt_winner && !finished">
      <input type="submit" @click="$emit('next-meld')" value="Next" class="btn btn-primary">
    </div>
  </div>

</template>

<script>
import { Suits } from '../classes/constants.js'
import { Helpers } from '../classes/helpers.js'
import TileSelector from './TileSelector.vue'

export default {
  name: 'MeldForm',
  components: {
    TileSelector,
  },
  props: ['meld', 'prompt_winner', 'finished'],
  data: function() {
    return {
      current_suit: Suits.DOTS,
      suits: Helpers.allSuits(),
    }
  },
  created: function() {
    if(this.suits.indexOf(this.$props.meld.suit()) === -1) {
      this.current_suit = Suits.DOTS;
    }
    else if(this.$props.meld.suit() !== '') {
      this.current_suit = this.$props.meld.suit();
    }
  },
  methods: {
    addTiles: function(tiles_info) {
      this.$props.meld.tiles = tiles_info.tiles;
      this.$props.meld.type = tiles_info.type;
    },    
    changeSuit: function(suit) {
      this.current_suit = suit;
    },
    isSuit: function(suit) {
      return this.current_suit === suit;
    },
    imageFor: function(suit) {
      return require("../" + Helpers.image_path(suit, 1));
    },
    altFor: function(suit) {
      Helpers.capitalize(suit);
    },
    changeOpen: function(value) {
      this.$props.meld.is_open = value;
    },
  }
}

</script>

<style lang="scss">
.meld-form {
  padding-bottom: 15px;
}
.meld-form__opening-info {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 15px;
}
.meld-form__label {
  padding: 0 0 5px 13px;
}
.meld-form__suits {
  padding-right: 20px;
  
  li {
    display: inline;

    img {
      border: 2px solid transparent;
      border-radius: 5px;
      padding: 2px;
      margin: 0 1px;
    }
  }
  li.active img,
  li:hover.active img {
    border-color: #007bff;
  }
  li:hover img {
    border-color: #6c757d;
  }
}
.meld-form__concealed {
  .btn-group {
    margin-top: 5px;
  }
}
.meld-form__submit {
  padding-top: 15px;
}
</style>
