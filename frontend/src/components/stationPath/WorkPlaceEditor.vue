<template>
  <div class="wrapper">
    <div v-if="isPresent" class="table">
      <div class="name">Рабочее место:</div>
      <div class="cell content">{{ workPlace.name }}</div>
      <div class="name">Должность:</div>
      <div class="cell content">{{ workPlace.position }}</div>
      <div class="name">Телефон:</div>
      <div class="cell content">{{ workPlace.telephone }}</div>
      <div class="name">IP-адрес:</div>
      <div class="cell content">{{ workPlace.IPAddress }}</div>
      <div class="name">Пароль:</div>
      <div class="cell content">{{ workPlace.password }}</div>
      <div class="name">AO:</div>
      <div class="cell content">{{ workPlace.AO }}</div>
      <div class="name">Формы ЭТД:</div>
      <div class="cell content">{{ workPlace.ATDForms }}</div>
      <div class="name">Описание:</div>
      <div class="cell content">{{ workPlace.description }}</div>
      <div class="cell messages messages-header">Перечень сообщений, передаваемых в АСОУП</div>
      <div class="cell messages">{{ workPlace.ASOUPMessage }}</div>
    </div>
    <div v-else class="table">
      <div class="name">Рабочее место:</div>
      <div class="cell">
        <input
          v-model.trim="workPlace.name"
          type="text"
          :placeholder="placeholder.name"
          class="field"
        >
      </div>
      <div class="name">Должность:</div>
      <div class="cell">
        <input
          v-model.trim="workPlace.position"
          type="text"
          :placeholder="placeholder.position"
          class="field"
        >
      </div>
      <div class="name">Телефон:</div>
      <div class="cell">
        <input
          v-model.trim="workPlace.telephone"
          type="text"
          :placeholder="placeholder.telephone"
          class="field"
        >
      </div>
      <div class="name">IP-адрес:</div>
      <div class="cell">
        <input
          v-model.trim="workPlace.IPAddress"
          type="text"
          :placeholder="placeholder.IPAddress"
          class="field"
        >
      </div>
      <div class="name">Пароль:</div>
      <div class="cell">
        <input
          v-model.trim="workPlace.password"
          type="text"
          :placeholder="placeholder.password"
          class="field"
        >
      </div>
      <div class="name">AO:</div>
      <div class="cell">
        <input
          v-model.trim="workPlace.AO"
          type="text"
          :placeholder="placeholder.AO"
          class="field"
        >
      </div>
      <div class="name">Формы ЭТД:</div>
      <div class="cell">
        <input
          v-model.trim="workPlace.ATDForms"
          type="text"
          :placeholder="placeholder.ATDForms"
          class="field"
        >
      </div>
      <div class="name">Описание:</div>
      <div class="cell">
        <textarea
          v-model="workPlace.description"
          :placeholder="placeholder.description"
          class="field field-textarea description"
        ></textarea>
      </div>
      <div class="empty"></div>
      <div class="cell messages messages-header">Перечень сообщений, передаваемых в АСОУП</div>
      <div class="cell messages">
        <textarea
          v-model="workPlace.ASOUPMessage"
          :placeholder="placeholder.ASOUPMessage"
          class="field field-textarea description"
        ></textarea>
      </div>
    </div>
    <div class="menu">
      <Button v-if="!isPresent" class="button" :text="saveButtonText" @click="editHandler(true)"/>
      <Button class="button" :text="declineButtonText" @click="editHandler(false)"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WorkPlaceEditor',
    components: {
      Button: () => import('@/components/Button.vue'),
    },
    props: ['editableContent', 'edit'],
    data() {
      return {
        mode: 'present',
        saveButtonText: 'Сохранить',
        declineButtonText: 'Закрыть',
        workPlace: {
          name: '',
          position: '',
          telephone: '',
          IPAddress: '',
          password: '',
          AO: '',
          ATDForms: '',
          description: '',
          ASOUPMessage: '',
        },
        placeholder: {
          name: 'Рабочее место',
          position: 'Должность',
          telephone: 'Телефон',
          IPAddress: 'IP-адрес',
          password: 'Пароль',
          AO: 'AO',
          ATDForms: 'Формы ЭТД',
          description: 'Описание',
        },
        errors: [],
      };
    },
    mounted() {
      if (this.editableContent) {
        this.workPlace = { ...this.workPlace, ...this.editableContent };
        this.mode = this.edit ? 'edit' : this.mode;
      } else {
        this.mode = this.edit ? 'create' : this.mode;
      }
    },
    methods: {
      editHandler(isUpdate) {
        this.$emit('close', isUpdate);
      },
    },
    computed: {
      isPresent() {
        return this.mode === 'present';
      },
      isEdit() {
        return this.mode === 'edit';
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
      grid-template-columns: base-unit(200) auto
      grid-template-rows: auto
      column-gap: base-unit(45)
      row-gap: base-unit(5)
      align-items: center
      margin: base-unit(20) 0
      font-size: base-unit(24)
      padding: 0 base-unit(20)

      .empty
        grid-column: 1 / 3
        height: base-unit(10)

      .messages
        grid-column: 1 / 3
        padding: 0 base-unit(20)

        &-header
          border-top: 2px solid $dust-storm-color

      .cell
        display: flex
        align-items: center
        justify-content: center
        height: base-unit(50)

      .name
        justify-self: end

      .content
        justify-content: flex-start

      .header
        background-color: $dust-storm-color
        font-size: base-unit(30)

      .field
        color: $pickled-bluewood-color
        padding-left: base-unit(10)
        width: 100%
        height: base-unit(40)
        border: 2px solid $blossom-color
        font-size: base-unit(24)
        border-radius: 10px
        background-color: $soft-peach-color

        &-textarea
          max-width: base-unit(1151)
          height: base-unit(60)
          resize: vertical

          &:focus
            background-color: initial

          &:focus
            background-color: initial

        &:hover
          background-color: $dust-storm-color

        &:focus
          background-color: $dust-storm-color

    .menu
      border-top: 2px solid $dust-storm-color
      display: flex
      justify-content: flex-end
      padding: base-unit(20) 0
      margin: 0 base-unit(20)

      .button
        align-self: flex-end
        font-size: base-unit(24)
        width: base-unit(260)
        height: base-unit(50)
        margin-left: base-unit(20)
</style>
