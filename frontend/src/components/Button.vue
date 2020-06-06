<template>
  <button class="button" v-on="$listeners">
    {{text}}
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      text: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style lang="sass" scoped>
  .button
    background-color: $soft-peach-color
    border: 2px solid $blossom-color
    border-radius: 10px
    font-size: base-unit(30)

    &:hover
      background-color: $dust-storm-color
</style>
