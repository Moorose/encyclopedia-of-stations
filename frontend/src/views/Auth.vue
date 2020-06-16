<template>
  <div class="wrapper">
    <span class="title">Вход в систему</span>
    <div class="form">
      <input v-model="login" @blur="checkError" type="text" placeholder="Логин" class="field">
      <input v-model="password" @blur="checkError" type="password" placeholder="Пароль" class="field">
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <Button
    class="button"
    :text="loginButtonText"
    @click="loginHandler"
    @keyup:enter="loginHandler"
    />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Auth',
    components: {
      Button: () => import('@/components/Button.vue'),
    },
    data() {
      return {
        loginButtonText: 'Вход',
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
            .catch(() => {
              this.setError('Неверный логин или пароль');
            });

          return;
        }
        this.setError('Поля должны быть заполнены');
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
    justify-content: center
    height: calc(100vh - #{base-unit(62)})

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
        padding-left: base-unit(10)
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
      width: base-unit(150)
      height: base-unit(50)
</style>
