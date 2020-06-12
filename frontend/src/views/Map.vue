<template>
  <GoogleMapLoader
    :mapConfig="mapConfig"
    :apiKey="apiKey"
    class="wrapper"
  >
    <template slot-scope="{ google, map }">
      <GoogleMapMarker
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
  import GoogleMapMarker from '../components/map/GoogleMapMarker';

  export default {
    name: 'Map',
    components: {
      GoogleMapLoader,
      GoogleMapMarker,
    },
    data() {
      return {
        apiKey: 'AIzaSyBZHuPV47lE6RPlTkE3SxnXAq2mDceqw98',
        // apiKey: process.env.GOOGLE_API_KEY,
        markers: [
          {
            id: 'a',
            position: {
              lat: 54.939616,
              lng: 73.385906,
            },
          },
          {
            id: 'b',
            position: {
              lat: 55.035588,
              lng: 82.895181,
            },
          },
          {
            id: 'c',
            position: {
              lat: 56.460470,
              lng: 84.991118,
            },
          }],
      };
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
  };
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100%
    height: calc(100vh - #{base-unit(124)})

</style>
