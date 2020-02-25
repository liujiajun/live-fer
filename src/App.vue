<template>
  <div id="app">
    <div>
      <div class="videoPanel">
        <VideoInput class="video" @onResult="onResult"/>
      </div>
      <div class="display">
        <Chart class="chart" :result="result" :options="chartOptions"></Chart>
        <div class="">
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
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
      // eslint-disable-next-line vue/no-unused-components
      Chart,
      VideoInput
    },
    data() {
      return {
        usePooling: true,
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
  .display {
    position: relative;
    top: 350px;
    margin: 0 auto;
  }
  /*.switch {*/
  /*  position: relative;*/
  /*  margin: 0 auto;*/
  /*}*/
  .chart {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

</style>
