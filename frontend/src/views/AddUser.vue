<template>
  <div class="container">
    <div class="header">
      Создание нового пользователя
    </div>
    <div class="wrapper">
      <div class="table">
        <div class="name">{{placeholder.login}}:</div>
        <div class="cell">
          <input
            v-model.trim="user.login"
            type="text"
            :placeholder="placeholder.login"
            class="field"
          >
        </div>
        <div v-if="getError(5)" class="error">{{ getError(5).message }}</div>
        <div class="name">{{placeholder.firstName}}:</div>
        <div class="cell">
          <input
            v-model.trim="user.firstName"
            type="text"
            :placeholder="placeholder.firstName"
            class="field"
          >
        </div>
        <div v-if="getError(0)" class="error">{{ getError(0).message }}</div>
        <div class="name">{{placeholder.lastName}}:</div>
        <div class="cell">
          <input
            v-model.trim="user.lastName"
            type="text"
            :placeholder="placeholder.lastName"
            class="field"
          >
        </div>
        <div v-if="getError(1)" class="error">{{ getError(1).message }}</div>
        <div class="name">{{placeholder.patronymicName}}:</div>
        <div class="cell">
          <input
            v-model.trim="user.patronymicName"
            type="text"
            :placeholder="placeholder.patronymicName"
            class="field"
          >
        </div>
        <div v-if="getError(2)" class="error">{{ getError(2).message }}</div>
        <div class="name">{{placeholder.position}}:</div>
        <div class="cell">
          <input
            v-model.trim="user.position"
            type="text"
            :placeholder="placeholder.position"
            class="field"
          >
        </div>
        <div v-if="getError(3)" class="error">{{ getError(3).message }}</div>
        <div class="name">{{placeholder.role}}:</div>
        <div class="cell">
          <select v-model="user.role" class="field">
            <option disabled value="">{{placeholder.role}}</option>
            <option
              v-for="[key, value] in Object.entries(userRole)"
              :value="value"
              :key="key"
            >{{ key }}
            </option>
          </select>
        </div>
        <div class="name password">{{placeholder.password}}:</div>
        <div class="cell password">
          <input
            v-model="user.password"
            type="password"
            :placeholder="placeholder.password"
            class="field"
          >
        </div>
        <div class="name">{{placeholder.passwordRetry}}:</div>
        <div class="cell">
          <input
            v-model="user.passwordRetry"
            type="password"
            :placeholder="placeholder.passwordRetry"
            class="field"
          >
        </div>
        <div v-if="getError(4)" class="error">{{ getError(4).message }}</div>
      </div>
      <Button class="button" :text="buttonText" @click="saveHandler"/>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { UserRole } from '@/modules/UserRole';

  export default {
    name: 'AddUser',
    components: {
      Button: () => import('@/components/Button.vue'),
    },
    data() {
      return {
        userRole: UserRole,
        buttonText: 'Создать',
        placeholder: {
          login: 'Login',
          firstName: 'Имя',
          lastName: 'Фамилия',
          patronymicName: 'Отчество',
          position: 'Должность',
          role: 'Выберите роль',
          password: 'Пароль',
          passwordRetry: 'Введите пароль повторно',
        },
        user: {
          login: '',
          firstName: '',
          lastName: '',
          patronymicName: '',
          position: '',
          role: null,
          password: '',
          passwordRetry: '',
        },
        errors: [],
      };
    },
    methods: {
      ...mapActions('user', ['createUser']),
      async saveHandler() {
        const { user, setUser } = this;

        if (this.validateForm(user)) {
          this.createUser(setUser(user))
            .then(({ data }) => {
              this.$router.push({ name: 'Profile', params: { id: data.id } });
            })
            .catch(({ response }) => {
              const { error, message, statusCode } = response.data;

              if (statusCode === 422) {
                this.errors.push({
                  id: 5,
                  error,
                  message,
                });
              }
            });
        }
      },
      setUser(user) {
        const payload = { ...user };

        delete payload.passwordRetry;

        return payload;
      },
      validateForm(user) {
        this.errors = [];

        if (!this.validateString(user.firstName)) {
          this.errors.push({
            id: 0,
            message: 'Неверное имя',
          });
        }
        if (!this.validateString(user.lastName)) {
          this.errors.push({
            id: 1,
            message: 'Неверная фамилия',
          });
        }
        if (!this.validateString(user.patronymicName)) {
          this.errors.push({
            id: 2,
            message: 'Неверное отчество',
          });
        }
        if (!this.validateString(user.position)) {
          this.errors.push({
            id: 3,
            message: 'Неверная должность',
          });
        }
        if (!this.validatePassword(user)) {
          this.errors.push({
            id: 4,
            message: 'Пароль введен неправильно',
          });
        }
        if (!this.validateString(user.login)) {
          this.errors.push({
            id: 5,
            message: 'Неверный login',
          });
        }

        return !this.errors.length;
      },
      validateString(string, length = 1) {
        return string && string.length > length;
      },
      validatePassword({ password, passwordRetry }, length = 1) {
        return password && passwordRetry && password.length > length
          && passwordRetry.length > length && password === passwordRetry;
      },
    },
    computed: {
      getError() {
        return (id) => this.errors.find((e) => e.id === id);
      },
    },
  };
</script>

<style lang="sass" scoped>
  .container
    display: flex
    flex-direction: column
    align-items: flex-start
    padding: base-unit(20) base-unit(50)

    .header
      font-size: base-unit(30)
      padding-bottom: base-unit(20)

    .wrapper
      background: $soft-peach-color
      border: 2px solid $dust-storm-color
      border-radius: 5px
      padding: base-unit(20)
      display: flex
      flex-direction: column
      width: 100%

      .table
        display: grid
        grid-template-columns: base-unit(300) auto
        grid-auto-rows: base-unit(50)
        column-gap: base-unit(45)
        row-gap: base-unit(10)
        align-items: center
        font-size: base-unit(24)

        .name
          justify-self: end

        .cell
          justify-self: stretch

          .content
            display: flex
            align-items: flex-start

            &.text
              padding-left: base-unit(12)

        .password
          padding-top: base-unit(20)

        .error
          padding-left: base-unit(12)
          font-size: base-unit(18)
          color: $red-color
          grid-column: 2 / 3
          align-self: flex-start
          justify-self: flex-start

        .field
          padding-left: base-unit(10)
          width: 100%
          height: base-unit(40)
          border: 2px solid $blossom-color
          font-size: base-unit(24)
          border-radius: 10px
          background-color: $soft-peach-color

          &:hover
            background-color: $dust-storm-color

          &:focus
            background-color: $dust-storm-color

      .button
        align-self: flex-end
        font-size: base-unit(24)
        width: base-unit(260)
        height: base-unit(50)
        margin-top: base-unit(20)
</style>
