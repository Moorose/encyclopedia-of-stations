<template>
  <div class="wrapper" v-if="station">
    <CollapsibleContent
      name="stationDescription"
      :collapsed="stationDescriptionCollapsed"
      @contentCollapsed="onContentCollapsed"
    >
      <template v-slot:header>
        Описание станци "{{ station.name }}"
      </template>
      <template v-slot:main>
        <StationDescription
          :station="station"
          @save="saveStation"
        />
      </template>
    </CollapsibleContent>
    <CollapsibleContent
      name="passingStations"
      :collapsed="passingStationsCollapsed"
      @contentCollapsed="onContentCollapsed"
    >
      <template v-slot:header>
        Станции попутного следования
      </template>
      <template v-slot:main>
        <PassingStations :stationId="station.id" :stations="station.stations" @save="saveStation"/>
      </template>
    </CollapsibleContent>
    <CollapsibleContent
      name="workPlaces"
      :collapsed="workPlacesCollapsed"
      @contentCollapsed="onContentCollapsed"
    >
      <template v-slot:header>
        Рабочие места
      </template>
      <template v-slot:main>
        <WorkPlaces :stationId="station.id"/>
      </template>
    </CollapsibleContent>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import CollapsibleContent from '@/components/CollapsibleContent';
  import StationDescription from '@/components/stationPath/StationDescription';
  import PassingStations from '@/components/stationPath/PassingStations';
  import WorkPlaces from '@/components/stationPath/WorkPlaces';

  export default {
    name: 'Station',
    components: {
      CollapsibleContent,
      StationDescription,
      PassingStations,
      WorkPlaces,
    },
    async created() {
      this.station = await this.getStationsById(this.$route.params.id);
    },
    data() {
      return {
        stationDescriptionCollapsed: false,
        passingStationsCollapsed: true,
        workPlacesCollapsed: true,
        station: null,
      };
    },
    methods: {
      ...mapActions('stations', ['getStationsById', 'updateStationData']),
      onContentCollapsed(name) {
        if (name === 'stationDescription') {
          this.stationDescriptionCollapsed = !this.stationDescriptionCollapsed;
        }
        if (name === 'passingStations') {
          this.passingStationsCollapsed = !this.passingStationsCollapsed;
        }
        if (name === 'workPlaces') {
          this.workPlacesCollapsed = !this.workPlacesCollapsed;
        }
      },
      async saveStation() {
        this.station = await this.getStationsById(this.station.id);
      },
    },
  };
</script>

<style lang="sass" scoped>
  .wrapper
    display: flex
    flex-direction: column
</style>
