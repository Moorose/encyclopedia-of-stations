<template>
  <div class="wrapper">
    <div class="header">AddStation</div>
  <div class="content">{{JSON.stringify(coordinates)}}</div>
  </div>
</template>

<script>
  export default {
    name: 'AddStation',
    props: {
      coordinates: Object,
    },
  };
</script>

<style lang="sass" scoped>

</style>
