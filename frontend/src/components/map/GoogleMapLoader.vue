<template>
  <div class="container">
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
    </template>
  </div>
</template>

<script>
  import GoogleMapsApiLoader from 'google-maps-api-loader';

  export default {
    name: 'GoogleMapLoader',
    props: {
      mapConfig: Object,
      apiKey: String,
    },
    data() {
      return {
        google: null,
        map: null,
      };
    },
    async mounted() {
      const googleMapApi = await GoogleMapsApiLoader({
        apiKey: this.apiKey,
      });

      this.google = googleMapApi;
      this.initializeMap();
    },

    methods: {
      initializeMap() {
        const mapContainer = this.$refs.googleMap;
        const config = {
          ...this.mapConfig,
          mapTypeId: this.google.maps.MapTypeId.ROADMAP,
        };

        this.map = new this.google.maps.Map(mapContainer, config);
      },
    },

  };
</script>

<style lang="sass" scoped>
  .container
    width: 100%
    height: 100%

    .google-map
      width: 100%
      height: 100%
</style>
