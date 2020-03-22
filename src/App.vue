<template>
  <div id="app">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-card>
      <div class="videoPanel">
        <VideoInput class="video" @onResult="onResult"/>
      </div>
    </v-card>
    <div class="chart" v-show="!loading">
      <Chart :result="result" :options="chartOptions"/>
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
      VideoInput,
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
        loading: true,
        fullPage: true
      }
    },
    methods: {
      onResult (value) {
        this.loading = false;
        this.result = value;
      },
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

  .loading {
    width: 100%;
    margin: 0 auto;
  }

</style>
