<template>
  <div class="wrapper">

    <div class="search-bar">
      <span class="header">
      Введите название станции
      </span>
    <input v-model="searchValue" @blur="searchStations" type="text" :placeholder="placeholder" class="field">
    </div>
    <div class="table">
      place  for  data
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
        const stations = await this.searchStationsByName(this.searchValue);

        console.log('search');
        console.log(stations);
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

</style>
