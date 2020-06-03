<template>
  <div class="wrapper">
  <div class="header">
    <div class="name">{{station.name}}</div>
  </div>
  <div class="content">
    <div class="description">
      <div class="name">Описание станции</div>
      <div>{{station.description}}</div>
      </div>
    <div class="code">
        <div class="name">UNM:</div>
        <div>{{station.UNM}}</div>
      </div>
    <div class="working-place">
      <div class="name">Рабочие места</div>
      <div
        v-for="place in station.workingPlace"
        :key="place" class="place">{{place}}</div>
    </div>
    <div class="child-station">
      <div class="name">Станции попутного следования</div>
      <div
        v-for="station in station.stations"
        :key="station" class="station">{{station}}</div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'Station',
    data() {
      return {
        station: {
          id: 10,
          name: 'Omskaya',
          description: 'Some description',
          UNM: '1561526156254',
          workingPlaces: [1, 2, 3],
          stations: [1, 2],
        },
      };
    },
};
</script>

<style lang="sass" scoped>
.wrapper
  font-size: base-unit(14)

  .header
    display: flex
    font-size: base-unit(18)

  .content
    display: flex

    .description
      display: flex

    .code
      display: flex

    .working-place
      display: flex

    .child-station
      display: flex

  .name
    font-size: base-unit(16)
</style>
