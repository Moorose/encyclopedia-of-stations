<template>
  <div class="container">
    <div class="header">
      Страница пользователя
    </div>
    <div v-if="user" class="wrapper">
      <div class="table">
        <div class="name">{{placeholder.login}}:</div>
        <div class="cell">
          <div class="content text">
            {{user.login}}
          </div>
        </div>
        <div class="name">{{placeholder.role}}:</div>
        <div class="cell">
          <div v-if="!editProcess" class="content text">
            {{userRole}}
          </div>
          <div v-else class="content">
            <select v-model="user.role" class="field">
              <option disabled value="">{{placeholder.role}}</option>
              <option
                v-for="[key, value] in Object.entries(UserRole)"
                :value="value"
                :key="key"
              >{{ key }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="editProcess && getError(0)" class="error">{{ getError(0).message }}</div>
        <div class="name">{{placeholder.firstName}}:</div>
        <div class="cell">
          <div v-if="!editProcess" class="content text">
            {{user.firstName}}
          </div>
          <div v-else class="content">
            <input
              v-model.trim="user.firstName"
              type="text"
              :placeholder="placeholder.firstName"
              class="field"
            >
          </div>
        </div>
        <div v-if="editProcess && getError(1)" class="error">{{ getError(1).message }}</div>
        <div class="name">{{placeholder.lastName}}:</div>
        <div class="cell">
          <div v-if="!editProcess" class="content text">
            {{user.lastName}}
          </div>
          <div v-else class="content">
            <input
              v-model.trim="user.lastName"
              type="text"
              :placeholder="placeholder.lastName"
              class="field"
            >
          </div>
        </div>
        <div v-if="editProcess && getError(2)" class="error">{{ getError(2).message }}</div>
        <div class="name">{{placeholder.patronymicName}}:</div>
        <div class="cell">
          <div v-if="!editProcess" class="content text">
            {{user.patronymicName}}
          </div>
          <div v-else class="content">
            <input
              v-model.trim="user.patronymicName"
              type="text"
              :placeholder="placeholder.patronymicName"
              class="field"
            >
          </div>
        </div>
        <div v-if="editProcess && getError(3)" class="error">{{ getError(3).message }}</div>
        <div class="name">{{placeholder.position}}:</div>
        <div class="cell">
          <div v-if="!editProcess" class="content text">
            {{user.position}}
          </div>
          <div v-else class="content">
            <input
              v-model="user.position"
              type="text"
              :placeholder="placeholder.position"
              class="field"
            >
          </div>
        </div>
      </div>
      <div v-if="editPasswordProcess" class="wrapper">
        <div class="table">
          <div class="name password">
            {{placeholder.password}}:
          </div>
          <div class="cell password">
            <div class="content">
              <input
                v-model="user.password"
                type="password"
                :placeholder="placeholder.password"
                class="field"
              >
            </div>
          </div>
          <div class="name">
            {{placeholder.passwordRetry}}:
          </div>
          <div class="cell">
            <div class="content">
              <input
                v-model="user.passwordRetry"
                type="password"
                :placeholder="placeholder.passwordRetry"
                class="field"
              >
            </div>
          </div>
          <div v-if="getError(4)" class="error">{{ getError(4).message }}</div>
        </div>
        <div class="menu">
          <Button class="button" :text="buttonPasswordText" @click="editPassword"/>
        </div>
      </div>
      <div class="menu">
        <Button
          v-if="editProcess && !editPasswordProcess"
          class="button"
          :text="buttonPasswordText"
          @click="editPassword"
        />
        <Button v-if="isAllowed({ properRole })" class="button" :text="buttonSaveText" @click="saveHandler"/>
        <Button v-if="editProcess" class="button" text="Отмена" @click="resetHandler"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import { UserRole } from '@/modules/UserRole';

  export default {
    name: 'Profile',
    components: {
      Button: () => import('@/components/Button.vue'),
    },
    data() {
      return {
        UserRole,
        properRole: UserRole.Admin,
        myProfile: true,
        editProcess: false,
        editPasswordProcess: false,
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
        user: null,
        cachedUser: null,
        errors: [],
      };
    },
    async created() {
      if (this.$route.name === 'MyProfile') {
        this.user = { ...this.currentUser };
      } else {
        this.user = await this.getUserById(this.$route.params.id);
        this.cachedUser = this.user;
        this.myProfile = false;
      }
    },
    computed: {
      ...mapState('user', {
        currentUser: 'user',
      }),
      ...mapGetters('user', ['isAllowed']),
      buttonSaveText() {
        return this.editProcess ? 'Сохранить' : 'Редактировать';
      },
      buttonPasswordText() {
        return this.editPasswordProcess ? 'Отмена' : 'Сменить пароль';
      },
      getError() {
        return (id) => this.errors.find((e) => e.id === id);
      },
      userRole() {
        return Object.keys(UserRole)[this.user.role];
      },
    },
    methods: {
      ...mapActions('user', ['getUserById', 'updateUser', 'getUserInfo']),
      async saveHandler() {
        const {
          user, editProcess, myProfile, setUser,
        } = this;

        if (editProcess) {
          if (!this.validateForm(user)) return;
          if (myProfile) {
            this.user = await this.updateUser(setUser(user));
            await this.getUserInfo();
          } else {
            this.user = await this.updateUser(setUser(user));
            this.cachedUser = this.user;
          }
        }
        this.editProcess = !this.editProcess;
        if (!this.editProcess) {
          this.editPasswordProcess = false;
        }
      },
      setUser(user) {
        const payload = { ...user };

        delete payload.passwordRetry;

        return payload;
      },
      editPassword() {
        this.editPasswordProcess = !this.editPasswordProcess;
        if (this.editPasswordProcess) {
          this.editProcess = this.editPasswordProcess;
        }
      },
      resetHandler() {
        if (this.myProfile) {
          this.user = this.currentUser;
        } else {
          this.user = this.cachedUser;
        }
        this.errors = [];
        this.editPasswordProcess = false;
        this.editProcess = false;
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

        if (this.editPasswordProcess && !this.validatePassword(user)) {
          this.errors.push({
            id: 4,
            message: 'Пароль введен неправильно',
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

      & > .wrapper
        margin-top: base-unit(20)

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

      .menu
        display: flex
        justify-content: flex-end
        padding-top: base-unit(20)

        .button
          align-self: flex-end
          font-size: base-unit(24)
          width: base-unit(260)
          height: base-unit(50)
          margin-left: base-unit(20)
</style>
