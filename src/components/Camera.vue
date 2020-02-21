<template>
  <div class="camera">
      <video @play="resizeCanvas" class="center" autoplay playsinline muted id="webcam" width="400px" height="400px"/>
<!--      <canvas id="overlay" width="100px" height="100px"/>-->
    <h1>Emotion</h1>
    <span :key="item[0]" v-for="item in sorted">
      {{item[0] +  " " + toPercent(item[1])}} <br>
    </span>
  </div>
</template>

<script>
  import {Webcam} from '../assets/webcam'
  import * as faceapi from "face-api.js";

  import * as tf from '@tensorflow/tfjs';
export default {
  name: 'Camera',
  data: () => {
    return {
      webcam: null,
      detections: [],
      sorted: [],
      timer: null
    }
  },
  methods: {
    loadCamera: async function () {
      this.webcam = new Webcam(document.getElementById('webcam'));
      await this.webcam.setup();
    },
    loadModels: async function () {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/model/face-detector/model.json');
      await faceapi.nets.faceExpressionNet.loadFromUri('/model/emotion-classifier/model.json');
    },
    resizeCanvas: function() {
      // eslint-disable-next-line no-console
      // console.log("resizing");
      // var w = document.getElementById('webcam').width;
      // var h = document.getElementById('webcam').height;
      // var cv = document.getElementById('overlay');
      // // cv.width = w;
      // // cv.height = h;
    },
    getScreenshot: function(videoEl, scale) {
    scale = scale || 1;

    const canvas = document.createElement("canvas");
    canvas.width = videoEl.clientWidth * scale;
    canvas.height = videoEl.clientHeight * scale;
    canvas.getContext('2d').drawImage(videoEl, 0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = canvas.toDataURL();
    return image;
    },
    toPercent: function(point){
      var str=Number(point*100).toFixed(2);
      str+="%";
      return str;
    }
  },
  async mounted() {
    // eslint-disable-next-line no-unused-vars
    const model = await tf.loadLayersModel("/model-original/model.json");
    await this.loadCamera();
    await this.loadModels();
    // setInterval(async () => {
    //   const currentFrame = this.getScreenshot(document.getElementById("webcam"));
    //   const detections = await faceapi.detectAllFaces(
    //           currentFrame,
    //           new faceapi.TinyFaceDetectorOptions()
    //   );
    //   if (detections) {
    //     const croppedFaces = await faceapi.extractFaces(currentFrame, detections);
    //     if (croppedFaces[0]) {
    //       const croppedFaceResized = tf.image.resizeBilinear(tf.browser.fromPixels(croppedFaces[0], 1),
    //                                                     [48, 48]
    //       ).reshape([1, 48, 48, 1]);
    //       this.res = model.predict(croppedFaceResized).reshape([7]);
    //     }
    //   }
    // }, 2000)
    this.timer = setInterval(async () => {
      const currentFrame = this.getScreenshot(document.getElementById("webcam"));
      const detections = await faceapi.detectSingleFace(
              currentFrame,
              new faceapi.TinyFaceDetectorOptions()
      ).withFaceExpressions();
      if (detections && detections.expressions) {
        // eslint-disable-next-line no-console
        this.detections = detections.expressions;
      }
    }, 100)
  },
  watch: {
    detections: function (newVal) {
      let items = Object.keys(newVal).map(function(key) {
        return [key, newVal[key]];
      });

      items.sort(function(first, second) {
        return second[1] - first[1];
      });

      this.sorted = items;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>
  #overlay {

  }
</style>
