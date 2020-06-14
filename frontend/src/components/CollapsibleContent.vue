<template>
  <div class="wrapper">
    <div class="header" @click="toggle">
      <div :class="direction">
        <svg width="26" height="17" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 17L0.00961876 0.5L25.9904 0.5L13 17Z" fill="#E5CCCC"/>
        </svg>
      </div>
      <slot name="header"/>
    </div>
    <div :class="['collapsible', { 'collapsed': isCollapsed, 'not-collapsed': !isCollapsed }]">
      <slot name="main"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CollapsibleContent',
    props: {
      collapsed: {
        type: Boolean,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isCollapsed: this.collapsed,
      };
    },
    methods: {
      toggle() {
        this.isCollapsed = !this.isCollapsed;
        this.$emit('contentCollapsed', this.name);
      },
    },
    computed: {
      direction() {
        return this.isCollapsed ? ['triangle'] : ['triangle', 'triangle-open'];
      },
    },
  };
</script>

<style lang="sass" scoped>
  .wrapper
    display: flex
    flex-direction: column
    margin-top: base-unit(3.7)

    .header
      font-size: base-unit(30)
      padding: base-unit(20) 0
      display: flex
      align-self: flex-start

      &:hover
        cursor: pointer

      .triangle
        width: base-unit(30)
        transform: rotate(270deg)
        margin-right: base-unit(10)

        &-open
          transform: none

    .collapsible
      transition: all 0.3s ease-in-out
      overflow: hidden

      &.collapsed
        max-height: 0
</style>
