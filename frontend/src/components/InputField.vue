<template>
  <div class="input-field">
    <div v-if="name" class="input-field__name">{{name}}</div>
    <div class="input-field__place">
        <input
          v-bind:value="value"
          @input="inputHandler"
          @blur="blurHandler"
          :type="type"
          :placeholder="placeholder"
          class="input-field__place__input"
        >
      <div v-if="error" class="input-field__place__error">{{error}}</div>
      <div v-if="innerError" class="input-field__place__error">{{innerError}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputField',
    props: {
      value: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'text',
      },
      placeholder: {
        type: String,
        default: '',
      },
      error: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        innerError: null,
      };
    },
    methods: {
      blurHandler(event) {
        const { value } = event.target;

        if (!value) {
          this.innerError = `Поле "${this.name}" не может быть пустым!`;
        }
      },
      inputHandler(event) {
        this.innerError = null;
        this.$emit('input', event.target.value);
      },
    },
  };
</script>

<style lang="sass" scoped>
  .input-field
    display: flex
    font-size: base-unit(20)

    &__name
      text-align: end
      width: base-unit(200)
      margin-right: base-unit(20)

    &__place
      display: flex
      flex-direction: column
      width: 100%

      &__input
        color: $pickled-bluewood-color
        padding-left: base-unit(10)
        width: 100%
        height: base-unit(30)
        border: 2px solid $blossom-color
        font-size: base-unit(20)
        border-radius: 10px
        background-color: $soft-peach-color

      &__error
        color: $red-color
        font-size: base-unit(14)
        padding: base-unit(5) 0 0

</style>
