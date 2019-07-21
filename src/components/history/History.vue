<template>
  <div class="container-fluid page-content">
    <div class="row boxes-wrapper" v-if="stats">
      <div class="col-md-3 col-sm-6 box-transparent-wrapper">
        <box-transparent title="MIN TEMPERATURE">
          <temperature :value="stats.temperature.min" icon="thermometer-empty"/>
        </box-transparent>
      </div>
      <div class="col-md-3 col-sm-6 box-transparent-wrapper">
        <box-transparent title="AVG TEMPERATURE">
          <temperature :value="stats.temperature.avg" icon="thermometer-half"/>
        </box-transparent>
      </div>
      <div class="col-md-3 col-sm-6 box-transparent-wrapper">
        <box-transparent title="MAX TEMPERATURE">
          <temperature :value="stats.temperature.max" icon="thermometer-full"/>
        </box-transparent>
      </div>
      <div class="col-md-3 col-sm-6 box-transparent-wrapper">
        <box-transparent title="THE MOST POPULAR CITY">
          <font-awesome-icon icon="map-marker-alt" />
          {{stats.mostSearchedCity}}
        </box-transparent>
      </div>
    </div>

    <div class="row">
      <div class="col-md-9 col-sm-12">
        <weather-list :point="point"></weather-list>
      </div>
      <div class="col-md-3 col-sm-12">
        <weather-display :point="point" :save="false" :geolocalization="true"></weather-display>

        <box-white title="TOTAL SEARCHES COUNT" v-if="stats">
          <font-awesome-icon icon="search-location" />
          {{stats.totalSearchesCount}}
        </box-white>
          
      </div>
    </div>
  </div>
</template>

<script>

import WeatherList from '../weather/List'
import { mapActions, mapGetters } from 'vuex'
import WeatherDisplay from '../weather/WeatherDisplay'
import BoxTransparent from '../boxes/BoxTransparent'
import BoxWhite from '../boxes/BoxWhite'
import Temperature from '../weather/modules/Temperature'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkerAlt, faSearchLocation } from '@fortawesome/free-solid-svg-icons'

library.add(faMapMarkerAlt, faSearchLocation)

export default {
  data() {
    return {
      point: null,    
    };
  },
  computed: mapGetters({
    error: 'weather/show/error',
    isLoading: 'weather/show/isLoading',
    data: 'weather/show/retrieved',
    item: 'weather/show/getData',
    stats: 'weather/show/getStats',
  }),
  methods: {
    loadStats: function() {
      this.reset()
      var result = this.getStats()
    },
    ...mapActions({
      reset: 'weather/show/reset',
      retrieve: 'weather/show/retrieve',
      getData: 'weather/show/getData',
      getStats: 'weather/show/getStats',
    }),
    geolocation() {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError)
    },
    buildUrl(position) {
      this.point = {lat: position.coords.latitude, lng: position.coords.longitude}
    },
    geoError(error) {
    }
  },
  filters: {
    temperatureFormat: function (value) {
      if (!value) return ''
      return value.toFixed(2) + ' °C' 
    },
  },
  components: {
    WeatherList,
    WeatherDisplay,
    BoxTransparent,
    BoxWhite,
    Temperature
  },
  mounted () {
    this.geolocation()
    this.loadStats()
  }
}
</script>

<style>
  .page-content {
    padding-top: 20px;
  }
  .loading-wrapper {
    text-align: center;
  }
  .loading-wrapper small {
    font-size: 1rem;
    color: #aaa;
  }

  @media (max-width: 576px) {
    .box-transparent-wrapper {
      text-align: center;
    } 
    .boxes-wrapper {
      padding-top: 40px;
    }
  }
  

</style>
