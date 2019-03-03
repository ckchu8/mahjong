<template>
  
  <div :class="{ 'hand-display': true, 'selection-active': win_selection }">

    <div class="flex-row">
      <div v-for="meld in melds" :key="meld.id" class="hand-display__meld flex-row__col">

        <div :class="{ 'hand-display__inner-meld': true, active: meld.id === current_meld_id }">
          <div class="hand-display__label">
            {{ meld.is_open ? 'Open' : 'Concealed' }}
          </div>
          <ul class="hand-display__tiles">
            <li
              v-for="(tile, index) in meld.tiles"
              @click="$emit('add-winner', [meld.id, index])"
              :key="index"
              :class="{ 'winner': winning_tile.length > 0 && meld.id === winning_tile[0] && index === winning_tile[1] }"
            >
              <img :src="tileImage(tile)" :alt="tile.to_s()" />
              <span class="hand-display__tiles--win text-success">
                Win
              </span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'HandDisplay',
  props: ['melds', 'current_meld_id', 'win_selection', 'winning_tile'],
  methods: {
    tileImage: function(tile) {
      return require('../' + tile.image());
    },
  },
}
</script>

<style lang="scss">
.hand-display__meld {
  text-align: center;
}
.hand-display__inner-meld {
  max-width: 200px;
  min-height: 110px;
  border: 2px solid transparent;
  border-radius: 3px;

  &.active {
    border-color: #999;
  }
}
.hand-display__tiles {
  overflow: hidden;
  display: inline-block;

  li {
    width: 44px;
    float: left;
  }
}
.hand-display.selection-active li:hover {
  cursor: pointer;
}
.hand-display.selection-active li:hover,
.hand-display.selection-active li.winner {
  .hand-display__tiles--win {
    display: inline;
  }
}
.hand-display__tiles--win {
  font-size: 0.9em;
  display: none;
}
</style>
