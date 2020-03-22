<template>
    <div class="wrapper" ref="outer">
        <video id="video"
               autoplay
               muted
               playsinline
               width="100%"
               height="300"
               ref="videoPlayer"
        />
        <canvas id="overlay"/>
<!--        <span id="loading" :v-if="loading">Loading</span>-->
    </div>
</template>

<script>
    import * as faceapi from "face-api.js";
    import getFixedSizeArray from "@/utils/fixed-size-array";

    export default {
        name: "VideoInput",
        data() {
            return {
                loading: true,
                stream: null,
                videoEl: null,
                canvas: null,
                cachedResults: getFixedSizeArray(8)
            }
        },
        methods: {
            detect: async function () {
                if(this.videoEl.paused || this.videoEl.ended || !(faceapi.nets.tinyFaceDetector.params))
                    return setTimeout(() => this.detect());

                const options = new faceapi.TinyFaceDetectorOptions();
                const result = await faceapi.detectSingleFace(this.videoEl, options).withFaceExpressions();
                if (result) {
                    const dims = faceapi.matchDimensions(this.canvas, this.videoEl, true);
                    const resizedResult = faceapi.resizeResults(result, dims);
                    faceapi.draw.drawDetections(this.canvas, resizedResult);
                    this.cachedResults.push(result.expressions);
                    this.$emit("onResult", this.pooledResult);
                }

                setTimeout(() => this.detect());
            }
        },
        async mounted() {
            this.loading = true;
            this.stream = await navigator.mediaDevices.getUserMedia({ video: {} });
            this.videoEl = document.getElementById("video");
            this.videoEl.srcObject = this.stream;
            this.canvas = document.getElementById("overlay");

            this.$emit("onLoaded", this.$refs.videoPlayer.getBoundingClientRect().height);

            await faceapi.nets.tinyFaceDetector.loadFromUri('/model/face-detector/model.json');
            await faceapi.nets.faceExpressionNet.loadFromUri('/model/emotion-classifier/model.json');
            // eslint-disable-next-line no-console
            console.log("Finish loading");
            this.loading = false;
            //eslint-disable-next-line no-console
            this.detect();
        },
        computed: {
            pooledResult: function() {
                let initialValue = this.cachedResults[0];
                return this.cachedResults.reduce((total, current, index, array) => {
                    if (index === 0) return initialValue;

                    for (const emotion of Object.keys(total)) {
                        total[emotion] += current[emotion];
                    }

                    if (index === array.length-1) {
                        for (const emotion of Object.keys(total)) {
                            total[emotion] /= array.length;
                        }
                        return total;
                    } else {
                        return total
                    }
                }, initialValue);
            }
        }
    };
</script>
<style scoped>
    .wrapper {
        position: relative;
    }

    #overlay {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
    }

    #video {
    }

    #loading {
        width: 100%;
    }

</style>
