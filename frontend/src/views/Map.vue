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
    props: {
      center: Object,
    },
    data() {
      return {
        apiKey: 'AIzaSyCa2Qgv4Buh75dyzp1cjfO8jUWrI3bQ8es',
        // apiKey: process.env.GOOGLE_API_KEY,
        markers: [],
      };
    },
    async created() {
      console.log(this.center);

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
        let lat = 54.969401;
        let lng = 73.384296;
        let zoom = 5;

        if (this.center.lat) {
          lat = parseFloat(this.center.lat);
          lng = parseFloat(this.center.lng);
          zoom = 11;
        }

        return {
          zoom,
          maxZoom: 16,
          minZoom: 3,
          streetViewControl: false,
          fullscreenControl: false,
          center: {
            lat,
            lng,
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
