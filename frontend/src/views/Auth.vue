<template>
  <div class="wrapper">
    <h1>Вход в систему</h1>
    <div class="form">
      <input type="text" class="login">
      <input type="text" class="password">
    </div>
    <div class="error">
      Ошибка авторизации: Проверьте ваш логин и пароль
    </div>
    <div class="button">
      <button class="login">
        Вход
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
  };
</script>

<style lang="sass" scoped>

</style>
