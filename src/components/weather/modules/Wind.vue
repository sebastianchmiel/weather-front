<template>
  <span>
    <font-awesome-icon icon="long-arrow-alt-up" :style="{ transform: 'rotate(' + (deg - 90) + 'deg)' }" />
    {{value}}m/s 
  </span>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'

library.add(faLongArrowAltUp)

export default {
  props: ['value', 'deg'],
}
</script>

<style>
  span {
    white-space: nowrap;
  }
  </style>
