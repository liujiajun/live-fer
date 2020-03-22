<template>
  <div id="app">
    <v-container fluid>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card
              class="mx-auto"
              max-width="400">
        <v-row dense>
          <v-col cols="12">
            <v-card max-height="300px">
              <div class="videoPanel">
                <VideoInput class="video" @onResult="onResult"/>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-card outlined v-show="!loading">
              <Chart :result="result" :options="chartOptions"/>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-slider
                    v-model="sensitivity"
                    min="0"
                    max="100"
                    label="Sensitivity"
            ></v-slider>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
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
        sensitivity: 50
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
