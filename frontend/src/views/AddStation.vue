<template>
  <div>
    <div class="header">Создание станции</div>
    <div class="wrapper">
      <div class="table">
        <div class="name">Наименование:</div>
        <div class="cell">
          <div class="content">
            <input
              v-model.trim="station.name"
              type="text"
              :placeholder="placeholder.name"
              class="field"
            >
          </div>
        </div>
        <div class="name">ЕСР:</div>
        <div class="cell">
          <div class="content">
            <input
              v-model.trim="station.UNM"
              type="number"
              :placeholder="placeholder.UNM"
              class="field"
            >
          </div>
        </div>
        <div class="name">Классность:</div>
        <div class="cell">
          <div class="content">
            <select v-model="station.stationClass" class="field">
              <option disabled value="">{{placeholder.stationClass}}</option>
              <option
                v-for="[key, value] in Object.entries(StationClass)"
                :value="value"
                :key="key"
              >{{ getStationClassText(value) }}
              </option>
            </select>
          </div>
        </div>
        <div class="name description">Описание:</div>
        <div class="cell">
          <div class="content">
            <div
              ref="description"
              contentEditable="true"
              :placeholder="placeholder.description"
              class="field field-textarea description"
            ></div>
          </div>
        </div>
        <div class="name">{{placeholder.coordinates}}:</div>
        <div class="cell">
          <div class="coordinates">
            <div>Lat:</div>
            <input
              v-model.trim="station.coordinates.lat"
              type="number"
              :placeholder="placeholder.coordinates"
              class="field field-coordinates"
            >
            <div>Lng:</div>
            <input
              v-model.trim="station.coordinates.lng"
              type="number"
              :placeholder="placeholder.coordinates"
              class="field field-coordinates"
            >
          </div>
        </div>
      </div>
      <div class="menu">
        <Button class="button" :disabled="saveEnable" :text="buttonSaveText" @click="saveHandler"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { StationClass } from '@/modules/StationClass';
  import { mapActions } from 'vuex';

  export default {
    name: 'AddStation',
    components: {
      Button: () => import('@/components/Button.vue'),
    },
    props: {
      coordinates: Object,
    },
    data() {
      return {
        StationClass,
        buttonSaveText: 'Сохранить',
        station: {
          name: '',
          UNM: '',
          stationClass: null,
          description: '',
          coordinates: this.coordinates,
        },
        placeholder: {
          name: 'Наименование',
          UNM: 'ЕСР',
          stationClass: 'Классность',
          description: 'Описание',
          coordinates: 'Координаты',
        },
      };
    },
    methods: {
      ...mapActions('stations', ['saveStationData']),
      saveHandler() {
        this.saveStationData(this.station).then(({ data }) => {
          this.$router.push({ name: 'Station', params: { id: data.id } });
        }).catch((err) => {
          console.log(err);
        });
      },
    },
    computed: {
      saveEnable() {
        const {
          name,
          UNM,
          stationClass,
          coordinates,
        } = this.station;

        return !(name.length && UNM.length && stationClass !== null && coordinates.lat && coordinates.lng);
      },
      getStationClassText() {
        return (stationClass) => {
          switch (stationClass) {
          case 0:
            return 'Промежуточная станция';
          case 1:
            return 'Участковая станция';
          case 2:
            return 'Сортировочная станция';
          case 3:
            return 'Грузовая станция';
          case 4:
            return 'Пассажирская станция';
          default:
            return '';
          }
        };
      },
    },
  };
</script>


<style lang="sass" scoped>
  .header
    text-align: left
    font-size: base-unit(30)
    padding: base-unit(20) base-unit(40)

  .wrapper
    background: $soft-peach-color
    border: 2px solid $dust-storm-color
    border-radius: 5px
    padding: base-unit(20)
    display: flex
    flex-direction: column
    width: 100%

    .table
      display: grid
      grid-template-columns: base-unit(200) auto
      grid-template-rows: auto
      column-gap: base-unit(45)
      row-gap: base-unit(10)
      align-items: center
      margin-bottom: base-unit(20)
      font-size: base-unit(24)

      .name
        justify-self: end

      .cell
        justify-self: stretch

      .coordinates
        display: flex
        align-items: center

      .content
        display: flex
        align-items: flex-start

      .description
        text-align: justify
        align-self: flex-start

      .field
        color: $pickled-bluewood-color
        padding-left: base-unit(10)
        width: 100%
        height: base-unit(40)
        border: 2px solid $blossom-color
        font-size: base-unit(24)
        border-radius: 10px
        background-color: $soft-peach-color

        &-coordinates
          margin: 0 base-unit(20)
          &:last-child
            margin-right: 0
        &-textarea
          min-height: base-unit(40)
          max-width: base-unit(1151)
          height: auto
          resize: vertical

          &:focus
            background-color: initial

          &:focus
            background-color: initial

        &:hover
          background-color: $dust-storm-color

        &:focus
          background-color: $dust-storm-color

    .menu
      display: flex
      justify-content: flex-end

      .button
        align-self: flex-end
        font-size: base-unit(24)
        width: base-unit(260)
        height: base-unit(50)
        margin-left: base-unit(20)
</style>
