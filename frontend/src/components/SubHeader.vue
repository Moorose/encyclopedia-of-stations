<template>
  <div class="wrapper">
    <div class="container">
      <div class="menu" v-for="option in menuOptions" :key=option.id>
        <div v-if="option.isAllowed" class="button">
          <router-link :to="option.to">
            <div>{{ option.name }}</div>
          </router-link>
          <div v-if="option.subOptions" class="sub-wrapper">
            <div class="dropdown" v-for="subOption in option.subOptions" :key='subOption.id'>
              <router-link :to="subOption.to" class="link">
                <div class="sub-option">
                  {{ subOption.name }}
                </div>
              </router-link>
            </div>
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
  .wrapper
    border-bottom: 2px solid $heder-border-color
    width: 100%
    display: flex
    justify-content: center

    .container
      display: flex
      justify-content: flex-start
      align-items: center
      height: $header-height
      width: $workspace-width

      .menu
        font-size: base-unit(24)
        height: 100%
        border-left: 2px solid $heder-border-color

        &:first-child
          border-left: none

        .button
          width: base-unit(220)
          display: flex
          align-items: center
          justify-content: center
          height: 100%
          position: relative

          &:hover
            background-color: $dust-storm-color

          &:hover > .sub-wrapper
            display: flex

          .sub-wrapper
            display: none
            flex-direction: column
            position: absolute
            top: 100%
            left: - base-unit(2)
            border: 2px solid $heder-border-color

            .dropdown
              display: flex
              align-items: center
              background-color: $dust-storm-color
              width: base-unit(325)

              &:last-child
                padding-bottom: base-unit(20)

              .link
                width: 100%

              .sub-option
                margin-top: base-unit(20)
                height: base-unit(50)
                line-height: base-unit(50)
                padding-left: base-unit(31)
                text-align: start

                &:hover
                  background-color: $soft-peach-color
</style>
