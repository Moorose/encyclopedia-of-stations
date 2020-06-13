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

        return `<div class="popup" id="popup-${id}">
          <h1 class="popup__header">Станция: ${name}</h1>
            <div class="popup__content" id="bodyContent">
              <p lass="popup__unm">ЕСР: ${UNM}</p>
              <p lass="popup__description">${description}</p>
            </div>
            <button
              onclick="document.getElementById('popup-button-${id}').click();"
              class="popup__button"
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
</style>
