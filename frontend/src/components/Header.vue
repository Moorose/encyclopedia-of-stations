<template>
  <div class="container">
    <div class="left">
      <router-link to="/">
        <div class="logo">
          <span v-t="'header.logo'"/>
        </div>
        <div class="name">
          <span v-t="'header.appName'"/>
        </div>
      </router-link>
    </div>
    <div class="right">
      <div v-if="auth" class="login">
        <span v-t="'header.logout'"/>
      </div>
      <div v-else class="login">
        <span v-t="'header.login'"/>
      </div>
      <div class="search">
        <router-link to="/search">
          <span v-t="'header.search'"/>
        </router-link>
      </div>
      <div class="profile">
        <router-link to="/profile">
          <span v-t="'header.profile'"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        auth: true,
      };
    },
  };
</script>

<style lang="sass" scoped>
  .container
    display: flex
    justify-content: space-between
    align-items: center
    height: base-unit($header-height)

    .left
      display: flex

      .logo
        background-color: $alizarin-crimson-color

      .name
        fon

    .right
      display: flex

</style>
