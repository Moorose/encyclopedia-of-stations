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
      <AddStationButton
        v-if="isAllowed({properRole})"
        :google="google"
        :map="map"
      />
    </template>
  </GoogleMapLoader>
</template>

<script>
  import GoogleMapLoader from '@/components/map/GoogleMapLoader';
  import { mapActions, mapGetters } from 'vuex';
  import StationMarker from '../components/map/StationMarker';
  import AddStationButton from '../components/map/AddStationButton';
  import { UserRole } from '../modules/UserRole';

  export default {
    name: 'Map',
    components: {
      GoogleMapLoader,
      StationMarker,
      AddStationButton,
    },
    props: {
      center: Object,
    },
    data() {
      return {
        properRole: UserRole.Editor,
        apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
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
      ...mapGetters('user', ['isAllowed']),
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
