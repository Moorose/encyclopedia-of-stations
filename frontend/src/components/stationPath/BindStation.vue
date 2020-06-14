<template>
  <div class="bind-station">
    <div class="header">Введите ЕСР станции</div>
    <div class="input">
      <input
        v-model.trim="UNM"
        type="number"
        :placeholder="placeholder"
        class="field"
        @input="findStation"
      >
    </div>
    <div v-if="bindStation" class="station">
      <div class="station__header">ЕСР</div>
      <div class="station__header">Наименование станции</div>
      <div>{{bindStation.UNM}}</div>
      <div>{{bindStation.name}}</div>
    </div>
    <div v-if="error" class="error">
      {{error.message}}
    </div>
    <div class="menu">
      <Button class="button" :disabled="!!error" :text="buttonAddText" @click="save"/>
      <Button class="button" :text="buttonEndText" @click="reset"/>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'BindStation',
    components: {
      Button: () => import('@/components/Button'),
    },
    props: {
      stationId: {
        type: Number,
        required: true,
      },
      stations: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        bindStation: null,
        buttonEndText: 'Завершить',
        buttonAddText: 'Добавить',
        placeholder: 'ЕСР',
        UNM: '',
        error: null,
      };
    },
    methods: {
      ...mapActions('stations', ['getStationsByUNM', 'bindStationById']),
      async save() {
        const { stationId, bindStation } = this;

        if (!this.error && bindStation) {
          await this.bindStationById({
            parentStationId: stationId,
            childStationId: bindStation.id,
          });
          this.reset(true);
        }
      },
      reset(update = false) {
        this.$emit('close', { update });
      },
      async findStation() {
        const { getStationsByUNM, UNM } = this;

        if (`${UNM}`.length >= 5) {
          const result = await getStationsByUNM(UNM);

          this.bindStation = result || this.bindStation;
          if (this.bindStation) this.checkError();
        }
      },
      checkError() {
        const { stations, stationId, bindStation } = this;

        if (stationId === bindStation.id) {
          this.error = {
            message: 'Станция не может ссылаться на себя',
          };

          return;
        }
        if (stations.filter((station) => station.id === bindStation.id).length) {
          this.error = {
            message: 'Эта станция уже добавлена',
          };

          return;
        }
        this.error = null;
      },
    },
    computed: {},
  };
</script>

<style lang="sass" scoped>
  .bind-station
    width: 100%
    display: flex
    flex-direction: column

    .header
      font-size: base-unit(20)

    .station
      display: grid
      grid-template-columns: base-unit(200) auto
      grid-template-rows: auto
      row-gap: base-unit(10)
      align-items: center
      font-size: base-unit(24)

      &__header
        background-color: $dust-storm-color

    .error
      padding: base-unit(20) 0 0 base-unit(20)
      align-self: flex-start
      font-size: base-unit(20)
      color: $red-color

    .input
      padding: base-unit(20) 0

      .field
        padding-left: base-unit(10)
        width: 100%
        height: base-unit(40)
        border: 2px solid $blossom-color
        font-size: base-unit(24)
        border-radius: 10px
        background-color: $soft-peach-color

        &:hover
          background-color: $dust-storm-color

        &:focus
          background-color: $dust-storm-color

    .menu
      display: flex
      justify-content: flex-end
      padding: base-unit(20) 0 0 0

      .button
        align-self: flex-end
        font-size: base-unit(24)
        width: base-unit(260)
        height: base-unit(50)
        margin-left: base-unit(20)
</style>
