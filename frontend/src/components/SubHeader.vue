<template>
  <div class="container">
    <div class="wrapper" v-for="option in menuOptions" :key=option.id>
      <div v-if="option.isAllowed" class="button">
        <router-link :to="option.to">
          <div>{{ option.name }}</div>
        </router-link>
        <div v-if="option.subOptions" class="sub-wrapper">
          <div class="dropdown" v-for="subOption in option.subOptions" :key='subOption.id'>
            <router-link :to="subOption.to">
              <div>{{ subOption.name }}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SubHeader',
    data() {
      return {
        isLogged: false,
        menuOptions: [
          {
            id: 1,
            name: 'Поиск',
            isAllowed: true,
            to: '/',
          },
          {
            id: 2,
            name: 'Карта',
            isAllowed: true,
            to: '/',
          },
          {
            id: 3,
            name: 'Общий список',
            isAllowed: true,
            to: '/',
          },
          {
            id: 4,
            name: 'Пользователи',
            isAllowed: true,
            to: '/',
            subOptions: [
              {
                id: 5,
                name: 'Поиск пользователя',
                isAllowed: true,
                to: '/',
              },
              {
                id: 6,
                name: 'Добавить полбзователя',
                isAllowed: true,
                to: '/',
              },
            ],
          },
          {
            id: 7,
            name: 'О нас',
            isAllowed: true,
            to: '/',
          },
        ],
      };
    },
  };
</script>

<style lang="sass" scoped>
  .container
    display: flex
    justify-content: flex-start
    align-items: center
    height: $header-height
    width: $workspace-width

    .wrapper
      font-size: base-unit(24)
      height: 100%

      .button
        width: base-unit(220)
        display: flex
        align-items: center
        justify-content: center
        height: 100%

        &:hover
          background-color: $dust-storm-color

        .sub-wrapper
          position: relative

          .dropdown
            background-color: $dust-storm-color
            display: none
            width: base-unit(403)
            height: base-unit(135)

            &:hover
              display: block
              background-color: $dust-storm-color
</style>
