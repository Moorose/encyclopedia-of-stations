<template>
  <div class="wrapper">
    <div class="container">
      <div class="app-name">
        Энциклопедия станций
      </div>
      <div v-if="isLogged" class="auth-menu">
        Вход
      </div>
      <div v-else class="auth-menu">
        <div class="user">
          {{ user.username }}
        </div>
        <div class="exit">
          Выход
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        isLogged: false,
        user: {
          username: 'Василий иванович',
        },
      };
    },
  };
</script>

<style lang="sass" scoped>
.wrapper
  border-bottom: 2px solid $heder-border-color
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
