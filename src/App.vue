<template>
  <div id="app">
    <div>
      <div class="videoPanel">
        <VideoInput class="video" @onResult="onResult" @onLoaded="onLoaded"/>
      </div>
      <div :style="{'position': 'relative', 'margin': '0 auto', 'top': this.top}">
        <Chart class="chart" :result="result" :options="chartOptions"/>
      </div>
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
        usePooling: true,
        result: null,
        chartOptions: {
          animation: false,
        },
        top: '10px'
      }
    },
    methods: {
      onResult (value) {
        this.result = value;
      },
      onLoaded (height) {
        // eslint-disable-next-line no-console
        console.log(height);
        this.top = height + 100 +  'px';
      }
    }
  }
</script>

<style>
  .videoPanel {
    max-width: 400px;
    margin: 0 auto;
  }
  .display {
    position: relative;
    /*top: 350px;*/
    margin: 0 auto;
  }

  .chart {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

</style>
