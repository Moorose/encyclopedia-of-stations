<template>
  <div class="wrapper">
    <div v-if="stations.length" :class="tableClass">
      <div class="header cell id">ID</div>
      <div class="header cell station">Наименование станции</div>
      <div class="header cell unm">ЕСР</div>
      <div v-if="editProcess" class="header cell"></div>
      <template v-if="!editProcess">
        <template v-for="station in stations">
          <router-link :key="`id${station.id}`" :to="`/station/${station.id}`">
            <div class="data cell id">{{station.id}}</div>
          </router-link>
          <router-link :key="`name${station.id}`" :to="`/station/${station.id}`">
            <div class="data cell station">{{station.name}}</div>
          </router-link>
          <router-link :key="`UNM${station.id}`" :to="`/station/${station.id}`">
            <div class="data cell unm">{{station.UNM}}</div>
          </router-link>
        </template>
      </template>
      <template v-else>
        <template v-for="station in stations">
          <div :key="`id${station.id}`" class="data cell id">{{station.id}}</div>
          <div :key="`name${station.id}`" class="data cell station">{{station.name}}</div>
          <div :key="`UNM${station.id}`" class="data cell unm">{{station.UNM}}</div>
          <div :key="`btn${station.id}`" class="data cell">
            <Button class="close" text="x" @click="removeRelation(station.id)"/>
          </div>
        </template>
      </template>
    </div>
    <div v-if="isAllowed({ properRole })" class="menu">
      <Button v-if="editProcess" class="button" :text="buttonAddText" @click="addStationHandler"/>
      <Button class="button" :text="getButtonText" @click="editHandler"/>
    </div>
    <ModalContent :isVisible="modalIsVisible" @close="closeModal">
      <BindStation @close="closeModal" :stationId="stationId" :stations="stations"/>
    </ModalContent>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { UserRole } from '@/modules/UserRole';
  import BindStation from './BindStation';

  export default {
    name: 'PassingStations',
    components: {
      Button: () => import('@/components/Button'),
      ModalContent: () => import('@/components/ModalContent'),
      BindStation,
    },
    props: {
      stationId: {
        type: Number,
        required: true,
      },
      stations: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        properRole: UserRole.Editor,
        editProcess: false,
        modalIsVisible: false,
        buttonEditText: 'Редактировать',
        buttonEndText: 'Закончить',
        buttonAddText: 'Добавить',
      };
    },
    methods: {
      ...mapActions('stations', ['unbindStationById']),
      editHandler() {
        this.editProcess = !this.editProcess;
      },
      addStationHandler() {
        this.modalIsVisible = !this.modalIsVisible;
      },
      closeModal(payload) {
        if (payload && payload.update) {
          this.$emit('save');
        }
        this.modalIsVisible = !this.modalIsVisible;
      },
      async removeRelation(id) {
        const response = await this.unbindStationById({
          parentStationId: this.stationId,
          childStationId: id,
        });

        if (response) {
          this.$emit('save');
        }
      },
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
      grid-template-columns: base-unit(100) auto base-unit(150)

      &-edit
        grid-template-columns: base-unit(100) auto base-unit(150) base-unit(100)

      .cell
        display: flex
        align-items: center
        justify-content: center
        height: base-unit(50)

        &.station
          padding-left: base-unit(30)
          justify-content: flex-start

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
