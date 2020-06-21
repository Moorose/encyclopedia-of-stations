<template>
  <div v-if="isVisible" @click.stop="close" class="modal">
    <div @click.stop class="content">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModalContent',
    props: {
      isVisible: {
        required: true,
        type: Boolean,
      },
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style lang="sass" scoped>
  .modal
    position: fixed
    z-index: $modal-z-index
    overflow: auto
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.4)

    .content
      margin: auto
      width: fit-content
      background: $soft-peach-color
      border: 2px solid $dust-storm-color
      border-radius: 5px
      padding: base-unit(20)
</style>
