<template>
  <div class="wrapper">
    <div class="header">Профиль сотрудника</div>
    <div class="content">
      <div class="item" v-for="(item, index) in user" :key="item">
        <div class="name">{{data[index]}}</div>
        <div class="value">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      dataMap: ['ID', 'Имя пользователя', 'Должность', 'Роль'],
      userData: {
        id: 1,
        username: 'Алексей228',
        firstName: 'Алексей',
        lastName: 'Благой',
        role: 'Технолог',
      },
    };
  },
  computed: {
    user() {
      const {
        id, username, firstName, lastName, role,
      } = this.userData;

      return [id, `${username}, ${firstName}, ${lastName}`, role];
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
