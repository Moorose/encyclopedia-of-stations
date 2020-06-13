<template>
  <div class="wrapper">
    <div class="table">
      <div class="name">ID:</div>
      <div class="field">{{ station.id }}</div>
      <div class="name">Наименование:</div>
      <div class="field">{{ station.name }}</div>
      <div class="name">ЕСР:</div>
      <div class="field">{{ station.UNM }}</div>
      <div class="name">Классность:</div>
      <div class="field">{{ station.stationClass }}</div>
      <div class="name">Описание:</div>
      <div class="field description">{{ station.description }}</div>
    </div>
    <Button class="button" :text="buttonText" @click="editHandler"/>
  </div>
</template>

<script>
  export default {
    name: 'StationDescription',
    components: {
      Button: () => import('@/components/Button.vue'),
    },
    props: {
      station: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        buttonText: 'Редактировать',
      };
    },
    methods: {
      editHandler() {
        console.log(this.buttonText);
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

      .description
        text-align: justify

    .button
      align-self: flex-end
      font-size: base-unit(24)
      width: base-unit(260)
      height: base-unit(50)
</style>
