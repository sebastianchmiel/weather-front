<template>
  <div class="block-white mb-4">
    <div v-if="isLoading">
      <b-spinner style="width: 4rem; height: 4rem; margin:2rem;" label="Large Spinner"></b-spinner>
    </div>
    <div
      v-if="error"
      class="alert alert-danger">{{ error }}</div>

    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>City</th>
            <th>Temperature</th>
            <th>Clouds</th>
            <th>Wind</th>
            <th>Description</th>
            <th v-if="point">Distance</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item['@id']">
            <td>
              {{ item['createDatetime']|dateFormat }}
            </td>
            <td>
              <b>{{ item['city'] }}</b><br>
              <small>{{ item['lat']}} {{item['lng']}}</small>
            </td>
            <td>
              <temperature :value="item['temperature']" icon="thermometer-half"/>
            </td>
            <td>
              <clouds :value="item['clouds']"/>
            </td>
            <td>
              <wind :value="item['windSpeed']" :deg="item['windDeg']"/>
            </td>
            <td>
              {{ item['description'] }}
            </td>
            <td v-if="point">
              {{ calcDistance(item)|distanceFormat }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <span v-if="view">
      <button
        :disabled="!view['hydra:previous']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:first'])">First</button>
      &nbsp;
      <button
        :disabled="!view['hydra:previous']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:previous'])">Previous</button>
      &nbsp;
      <button
        :disabled="!view['hydra:next']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:next'])">Next</button>
      &nbsp;
      <button
        :disabled="!view['hydra:last']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:last'])">Last</button>
      &nbsp;
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Temperature from './modules/Temperature'
import Clouds from './modules/Clouds'
import Wind from './modules/Wind'

export default {
  props: ['point'],
  computed: mapGetters({
    error: 'weather/list/error',
    items: 'weather/list/items',
    isLoading: 'weather/list/isLoading',
    view: 'weather/list/view',
  }),

  created () {
    this.getPage()
  },
  methods: mapActions({
    getPage: 'weather/list/default',
    calcDistance(event, item) {
      return this.getDistanceFromLatLonInKm(this.point.lat, this.point.lng, item.lat, item.lng)
    },
    getDistanceFromLatLonInKm(event, lat1, lon1, lat2, lon2) {
      var R = 6371 // Radius of the earth in km
      var dLat = this.deg2rad(lat2-lat1)  // deg2rad below
      var dLon = this.deg2rad(lon2-lon1) 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)

      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) 
      var d = R * c // Distance in km
      return d
    },
    deg2rad(event, deg) {
      return deg * (Math.PI/180)
    }
  }),

  filters: {
    dateFormat: function (value) {
      if (!value) return ''
      let date = new Date(value)
      return date.toJSON().slice(0,16).replace('T', ' ')
    },
    distanceFormat: function (value) {
      return value.toFixed(2) + 'km'
    }
  },
  components: {
    Temperature,
    Clouds,
    Wind
  }
}
</script>

<style>
  .block-white {
    background-color: #fff;
    color: red;
    padding: 20px;
  }
  .table th, .table td {
    vertical-align: top;
    border-top: 1px solid #eee;
    font-size: 14px;
    line-height: 1.3;
  }
  .table thead th {
    border-bottom: 1px solid #eee;
    border-top: 0;
  }

  .table small {
    font-size: 9px;
    color: #ccc;
  }
</style>
