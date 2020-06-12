<template>
  <div class="wrapper">
    <GoogleMapLoader
      :mapConfig="mapConfig"
      :apiKey="apiKey"
      class="map"
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
  </div>
</template>

<script>
  import GoogleMapLoader from '@/components/map/GoogleMapLoader';

  export default {
    name: 'Map',
    components: {
      GoogleMapLoader,
    },
    data() {
      return {
        apiKey: process.env.GOOGLE_API_KEY,
        markers: [],
      };
    },
    computed: {
      mapConfig() {
        return {
          zoom: 9,
          maxZoom: 18,
          fullscreenControl: false,
          center: { lat: 54.969401, lng: 73.384296 },
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
