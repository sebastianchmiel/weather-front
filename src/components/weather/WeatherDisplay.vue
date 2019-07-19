<template>
  <div class="wrapper">
    <p class="loading-wrapper" v-if="isLoading">
      <b-spinner style="width: 4rem; height: 4rem; margin:2rem;" label="Large Spinner"></b-spinner><br>
      <small>we receive data, wait a moment!</small>
    </p>

    <div
      v-if="error"
      class="alert alert-danger"
      role="alert">
      <span
        class="fa fa-exclamation-triangle"
        aria-hidden="true" /> {{ error }}
    </div>

    <div v-if="item" class="weather">
      <div class="city">{{item.city}}</div>
      <div class="desc">{{item.description}}</div>
      <img :src="item.icon" :alt="item.description">
      <div class="temperature">
        <temperature :value="item.temperature" icon="thermometer-half"/>
      </div>
      <div class="row">
        <div class="col-6">
          <wind :value="item.windSpeed" :deg="item.windDeg"/><br>
          <span class="text-muted">wind</span>
        </div>
        <div class="col-6">
          <clouds :value="item.clouds"/><br>
          <span class="text-muted">clouds</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Temperature from './modules/Temperature'
import Clouds from './modules/Clouds'
import Wind from './modules/Wind'

export default {
  props: ['point', 'save'],
  watch: { 
    point: function(newVal, oldVal) {
      if (newVal) {
        this.showData()
      }
    }
  },
  computed: mapGetters({
    error: 'weather/getData/error',
    isLoading: 'weather/getData/isLoading',
    item: 'weather/getData/getData',
  }),
  methods: {
    showData: function() {
      if (this.point) {
        this.reset()
        var result = this.getData({point: this.point, save: this.save})
      }
    },
    ...mapActions({
      reset: 'weather/getData/reset',
      getData: 'weather/getData/getData'
    }),
  },
  mounted () {
    this.showData()
  },
  components: {
    Temperature,
    Clouds,
    Wind
  }
}
</script>

<style>
  .wrapper {
    background-color: #fff;
    padding: 20px;
  }
  .loading-wrapper {
    text-align: center;
  }
  .loading-wrapper small {
    font-size: 1rem;
    color: #aaa;
  }

  .weather {
    text-align: center;
    line-height: 1;
  }
  .city {
    font-weight: bold;
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .desc {
    color: #999;
    margin-bottom: 0;
  }
  .temperature {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .text-muted {
    font-size: 12px;
  }
</style>