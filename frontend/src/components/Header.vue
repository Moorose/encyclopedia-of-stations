<template>
  <div class="wrapper">
    <div class="container">
      <div class="app-name">
        Энциклопедия станций
      </div>
      <div v-if="loggedIn" class="auth-menu">
        <div v-if="user" class="user">
          <router-link to="/profile">
            {{ user.username }}
          </router-link>
        </div>
        <div @click="logout" class="exit">
          Выход
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Header',
    computed: {
      ...mapState('user', ['loggedIn', 'user']),
    },
    methods: {
      ...mapActions('user', ['logout']),
    },
  };
</script>

<style lang="sass" scoped>
  .wrapper
    border-bottom: 2px solid $blossom-color
    width: 100%
    display: flex
    justify-content: center

    .container
      display: flex
      justify-content: space-between
      align-items: center
      height: $header-height
      width: $workspace-width
      padding: 0 base-unit(40)

      .app-name
        font-size: base-unit(36)

      .auth-menu
        display: flex
        align-items: center
        font-size: base-unit(24)

        .exit
          margin-left: base-unit(65)

</style>
