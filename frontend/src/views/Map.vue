<template>
  <GoogleMapLoader
    :mapConfig="mapConfig"
    :apiKey="apiKey"
    class="wrapper"
  >
    <template slot-scope="{ google, map }">
      <StationMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
    </template>
  </GoogleMapLoader>
</template>

<script>
  import GoogleMapLoader from '@/components/map/GoogleMapLoader';
  import { mapActions } from 'vuex';
  import StationMarker from '../components/map/StationMarker';

  export default {
    name: 'Map',
    components: {
      GoogleMapLoader,
      StationMarker,
    },
    data() {
      return {
        apiKey: 'AIzaSyCa2Qgv4Buh75dyzp1cjfO8jUWrI3bQ8es',
        // apiKey: process.env.GOOGLE_API_KEY,
        markers: [],
      };
    },
    async created() {
      const stations = await this.getAllStations();
      const stationsWithCoordinates = stations.filter((station) => station.coordinates !== null);

      this.markers = stationsWithCoordinates.map((station) => {
        return {
          id: station.id,
          position: {
            lat: station.coordinates.lat,
            lng: station.coordinates.lng,
          },
          station,
        };
      });
    },
    computed: {
      mapConfig() {
        return {
          zoom: 5,
          maxZoom: 16,
          minZoom: 3,
          streetViewControl: false,
          fullscreenControl: false,
          center: {
            lat: 54.969401,
            lng: 73.384296,
          },
        };
      },
    },
    methods: {
      ...mapActions('stations', ['getAllStations']),
    },
  };
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100%
    height: calc(100vh - #{base-unit(124)})

</style>
