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
          v-model="user.login"
          type="text"
          :placeholder="placeholder.login"
          class="field"
        >
      </div>
      <div class="name">{{placeholder.firstName}}:</div>
      <div class="cell">
        <input
          v-model="user.firstName"
          type="text"
          :placeholder="placeholder.firstName"
          class="field"
        >
      </div>
      <div class="name">{{placeholder.lastName}}:</div>
      <div class="cell">
        <input
          v-model="user.lastName"
          type="text"
          :placeholder="placeholder.lastName"
          class="field"
        >
      </div>
      <div class="name">{{placeholder.patronymicName}}:</div>
      <div class="cell">
        <input
          v-model="user.patronymicName"
          type="text"
          :placeholder="placeholder.patronymicName"
          class="field"
        >
      </div>
      <div class="name">{{placeholder.position}}:</div>
      <div class="cell">
        <input
          v-model="user.position"
          type="text"
          :placeholder="placeholder.position"
          class="field"
        >
      </div>
      <div class="name">{{placeholder.role}}:</div>
      <div class="cell">
        <input
          v-model="user.role"
          type="text"
          :placeholder="placeholder.role"
          class="field"
        >
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
    </div>
    <Button class="button" :text="buttonText" @click="saveHandler"/>
  </div>
</div>
</template>

<script>
  export default {
    name: 'AddUser',
    components: {
      Button: () => import('@/components/Button.vue'),
    },
    props: {
      station: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        buttonText: 'Создать',
        placeholder: {
          login: 'Login',
          firstName: 'Имя',
          lastName: 'Фамилия',
          patronymicName: 'Отчество',
          position: 'Должность',
          role: 'Роль',
          password: 'Пароль',
          passwordRetry: 'Введите пароль повторно',
        },
        user: {
          login: '',
          firstName: '',
          lastName: '',
          patronymicName: '',
          position: '',
          role: '',
          password: '',
          passwordRetry: '',
        },
      };
    },
    methods: {
      saveHandler() {
        console.log(this.user);
      },
    },
  };
</script>

<style lang="sass" scoped>
.container
  display: flex
  flex-direction: column
  align-items: start
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
      column-gap: base-unit(45)
      row-gap: base-unit(10)
      align-items: center
      margin-bottom: base-unit(20)
      font-size: base-unit(24)

      .name
        justify-self: end

      .cell
        justify-self: stretch

      .password
        padding-top: base-unit(20)

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

</style>
