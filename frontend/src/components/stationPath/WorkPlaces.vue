<template>
  <div class="wrapper">
    <div v-if="workplaces.length" :class="tableClass">
        <div class="header cell">ID</div>
        <div class="header cell">Название</div>
        <div class="header cell">IP-адрес</div>
        <div class="header cell">Должность</div>
        <div class="header cell">Телефон</div>
        <div v-if="editProcess" class="header cell"></div>
      <template v-for="workplace in workplaces">
        <div class="data cell" :key="`id${workplace.id}`">{{workplace.id}}</div>
        <div class="data cell" :key="`name${workplace.id}`">{{workplace.name}}</div>
        <div class="data cell" :key="`IPAddress${workplace.id}`">{{workplace.IPAddress}}</div>
        <div class="data cell" :key="`position${workplace.id}`">{{workplace.position}}</div>
        <div class="data cell" :key="`telephone${workplace.id}`">{{workplace.telephone}}</div>
        <div v-if="editProcess" :key="`btn${workplace.id}`" class="data cell">
          <Button class="close" text="x" @click="remove"/>
        </div>
      </template>
    </div>
    <div v-if="isAllowed({ properRole })" class="menu">
      <Button v-if="editProcess" class="button" :text="buttonAddText" @click="editHandler"/>
      <Button class="button" :text="getButtonText" @click="editHandler"/>
    </div>
    <ModalContent :isVisible="modalIsVisible" @close="closeModal">
      Content
    </ModalContent>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { UserRole } from '@/modules/UserRole';

  export default {
    name: 'WorkPlaces',
    components: {
      Button: () => import('@/components/Button.vue'),
      ModalContent: () => import('@/components/ModalContent'),
    },
    props: {
      stationId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        properRole: UserRole.Editor,
        workplaces: [],
        editProcess: false,
        modalIsVisible: false,
        buttonEditText: 'Редактировать',
        buttonEndText: 'Закончить',
        buttonAddText: 'Добавить',
      };
    },
    async created() {
      this.workplaces = await this.getWorkPlacesByStationId(this.stationId);
    },
    computed: {
      ...mapGetters('user', ['isAllowed']),
      getButtonText() {
        return this.editProcess ? this.buttonEndText : this.buttonEditText;
      },
      tableClass() {
        return this.editProcess ? ['table', 'table-edit'] : ['table'];
      },
    },
    methods: {
      ...mapActions('workplaces', ['getWorkPlacesByStationId']),
      editHandler() {
        this.editProcess = !this.editProcess;
      },
      remove() {
        console.log('remove');
      },
      addWorkPlaceHandler() {
        this.modalIsVisible = !this.modalIsVisible;
      },
      async closeModal(isUpdate) {
        if (isUpdate) {
          this.workplaces = await this.getWorkPlacesByStationId(this.stationId);
        }
        this.modalIsVisible = !this.modalIsVisible;
      },
    },
  };
</script>

<style lang="sass" scoped>
  .wrapper
    background: $soft-peach-color
    border: 2px solid $dust-storm-color
    border-radius: 5px
    display: flex
    flex-direction: column
    width: 100%

    .table
      display: grid
      grid-template-columns: base-unit(100) auto auto auto auto

      &-edit
        grid-template-columns: base-unit(100) auto auto auto auto base-unit(100)

      .cell
        display: flex
        align-items: center
        justify-content: center
        height: base-unit(50)

        .close
          display: flex
          align-items: center
          justify-content: center
          font-size: base-unit(30)
          border-color: transparent
          width: 50%

      .header
        background-color: $dust-storm-color
        font-size: base-unit(30)

      .data
        font-size: base-unit(24)

    .menu
      display: flex
      justify-content: flex-end
      padding: base-unit(20)

      .button
        align-self: flex-end
        font-size: base-unit(24)
        width: base-unit(260)
        height: base-unit(50)
        margin-left: base-unit(20)
</style>
