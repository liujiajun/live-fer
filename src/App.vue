<template>
  <div id="app">
    <div>
      <div class="videoPanel">
        <VideoInput class="video" @onResult="onResult" @onLoaded="onLoaded"/>
      </div>
    </div>
    <div class="chart">
      <Chart :result="result" :options="chartOptions"/>
    </div>
    <web-cam>

    </web-cam>
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
        usePooling: true,
        result: null,
        chartOptions: {
          animation: false,
          maintainAspectRatio: false,
          responsive:true
        },
      }
    },
    methods: {
      onResult (value) {
        this.result = value;
      },
      onLoaded () {

      }
    }
  }
</script>

<style>
  .videoPanel {
    max-width: 400px;
    margin: 0 auto;
  }
  .chart {
    height: 200px;
    width: 300px;
    margin: 0 auto;
  }

</style>
