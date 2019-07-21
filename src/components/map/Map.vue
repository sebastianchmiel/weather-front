<template>
  <div>
    <modal ref="modal"></modal>
    <div class="info-wrapper">
      <div class="row">
        <div class="col-3">
          <font-awesome-icon icon="hand-pointer" />
        </div>
        <div class="col-9">
          <b>Click on the map</b><br>
          <small>to see the current weather</small>
        </div>
      </div>
    </div>
    <GmapMap ref="mapRef" 
      :center="center" 
      :zoom="zoom"
      :options="{
        zoomControl: true,
        scaleControl: true,
        fullscreenControl: false,
      }"
      @click="mapClick"
      style="width: 100%; height: 500px"
    >
    </GmapMap>
  </div>
</template>

<script>

import Modal from './Modal';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'

library.add(faHandPointer)

export default {
  data() {
    return {
      zoom: 10,
      center: {
        lat: 50.306792,
        lng: 18.657176
      },
    };
  },
  methods: {
    mapClick: function (event) {
      this.$refs.modal.openModal({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    },
  },
  mounted () {
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({
        lat: 50.306792,
        lng: 18.657176
      })
    })
  },
  components: {
    Modal
  }
}
</script>

<style>
  .info-wrapper {
    display: block;
    position: absolute;
    z-index: 100;
    background-color: #fff;
    top: 30px;
    right: 30px;
    padding: 30px 50px;
    font-size: 18px;
    line-height: 1.2;
    -webkit-box-shadow: 0px 0px 29px 1px rgba(176,176,176,1);
    -moz-box-shadow: 0px 0px 29px 1px rgba(176,176,176,1);
    box-shadow: 0px 0px 29px 1px rgba(176,176,176,1);
    border-radius: 10px;
    opacity: .9;
  }
  .info-wrapper svg {
    margin-top: 5px;
    font-size: 32px;
  }
  .info-wrapper small {
    font-size: 12px;
    color: #777;
  }

  @media (max-width: 767px) {
    .info-wrapper {
      top: 50px;
      right: 10px;
      padding: 15px 30px;
      font-size: 18px;
    }
  }
</style>
