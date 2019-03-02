<template>
    
  <div class="inner-wrapper additional_options">
    
    <div class="flex-row">
      
      <div class="flex-row__col">
        <input type="checkbox" id="riichi" class="form__check-input" v-model="hand.riichi" />
        <label for="riichi" class="form__check-label">
          Riichi
        </label>
      </div>

      <div class="flex-row__col">
        <input type="checkbox" id="double_riichi" class="form__check-input" v-model="hand.double_riichi" />
        <label for="double_riichi" class="form__check-label">
          Double Riichi
        </label>
      </div>

      <div class="flex-row__col">
        <input type="checkbox" id="one_shot" class="form__check-input" v-model="hand.one_shot" />
        <label for="one_shot" class="form__check-label">
          One Shot/Ippatsu
        </label>
      </div>

      <div class="flex-row__col">
        <input type="checkbox" id="tsumo" class="form__check-input" v-model="hand.tsumo" />
        <label for="tsumo" class="form__check-label">
          Tsumo/Self Pick
        </label>
      </div>

    </div>

    <div class="flex-row">
      <div class="flex-row__col">
        <input type="checkbox" id="special_draw" class="form__check-input" v-model="hand.special_draw" />
        <label for="special_draw" class="form__check-label">
          Special draw (After a kong, Robbing the kong, Under the Sea)
        </label>
      </div>
    </div>

    <div class="flex-row">
      <div class="flex-row__col">
        <label for="dora" class="form__text-label">Dora</label>
        <input type="number" id="dora" class="form__text-input" v-model.number="hand.dora" />
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'AdditionalOptions',
  props: ['hand'],
}
</script>

<style>
.form__check-input {
  float: left;
  margin: 7px 10px 0 0;
}
.form__check-label {
  display: table;
}
.form__text-label {
  padding-right: 10px;
}
.form__text-input {
  border: 1px solid #888;
  border-radius: 3px;
  background: #fff;
  padding: 3px 8px;
  font-size: 1em;
  width: 100px;
}
</style>
