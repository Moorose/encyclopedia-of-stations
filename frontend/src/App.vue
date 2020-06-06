<template>
  <div id="app">
    <div class="app-main-wrapper">
      <div class="app-menu">
        <Header/>
        <SubHeader/>
      </div>
      <router-view
        v-if="loggedIn"
        :key="$route.path"
        class="workspace"
      />
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
    data() {
      return {
        loggedIn: false,
      };
    },
  };
</script>

<style lang="sass">
  a
    color: inherit
    text-decoration: none

    a:link
      text-decoration: none

    a:visited
      text-decoration: none

    a:active
      text-decoration: none

    a:hover
      text-decoration: none

    /*.stab*/
    /*  height: base-unit(100)*/
    /*  width: base-unit(100)*/
    /*  margin: base-unit(10)*/
    /*  background-color: #8B8181*/



    #app
      font-family: Avenir, Helvetica, Arial, sans-serif
      -webkit-font-smoothing: antialiased
      -moz-osx-font-smoothing: grayscale
      text-align: center
      color: $pickled-bluewood-color

    .app-main-wrapper
      display: flex
      flex-direction: column
      align-items: center
      position: relative

      .app-menu
        position: fixed
        width: 100%
        height: #{ $header-height + $subheader-height }
        z-index: $header-z-index
        display: flex
        flex-direction: column
        align-items: center
        background-color: $soft-peach-color

      .workspace
        width: $workspace-width
</style>
