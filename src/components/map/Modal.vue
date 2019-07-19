<template>
  <b-modal id="weatherInfo" title="Weather info" :hide-footer="true">
    <weather-display :point="point" :save="true"></weather-display>
  </b-modal>
</template>

<script>
import WeatherDisplay from './../weather/WeatherDisplay'
export default {
  data() {
    return {
      point: null,      
    };
  },
  methods: {
    openModal: function(point) {
      this.$bvModal.show('weatherInfo')
      this.point = point
    }
  },
  components: {
    WeatherDisplay
  }
}
</script>