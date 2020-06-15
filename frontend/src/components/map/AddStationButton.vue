<template>
  <div class="create_popup_hidden">
    <Button
      id="popup-create-button"
      class="button"
      text="Создать станцию"
      @click="goToAddStationPage"
    />
  </div>
</template>

<script>
  export default {
    name: 'AddStationButton',
    components: {
      Button: () => import('@/components/Button.vue'),
    },
    props: {
      google: {
        type: Object,
        required: true,
      },
      map: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        createMod: false,
        coordinates: null,
        controlUI: null,
        controlText: null,
        centerControlDiv: null,
        infoWindow: null,
      };
    },
    mounted() {
      const { map, google } = this;

      this.centerControlDiv = document.createElement('div');
      this.CenterControl(this.centerControlDiv);
      this.centerControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.RIGHT_TOP].push(this.centerControlDiv);

      this.infoWindow = new google.maps.InfoWindow();
      map.addListener('click', this.createEventHandler);
    },
    methods: {
      CenterControl(controlDiv) {
        this.controlUI = document.createElement('div');

        this.controlUI.style.backgroundColor = '#fff';
        this.controlUI.style.border = '2px solid #fff';
        this.controlUI.style.borderRadius = '3px';
        this.controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        this.controlUI.style.cursor = 'pointer';
        this.controlUI.style.marginBottom = '22px';
        this.controlUI.style.textAlign = 'center';
        this.controlUI.style.marginRight = '20px';
        this.controlUI.style.marginTop = '20px';
        this.controlUI.title = 'Кликните для перехода в режим создания станций';
        controlDiv.appendChild(this.controlUI);

        this.controlText = document.createElement('div');

        this.controlText.style.color = 'rgb(25,25,25)';
        this.controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        this.controlText.style.fontSize = '16px';
        this.controlText.style.lineHeight = '38px';
        this.controlText.style.paddingLeft = '5px';
        this.controlText.style.paddingRight = '5px';
        this.controlText.textContent = 'Режим создания станций';
        this.controlUI.appendChild(this.controlText);

        this.controlUI.addEventListener('click', this.controlEventHandler);
      },
      controlEventHandler() {
        this.createMod = !this.createMod;
        if (this.createMod) {
          this.controlUI.style.backgroundColor = '#FBF7F7';
          this.controlUI.style.border = '2px solid #FBF7F7';
        } else {
          this.controlUI.style.backgroundColor = '#fff';
          this.controlUI.style.border = '2px solid #fff';
          this.infoWindow.close();
        }
      },
      createEventHandler(mapsMouseEvent) {
        if (!this.createMod) return;

        const { latLng } = mapsMouseEvent;

        this.infoWindow.close();
        this.infoWindow = new this.google.maps.InfoWindow({ position: latLng });
        this.coordinates = {
          lat: latLng.lat(),
          lng: latLng.lng(),
        };
        this.infoWindow.setContent(this.getContent());
        this.infoWindow.open(this.map);
      },
      goToAddStationPage() {
        this.$router.push({
          name: 'AddStation',
          query: { ...this.coordinates },
        });
      },
      getContent() {
        return `<div class="popup" id="popup-create">
            <div class="popup__create__header">Текущие координаты</div>
            <div class="popup__create__coordinates">lat: ${this.coordinates.lat}</div>
            <div class="popup__create__coordinates">lng: ${this.coordinates.lng}</div>
            <button
              onclick="document.getElementById('popup-create-button').click();"
              class="popup__create__button"
            >
              Создать
            </button>
          </div>`;
      },
    },
  };
</script>

<style lang="sass">
  .create_popup_hidden
    display: none

  .popup__create
    &__header
      font-size: base-unit(18)
      padding-bottom: base-unit(20)
    &__coordinates
      display: flex
      flex-direction: column
      align-items: flex-start
      font-size: base-unit(14)
      text-align: justify
    &__button
      margin-top: base-unit(20)
</style>
