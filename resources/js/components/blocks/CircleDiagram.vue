<template>
    <div>
        <Bar v-if="loaded"
            :chart-options="chartOptions"
            :chart-data="chartData"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
        ></Bar>
    </div>
</template>

<script>
import { defineComponent, h, PropType } from "vue";

import { Doughnut } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    Plugin,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
    components: {
        Doughnut
    },
    data() {
        return {
            loaded: false,
        };
    },
    props: {
        chartId: {
            type: String,
            default: "doughnut-chart",
        },
        width: {
            type: Number,
            default: 500,
        },
        height: {
            type: Number,
            default: 500,
        },
        cssClasses: {
            default: "",
            type: String,
        },
        styles: {
            type: Object,
            default: () => {},
        },
        plugins: {
            type: Array,
            default: () => [],
        },
        labels: {
            type: Array,
            default: () => [],
        },
        colorsChart: {
            type: Array,
            default: () => [],
        },
        dataChart: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        chartData() {
            return;
        },
    },
    setup(props) {
        const chartData = {
            labels: props.labels,
            datasets: [
                {
                    backgroundColor: props.colorsChart,
                    data: props.dataChart,
                },
            ],
        };

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                    labels: {
                        font: {
                            size: 20,
                        },
                    },
                },
            },
        };

        return () =>
            h(Doughnut, {
                chartData,
                chartOptions,
                chartId: props.chartId,
                width: props.width,
                height: props.height,
                cssClasses: props.cssClasses,
                styles: props.styles,
                plugins: props.plugins,
            });
    },
};
</script>

<style></style>
