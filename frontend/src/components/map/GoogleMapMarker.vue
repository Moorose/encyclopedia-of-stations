<template>
  <div></div>
</template>

<script>
  export default {
    name: 'GoogleMapMarker',
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
        markerObject: null,
      };
    },
    mounted() {
      this.markerObject = new this.google.maps.Marker({
        position: this.marker.position,
        marker: this.marker,
        map: this.map,
      });
    },
  };
</script>
