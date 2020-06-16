<template>
  <div class="wrapper">
    <div class="table">
      <div class="name">ID:</div>
      <div class="cell content">{{ station.id }}</div>
      <div class="name">Наименование:</div>
      <div class="cell">
        <div v-if="!editProcess" class="content">{{ station.name }}</div>
        <div v-else class="content">
          <input
            v-model.trim="editedStation.name"
            type="text"
            :placeholder="placeholder.name"
            class="field"
          >
        </div>
      </div>
      <div class="name">ЕСР:</div>
      <div class="cell">
        <div v-if="!editProcess" class="content">{{ station.UNM }}</div>
        <div v-else class="content">
          <input
            v-model.trim="editedStation.UNM"
            type="number"
            :placeholder="placeholder.UNM"
            class="field"
          >
        </div>
      </div>
      <div class="name">Классность:</div>
      <div class="cell">
        <div v-if="!editProcess" class="content">{{ getStationClassText(station.stationClass) }}</div>
        <div v-else class="content">
          <select v-model="editedStation.stationClass" class="field">
            <option disabled value="">{{placeholder.stationClass}}</option>
            <option
              v-for="[key, value] in Object.entries(StationClass)"
              :value="value"
              :key="key"
            >{{ getStationClassText(value) }}
            </option>
          </select>
        </div>
      </div>
      <div class="name description">Описание:</div>
      <div class="cell">
        <div v-if="!editProcess" class="content description">{{ station.description || 'отсутствует' }}</div>
        <div v-else class="content">
          <div
            ref="description"
            contentEditable="true"
            :placeholder="placeholder.description"
            class="field field-textarea description"
          ></div>
        </div>
      </div>
      <div class="name">{{placeholder.coordinates}}:</div>
      <div class="cell">
        <div class="coordinates">
          <div>Lat:</div>
          <div v-if="!editProcess" class="content-coordinates">{{station.coordinates.lat}}</div>
          <input
            v-else
            v-model.trim="editedStation.coordinates.lat"
            type="number"
            :placeholder="placeholder.coordinates"
            class="field field-coordinates"
          >
          <div>Lng:</div>
          <div v-if="!editProcess" class="content-coordinates">{{station.coordinates.lng}}</div>
          <input
            v-else
            v-model.trim="editedStation.coordinates.lng"
            type="number"
            :placeholder="placeholder.coordinates"
            class="field field-coordinates"
          >
        </div>
      </div>
    </div>
    <div class="menu">
      <Button v-if="!editProcess" class="button" text="Показать на карте" @click="goToMap"/>
      <Button v-if="isAllowed({ properRole }) && editProcess" class="button" text="Удалить"/>
      <Button v-if="isAllowed({ properRole })" class="button" :text="getButtonText" @click="editHandler"/>
      <Button v-if="editProcess" class="button" text="Отмена" @click="resetHandler"/>
    </div>
  </div>
</template>

<script>
  import { StationClass } from '@/modules/StationClass';
  import { mapActions, mapGetters } from 'vuex';
  import { UserRole } from '@/modules/UserRole';

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
      const {
        id, name, UNM, stationClass, description,
      } = this.station;
      const { lat, lng } = this.station.coordinates;

      return {
        properRole: UserRole.Editor,
        StationClass,
        buttonEditText: 'Редактировать',
        buttonSaveText: 'Сохранить',
        editProcess: false,
        editedStation: {
          id,
          name,
          UNM,
          stationClass,
          description,
          coordinates: {
            lat,
            lng,
          },
        },
        placeholder: {
          name: 'Наименование',
          UNM: 'ЕСР',
          stationClass: 'Классность',
          description: 'Описание',
          coordinates: 'Координаты',
        },
      };
    },
    methods: {
      ...mapActions('stations', ['updateStationData']),
      editHandler() {
        if (this.editProcess) {
          this.updateStationData(this.editedStation)
            .then(() => {
              this.$emit('save');
            })
            .catch(({ response }) => {
              // const { error, message, statusCode } = response.data;

              console.log(response);
            });
        }

        this.editProcess = !this.editProcess;
        if (this.editProcess) {
          this.$nextTick(() => {
            this.setDescription();
          });
        } else {
          this.getDescription();
        }
      },
      resetHandler() {
        this.editProcess = false;
        this.getDescription();

        const {
          id, name, UNM, stationClass, description,
        } = this.station;
        const { lat, lng } = this.station.coordinates;

        this.editedStation = {
          id,
          name,
          UNM,
          stationClass,
          description,
          coordinates: {
            lat,
            lng,
          },
        };
      },
      syncDescription() {
        const { description } = this.$refs;

        this.editedStation.description = description.innerText;
        if (description.scrollTop !== 0) {
          description.style.height = `${description.scrollHeight}px`;
        }
      },
      setDescription() {
        const { description } = this.$refs;

        description.innerText = this.station.description;
        description.addEventListener('input', this.syncDescription);
      },
      getDescription() {
        const { description } = this.$refs;

        description.removeEventListener('input', () => {
          if (description.scrollTop !== 0) {
            description.style.height = `${description.scrollHeight}px`;
          }
        });
      },
      goToMap() {
        this.$router.push({
          name: 'Map',
          query: {
            ...this.station.coordinates,
          },
        });
      },
    },
    computed: {
      ...mapGetters('user', ['isAllowed']),
      getButtonText() {
        return this.editProcess ? this.buttonSaveText : this.buttonEditText;
      },
      getStationClassText() {
        return (stationClass) => {
          switch (stationClass) {
          case 0:
            return 'Промежуточная станция';
          case 1:
            return 'Участковая станция';
          case 2:
            return 'Сортировочная станция';
          case 3:
            return 'Грузовая станция';
          case 4:
            return 'Пассажирская станция';
          default:
            return '';
          }
        };
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
      grid-template-rows: auto
      column-gap: base-unit(45)
      row-gap: base-unit(10)
      align-items: center
      margin-bottom: base-unit(20)
      font-size: base-unit(24)

      .name
        justify-self: end

      .cell
        justify-self: stretch

      .coordinates
        display: flex
        align-items: center

      .content
        display: flex
        align-items: flex-start

        &-coordinates
          margin: 0 base-unit(20)

          &:last-child
            margin-right: 0

      .description
        text-align: justify
        align-self: flex-start

      .field
        color: $pickled-bluewood-color
        padding-left: base-unit(10)
        width: 100%
        height: base-unit(40)
        border: 2px solid $blossom-color
        font-size: base-unit(24)
        border-radius: 10px
        background-color: $soft-peach-color

        &-coordinates
          margin: 0 base-unit(20)

          &:last-child
            margin-right: 0

        &-textarea
          min-height: base-unit(40)
          max-width: base-unit(1151)
          height: auto
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
      display: flex
      justify-content: flex-end

      .button
        align-self: flex-end
        font-size: base-unit(24)
        width: base-unit(260)
        height: base-unit(50)
        margin-left: base-unit(20)
</style>
