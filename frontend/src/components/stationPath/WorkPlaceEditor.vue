<template>
  <div class="wrapper">
    <div v-if="isPresent" class="table">
      <div class="table__row">
        <div class="table__row__name">Рабочее место</div>
        <div class="table__row__cell">{{ workPlace.name }}</div>
      </div>
      <div class="table__row">
        <div class="table__row__name">Должность</div>
        <div class="table__row__cell">{{ workPlace.position }}</div>
      </div>
      <div class="table__row">
        <div class="table__row__name">Телефон</div>
        <div class="table__row__cell">{{ workPlace.telephone }}</div>
      </div>
      <div class="table__row">
        <div class="table__row__name">IP-адрес</div>
        <div class="table__row__cell">{{ workPlace.IPAddress }}</div>
      </div>
      <div class="table__row">
        <div class="table__row__name">Пароль</div>
        <div class="table__row__cell">{{ workPlace.password }}</div>
      </div>
      <div class="table__row">
        <div class="table__row__name">AO</div>
        <div class="table__row__cell">{{ workPlace.AO }}</div>
      </div>
      <div class="table__row">
        <div class="table__row__name">Формы ЭТД</div>
        <div class="table__row__cell">{{ workPlace.ATDForms }}</div>
      </div>
      <div class="table__row direction-row">
        <div class="table__row__name">Описание</div>
        <div class="table__row__cell">{{ workPlace.description }}</div>
      </div>
      <div class="table__row direction-row">
        <div class="table__row__column-name">Перечень сообщений, передаваемых в АСОУП</div>
        <div class="table__row__cell">{{ workPlace.ASOUPMessage }}</div>
      </div>
    </div>
    <div v-else class="table">
      <InputField
        class="table__row"
        v-model="workPlace.name"
        :name="placeholder.name"
        :placeholder="placeholder.name"
        :error="workPlaceError.name"
      />
      <InputField
        class="table__row"
        v-model="workPlace.position"
        :name="placeholder.position"
        :placeholder="placeholder.position"
        :error="workPlaceError.position"
      />
      <InputField
        class="table__row"
        v-model="workPlace.telephone"
        :name="placeholder.telephone"
        :placeholder="placeholder.telephone"
        :error="workPlaceError.telephone"
      />
      <InputField
        class="table__row"
        v-model="workPlace.IPAddress"
        :name="placeholder.IPAddress"
        :placeholder="placeholder.IPAddress"
        :error="workPlaceError.IPAddress"
      />
      <InputField
        class="table__row"
        v-model="workPlace.password"
        :name="placeholder.password"
        :placeholder="placeholder.password"
        :error="workPlaceError.password"
      />
      <InputField
        class="table__row"
        v-model="workPlace.AO"
        :name="placeholder.AO"
        :placeholder="placeholder.AO"
        :error="workPlaceError.AO"
      />
      <InputField
        class="table__row"
        v-model="workPlace.ATDForms"
        :name="placeholder.ATDForms"
        :placeholder="placeholder.ATDForms"
        :error="workPlaceError.ATDForms"
      />
      <div class="table__row direction-row">
        <div class="table__row__column-name">Описание</div>
        <div class="table__row__cell">
        <textarea
          v-model="workPlace.description"
          :placeholder="placeholder.description"
          class="table__row__cell__field"
        ></textarea>
        </div>
      </div>
      <div class="table__row direction-row">
        <div class="table__row__column-name">Перечень сообщений, передаваемых в АСОУП</div>
        <div class="table__row__cell">
          <textarea
            v-model="workPlace.ASOUPMessage"
            :placeholder="placeholder.ASOUPMessage"
            class="table__row__cell__field"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="menu">
      <Button v-if="!isPresent" class="menu__button" :text="saveButtonText" @click="editHandler(true)"/>
      <Button class="menu__button" :text="declineButtonText" @click="editHandler(false)"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WorkPlaceEditor',
    components: {
      InputField: () => import('@/components/InputField.vue'),
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
        workPlaceError: {
          name: null,
          position: null,
          telephone: null,
          IPAddress: null,
          password: null,
          AO: null,
          ATDForms: null,
          description: null,
          ASOUPMessage: null,
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
          ASOUPMessage: 'Сообщения передаваемые в АСОУП',
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
        console.log(this.workPlace);
        console.log(isUpdate);
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
    font-size: base-unit(20)

    .table
      display: flex
      flex-direction: column
      align-items: center
      padding: base-unit(20) base-unit(10) base-unit(20)

      &__row
        display: flex
        width: 100%
        padding-bottom: base-unit(10)

        &__name
          text-align: end
          width: base-unit(200)
          margin-right: base-unit(40)

        &__column-name
          text-align: center
          width: 100%
          padding-bottom: base-unit(10)

        &__cell
          display: flex
          align-items: center
          justify-content: center

          &__field
            color: $pickled-bluewood-color
            padding-left: base-unit(10)
            width: 100%
            border: 2px solid $blossom-color
            font-size: base-unit(24)
            border-radius: 10px
            background-color: $soft-peach-color
            max-width: base-unit(1151)
            height: base-unit(60)
            resize: vertical

            &:focus
              background-color: initial

            &:focus
              background-color: initial

    .direction-row
      flex-direction: column

    .menu
      border-top: 2px solid $dust-storm-color
      display: flex
      justify-content: flex-end
      padding: base-unit(20) 0
      margin: 0 base-unit(20)

      &__button
        align-self: flex-end
        font-size: base-unit(24)
        width: base-unit(260)
        height: base-unit(50)
        margin-left: base-unit(20)
</style>
