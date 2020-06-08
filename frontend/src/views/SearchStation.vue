<template>
  <div class="wrapper">

    <div class="search-bar">
      <span class="header">
      Введите название станции
      </span>
      <input
        v-model="searchValue"
        @change="searchStations"
        type="text"
        :placeholder="placeholder"
        class="field"
      >
    </div>
    <div class="table">
      <div class="header cell id">ID</div>
      <div class="header cell station">Наименование станции</div>
      <div class="header cell unm">ЕСР</div>
      <template v-for="station in stations">
        <router-link :key="`id${station.id}`" :to="`/station/${station.id}`">
          <div class="data cell id">{{station.id}}</div>
        </router-link>
        <router-link :key="`name${station.id}`" :to="`/station/${station.id}`">
          <div class="data cell station">{{station.name}}</div>
        </router-link>
        <router-link :key="`UNM${station.id}`" :to="`/station/${station.id}`">
          <div class="data cell unm">{{station.UNM}}</div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'SearchStation',
    data() {
      return {
        placeholder: 'Поиск станции по вашему названию...',
        searchValue: '',
        stations: [],
      };
    },
    methods: {
      ...mapActions('user', ['getUserInfo']),
      ...mapActions('stations', ['searchStationsByName']),
      async searchStations() {
        const { searchValue } = this;

        if (!searchValue) {
          return;
        }

        const stations = await this.searchStationsByName(searchValue);

        console.log(stations);
        this.stations = stations;
      },
    },
  };
</script>

<style lang="sass" scoped>
  .wrapper
    display: flex
    flex-direction: column

    .search-bar
      padding: base-unit(20) base-unit(50) base-unit(40)
      display: flex
      align-items: flex-start
      flex-direction: column

      .header
        font-size: base-unit(30)
        margin-bottom: base-unit(20)

      .field
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

    .table
      display: grid
      grid-template-columns: base-unit(100) auto base-unit(150)

      .cell
        display: flex
        align-items: center
        justify-content: center
        height: base-unit(50)
        border-bottom: 2px solid $blossom-color

        &.id
          border-right: 2px solid $blossom-color

        &.station
          padding-left: base-unit(30)
          justify-content: flex-start

        &.unm
          border-left: 2px solid $blossom-color

      .header
        background-color: $dust-storm-color
        border-top: 2px solid $blossom-color
        font-size: base-unit(30)

      .data
        font-size: base-unit(24)

</style>
