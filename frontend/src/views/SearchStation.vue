<template>
  <div class="wrapper">
    <div class="header">Глобальный поиск</div>
    <div class="search-bar">
      <div class="main-field">
        <input type="text">
      </div>
      <div class="options">
        <div class="option">
          <div class="name">Название станции</div>
          <input type="text">
        </div>
        <div class="option">
          <div class="name">Код станции</div>
          <input type="text">
        </div>
      </div>
    </div>
    <div class="result">
      Результат поиска
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchStation',
  };
</script>

<style lang="sass" scoped>
.wrapper
  .header
    display: flex
    font-size: base-unit(18)
  .search-bar
    .main-field
    .options
      display: flex
      .option
        .name
          font-size: base-unit(16)
</style>
