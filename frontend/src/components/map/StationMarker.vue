<template>
  <div class="station_popup_hidden">
    <Button
      :id="`popup-button-${station.id}`"
      class="button"
      text="Подробнее"
      @click="goToStationPage"
    />
  </div>
</template>

<script>
  export default {
    name: 'StationMarker',
    components: {
      Button: () => import('@/components/Button.vue'),
    },
    props: {
      google: {
        type: Object,
        required: true,
      },
      map: {
        type: Object,
        required: true,
      },
      marker: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        station: this.marker.station,
        markerObject: null,
        infoWindow: null,
      };
    },
    mounted() {
      const { map, google } = this;

      this.markerObject = new google.maps.Marker({
        position: this.marker.position,
        marker: this.marker,
        map,
      });

      this.infoWindow = new google.maps.InfoWindow({
        content: this.getContent(),
      });

      this.markerObject.addListener('click', () => {
        this.infoWindow.open(map, this.markerObject);
      });
    },
    methods: {
      goToStationPage() {
        this.$router.push({ name: 'Station', params: { id: this.station.id } });
      },
      getContent() {
        const {
          id, name, description, UNM,
        } = this.station;

        return `<div class="popup__station" id="popup-${id}">
          <h1 class="popup__station__header">Станция: ${name}</h1>
            <div class="popup__station__content" id="bodyContent">
              <div class="popup__station__unm">ЕСР: ${UNM}</div>
              <div class="popup__station__description">${description}</div>
            </div>
            <button
              onclick="document.getElementById('popup-button-${id}').click();"
              class="popup__station__button"
            >
              Подробнее
            </button>
          </div>`;
      },
    },
  };
</script>

<style lang="sass">
  .station_popup_hidden
    display: none

  .popup__station
    &__header
      font-size: base-unit(20)
      font-weight: bold
    &__content
      display: flex
      flex-direction: column
      align-items: flex-start
      font-size: base-unit(14)
    &__unm
      margin: base-unit(20) 0
    &__description
      text-align: justify
    &__button
      margin-top: base-unit(20)
</style>
