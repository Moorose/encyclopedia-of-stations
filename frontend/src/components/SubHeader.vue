<template>
  <div class="wrapper">
    <div class="container">
      <template v-for="option in menuOptions">
        <div v-if="isAllowed(option)" class="menu" :key=option.id>
          <router-link :to="option.to" class="button">
            <div>
              <div>{{ option.name }}</div>
            </div>
            <div v-if="option.subOptions" class="sub-wrapper">
              <router-link :to="subOption.to" class="dropdown" v-for="subOption in option.subOptions"
                :key='subOption.id'
              >
                <div v-if="isAllowed(subOption)" class="link">
                  <div class="sub-option">
                    {{ subOption.name }}
                  </div>
                </div>
              </router-link>
            </div>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { UserRole } from '@/modules/UserRole';

  export default {
    name: 'SubHeader',
    data() {
      return {
        menuOptions: [
          {
            id: 1,
            name: 'Станции',
            to: '/',
            subOptions: [
              {
                id: 8,
                name: 'Поиск станций',
                to: '/',
              },
              {
                id: 9,
                name: 'Добавить станцию',
                properRole: UserRole.Editor,
                to: '/station/add',
              },
            ],
          },
          {
            id: 2,
            name: 'Карта',
            to: '/map',
          },
          {
            id: 3,
            name: 'Пользователи',
            properRole: UserRole.Admin,
            to: '/user',
            subOptions: [
              {
                id: 5,
                name: 'Поиск пользователя',
                properRole: UserRole.Admin,
                to: '/user',
              },
              {
                id: 6,
                name: 'Добавить пользователя',
                properRole: UserRole.Admin,
                to: '/user/create',
              },
            ],
          },
          {
            id: 7,
            name: 'О нас',
            to: '/about',
          },
        ],
      };
    },
    computed: {
      ...mapGetters('user', ['isAllowed']),
    },
  };
</script>

<style lang="sass" scoped>
  .wrapper
    border-bottom: 2px solid $blossom-color
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
        border-left: 2px solid $blossom-color

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
            border: 2px solid $blossom-color

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
