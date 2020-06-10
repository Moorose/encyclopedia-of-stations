<template>
  <div class="wrapper">
    <div class="search-bar">
      <span class="header">
        Поиск пользователя
      </span>
      <input
        v-model="searchValue"
        @change="searchUsers"
        type="text"
        :placeholder="placeholder"
        class="field"
      >
    </div>
    <div class="table">
      <div class="header cell id">ID</div>
      <div class="header cell">ФИО</div>
      <div class="header cell">Login</div>
      <div class="header cell">Должность</div>
      <div class="header cell">Роль</div>
      <template v-for="user in users">
        <router-link :key="`id${user.id}`" :to="`/user/${user.id}`">
          <div class="data cell id">{{user.id}}</div>
        </router-link>
        <router-link :key="`username${user.id}`" :to="`/user/${user.id}`">
          <div class="data cell">{{username(user)}}</div>
        </router-link>
        <router-link :key="`login${user.id}`" :to="`/user/${user.id}`">
          <div class="data cell">{{user.login}}</div>
        </router-link>
        <router-link :key="`position${user.id}`" :to="`/user/${user.id}`">
          <div class="data cell">{{user.position}}</div>
        </router-link>
        <router-link :key="`role${user.id}`" :to="`/user/${user.id}`">
          <div class="data cell">{{user.role}}</div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'SearchUser',
    data() {
      return {
        placeholder: 'Введите данные пользователя...',
        searchValue: '',
        users: [],
      };
    },
    methods: {
      ...mapActions('user', ['searchUsersByString']),
      async searchUsers() {
        const { searchValue } = this;

        if (!searchValue) {
          return;
        }

        const users = await this.searchUsersByString(searchValue);

        console.log(users);
        this.users = users;
      },
    },
    computed: {
      username() {
        return (user) => `${user.firstName} ${user.lastName} ${user.patronymicName}`;
      },
    },
  };
</script>

<style lang="sass" scoped>
  .wrapper
    display: flex
    flex-direction: column

    .search-bar
      padding: base-unit(20) base-unit(50) base-unit(40)
      display: flex
      align-items: flex-start
      flex-direction: column

      .header
        font-size: base-unit(30)
        margin-bottom: base-unit(20)

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

    .table
      display: grid
      grid-template-columns: base-unit(70) auto repeat(3, base-unit(300))

      .cell
        display: flex
        align-items: center
        justify-content: center
        height: base-unit(50)
        border-left: 2px solid $blossom-color

        &.id
          border-left: none

      .header
        background-color: $dust-storm-color
        border-top: 2px solid $blossom-color
        font-size: base-unit(30)

      .data
        font-size: base-unit(24)
</style>
