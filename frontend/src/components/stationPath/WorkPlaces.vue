<template>
  <div class="wrapper">
    <div class="table">
      <div class="name">ID:</div>
      <div class="field">{{}}</div>
      <div class="name">Наименование:</div>
      <div class="field">{{}}</div>
      <div class="name">ЕСР:</div>
      <div class="field">{{}}</div>
      <div class="name">Классность:</div>
      <div class="field">{{}}</div>
      <div class="name">Описание:</div>
      <div class="field">{{}}</div>
    </div>
    <Button class="button" :text="buttonText" @click="editHandler"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'WorkPlaces',
    components: {
      Button: () => import('@/components/Button.vue'),

    },
    props: {
      stationId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        workplaces: [],
        editProcess: false,
        buttonText: 'Редактировать',
      };
    },
    async created() {
      this.workplaces = await this.getWorkPlacesByStationId(this.stationId);
    },
    computed: {
      ...mapGetters('user', ['isAllowed']),
    },
    methods: {
      ...mapActions('workplaces', ['getWorkPlacesByStationId']),
      editHandler() {
        this.editProcess = !this.editProcess;
      },
    },
  };
</script>

<style lang="sass" scoped>
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
      grid-template-columns: base-unit(200) auto
      column-gap: base-unit(45)
      row-gap: base-unit(10)
      align-items: center
      margin-bottom: base-unit(20)
      font-size: base-unit(24)


      .name
        justify-self: end

      .field
        justify-self: start

    .button
      align-self: flex-end
      font-size: base-unit(24)
      width: base-unit(260)
      height: base-unit(50)
</style>
