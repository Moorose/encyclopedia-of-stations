<template>
  <div class="wrapper">
    <span class="title">Вход в систему</span>
    <div class="form">
      <input v-model="login" @blur="checkError" type="text" placeholder="Логин" class="field login">
      <input v-model="password" @blur="checkError" type="password" placeholder="Пароль" class="field password">
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <button class="button" @click="loginHandler">
      Вход
    </button>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Auth',
    data() {
      return {
        login: '',
        password: '',
        error: null,
      };
    },
    computed: {
      ...mapState('user', ['loggedIn']),
    },
    methods: {
      ...mapActions('user', ['loginAction']),
      loginHandler() {
        const { login, password } = this;

        if (login && password) {
          this.loginAction({
            login,
            password,
          })
            .catch((error) => {
              this.setError(error);
            });

          return;
        }
        this.setError('Поля должны бытьзаполнены');
      },
      setError(error) {
        this.password = '';
        this.error = error;
      },
      checkError() {
        this.error = null;
      },
    },
  };
</script>

<style lang="sass" scoped>
  .wrapper
    display: flex
    align-items: center
    flex-direction: column
    padding-top: base-unit(25)

    .title
      font-size: base-unit(36)
      margin-bottom: base-unit(25)

    .form
      display: flex
      align-items: center
      flex-direction: column

      .field
        width: base-unit(425)
        height: base-unit(40)
        border: 2px solid $blossom-color
        font-size: base-unit(24)
        border-radius: 10px
        margin-bottom: base-unit(25)
        background-color: $soft-peach-color

        &:hover
          background-color: $dust-storm-color

        &:focus
          background-color: $dust-storm-color

    .error
      font-size: base-unit(18)
      color: $red-color
      margin-bottom: base-unit(25)

    .button
      background-color: $soft-peach-color
      border: 2px solid $blossom-color
      border-radius: 10px
      font-size: base-unit(30)
      width: base-unit(150)
      height: base-unit(50)

      &:hover
        background-color: $dust-storm-color
</style>
