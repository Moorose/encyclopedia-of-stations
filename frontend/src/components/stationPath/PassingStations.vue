<template>
  <div class="wrapper">
    <div v-if="stations.length" class="table">
      <div class="header cell id">ID</div>
      <div class="header cell station">Наименование станции</div>
      <div class="header cell unm">ЕСР</div>
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
    </div>
    <div v-if="isAllowed({ properRole })" class="menu">
      <Button v-if="editProcess" class="button" :text="buttonAddText" @click="addStationHandler"/>
      <Button class="button" :text="getButtonText" @click="editHandler"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { UserRole } from '@/modules/UserRole';

  export default {
    name: 'PassingStations',
    components: {
      Button: () => import('@/components/Button.vue'),

    },
    props: {
      stations: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        properRole: UserRole.Editor,
        editProcess: false,
        buttonEditText: 'Редактировать',
        buttonEndText: 'Завершить',
        buttonAddText: 'Добавить',
      };
    },
    methods: {
      editHandler() {
        this.editProcess = !this.editProcess;
      },
      addStationHandler() {
        console.log('addStationHandler');
      },
    },
    computed: {
      ...mapGetters('user', ['isAllowed']),
      getButtonText() {
        return this.editProcess ? this.buttonEndText : this.buttonEditText;
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

      .cell
        display: flex
        align-items: center
        justify-content: center
        height: base-unit(50)

        &.station
          padding-left: base-unit(30)
          justify-content: flex-start

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
