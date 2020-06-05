<template>
  <div id="app">
    <div class="main-wrapper">
      <div class="menu">
        <Header/>
        <SubHeader/>
      </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      Header: () => import('@/components/Header.vue'),
      SubHeader: () => import('@/components/SubHeader.vue'),
    },
  };
</script>

<style lang="sass" scoped>
  #app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50

  .main-wrapper
    display: flex
    flex-direction: column
    align-items: center

    .menu
      width: 100%
      display: flex
      flex-direction: column
      align-items: center
      background-color: $soft-peach-color
</style>
