<template>
    
  <div class="inner-wrapper additional-options">
    
    <div class="flex-row">
      
      <div class="flex-row__col">
        <input type="checkbox" id="riichi" class="form-check-input" v-model="hand.riichi" />
        <label for="riichi" class="form-check-label">
          Riichi
        </label>
      </div>

      <div class="flex-row__col">
        <input type="checkbox" id="double_riichi" class="form-check-input" v-model="hand.double_riichi" />
        <label for="double_riichi" class="form-check-label">
          Double Riichi
        </label>
      </div>

      <div class="flex-row__col">
        <input type="checkbox" id="one_shot" class="form-check-input" v-model="hand.one_shot" />
        <label for="one_shot" class="form-check-label">
          One Shot/Ippatsu
        </label>
      </div>

      <div class="flex-row__col">
        <input type="checkbox" id="tsumo" class="form-check-input" v-model="hand.tsumo" />
        <label for="tsumo" class="form-check-label">
          Tsumo/Self Pick
        </label>
      </div>

    </div>

    <div class="flex-row">
      <div class="flex-row__col">
        <input type="checkbox" id="special_draw" class="form-check-input" v-model="hand.special_draw" />
        <label for="special_draw" class="form-check-label">
          Special draw (After a kong, Robbing the kong, Under the Sea)
        </label>
      </div>
    </div>

    <div class="flex-row">
      <div class="flex-row__col additional-options__dora">
        <label for="dora">Dora</label>
        <input type="number" id="dora" v-model.number="hand.dora" />
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

<style lang="scss">
.additional-options__dora {
  label {
    margin-right: 10px;
  }
  input {
    padding: 2px 5px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
  }
}
</style>
