<template>
  <div id="app">
    <div class="app-main-wrapper">
      <header class="app-menu">
        <Header/>
        <SubHeader v-if="loggedIn"/>
      </header>
      <router-view
        v-if="loggedIn"
        :key="$route.path"
        class="workspace"
      />
      <Auth v-else/>
      <div class="stub">text</div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'App',
    components: {
      Header: () => import('@/components/Header.vue'),
      SubHeader: () => import('@/components/SubHeader.vue'),
      Auth: () => import('@/views/Auth.vue'),
    },
    async created() {
      await this.getUserInfo();
    },
    computed: {
      ...mapState('user', ['loggedIn']),
    },
    methods:{
      ...mapActions('user', ['getUserInfo']),
    },
  };
</script>

<style lang="sass">
  .stub
    height: 100px
    width: 100px
    background-color: black

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
        position: sticky
        top: 0
        width: 100%
        z-index: $header-z-index
        display: flex
        flex-direction: column
        align-items: center
        background-color: $soft-peach-color

    .workspace
      width: $workspace-width
</style>
