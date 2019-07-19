<template>
  <span>
    <font-awesome-icon :icon="icon" :v-if="icon" />
    {{value|temperatureFormat}}
  </span>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThermometerEmpty, faThermometerHalf, faThermometerFull, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faThermometerEmpty, faThermometerHalf, faThermometerFull)

export default {
  props: ['value', 'icon'],
  filters: {
    temperatureFormat: function (value) {
      if (!value) return ''
      return value.toFixed(2) + '°C' 
    },
  },
}
</script>
