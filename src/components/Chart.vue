<script>
    import { HorizontalBar } from 'vue-chartjs';

    export default {
        extends: HorizontalBar,
        props: ["result", "options"],
        mounted() {
            this.renderChart();
        },
        methods: {
            renderBarChart: function () {
                this.renderChart(this.data, this.options)
            }
        },
        computed: {
            data: function () {
                let emotionColor = {
                    "neutral": "#f87979",
                    "happy": "orange",
                    "surprised": "yellow",
                    "disgusted": "green",
                    "fearful": "indigo",
                    "angry": "blue",
                    "sad": "pruple"
                };

                let items = Object.keys(this.result).map((key) => {
                    return [key, this.result[key]];
                });
                items.sort(function(first, second) {
                    return second[1] - first[1];
                });

                let labels = items.map((item) => {return item[0]});
                let values = items.map((item) => {return item[1] * 100});
                let colors = items.map((item) => {return emotionColor[item[0]]});
                return {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Emotions',
                            backgroundColor: colors,
                            data: values
                        }
                    ]
                };
            }
        },
        watch: {
            result: function () {
                this.renderBarChart();
            }
        }
    };
</script>

<style scoped>

</style>
