<template>
    <Bar
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

export default defineComponent({
    components: {
        Doughnut,
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
    },
    setup(props) {
        const chartData = {
            labels: ["Транспорт", "Продукты", "Животные"],
            datasets: [
                {
                    backgroundColor: [
                        "rgb(66, 133, 244)",
                        "rgb(240, 98, 146)",
                        "rgb(139, 204, 0)",
                    ],
                    data: [300, 3050, 700],
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
    compited: {
        chartData() {},
    },
});
</script>

<style></style>
