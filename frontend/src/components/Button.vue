<template>
  <button class="button" :disabled="disabled" v-on="$listeners">
    {{text}}
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      disabled: {
        type: Boolean,
      },
      text: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style lang="sass" scoped>
  .button
    color: $pickled-bluewood-color
    background-color: $soft-peach-color
    border: 2px solid $blossom-color
    border-radius: 10px
    font-size: base-unit(30)

    &:disabled
      background-color: $dust-storm-color
      color: $soft-peach-color

      &:hover
        background-color: $dust-storm-color
        color: $soft-peach-color

    &:hover
      background-color: $blossom-color
</style>
