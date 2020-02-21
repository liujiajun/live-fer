<template>
  <div id="app">
    <div>
      <div class="videoPanel">
        <VideoInput class="video" @onResult="onResult"/>
      </div>

      <Chart class="chart" :result="result" :options="chartOptions"></Chart>
    </div>
  </div>
</template>

<script>

import VideoInput from "@/components/VideoInput";
import Chart from "@/components/Chart";
export default {
  name: 'app',
  components: {
    Chart,
    VideoInput
  },
  data() {
    return {
      result: null,
      chartOptions: {
        animation: false,
      }
    }
  },
  methods: {
    onResult (value) {
      this.result = value;
    }
  }
}
</script>

<style>
  .videoPanel {
    /*width: 100%;*/
    max-width: 400px;
    margin: 0 auto;
  }
  .chart {
    position: relative;
    top: 300px;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
</style>
