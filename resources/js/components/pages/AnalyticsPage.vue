<template>
    <main class="analytics">
        <div class="analytics__main-bar">
            <div class="analytics__main-bar__calendar">
                <div class="change__block__time-block time-block--oper-an">
                    <div class="analytics-input-block">
                        <input
                            class="input-calendar"
                            id="timeAnalytics"
                            type="button"
                        />
                        <input
                            id="inputOperAddStart"
                            ref="operAddTimeStart"
                            type="datetime"
                            class="change__block-input change__block-input--date"
                        />
                        <img
                            :class="[
                                'search-error-img',
                                { hiddenOpacity: !timeError },
                            ]"
                            class="search-error-img"
                            :src="errorImg"
                            alt=""
                        />
                    </div>
                    <div class="analytics-input-block">
                        <img
                            class="icon-search"
                            :src="searchImg"
                            @click="updateSearch"
                            alt=""
                        />
                        <input
                            id="inputOperAddEnd"
                            ref="operAddTimeEnd"
                            type="datetime"
                            class="change__block-input change__block-input--date"
                        />
                        <img
                            :class="[
                                'search-error-img',
                                { hiddenOpacity: !timeTwoError },
                            ]"
                            class="search-error-img"
                            :src="errorImg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="analytics__main-bar__elem-result">
                <h3 class="analytics__main-bar__title">Тек. баланс:</h3>
                <p class="analytics__main-bar__amount-result result">
                    {{ currentAccount }}
                    {{ options["options"]["currencyValue"] }}
                </p>
                <h3 class="analytics__main-bar__title">Тек. долги:</h3>
                <p class="analytics__main-bar__amount-result result">
                    {{ currentDebt }} {{ options["options"]["currencyValue"] }}
                </p>
                <h3 class="analytics__main-bar__title">Тек. накопления:</h3>
                <p class="analytics__main-bar__amount-result result">
                    {{ currentSaving }}
                    {{ options["options"]["currencyValue"] }}
                </p>
            </div>
            <div class="analytics__main-bar__additional-information">
                <div class="analytics__main-bar__elem-middle-day">
                    <h3 class="analytics__main-bar__title"></h3>
                    <p
                        class="analytics__main-bar__amount analytics__setting-amount--middle-day expenses"
                    >
                        <!-- 16 417,72 ₽ -->
                    </p>
                </div>
                <div class="analytics__main-bar__elem-middle-week">
                    <h3 class="analytics__main-bar__title"></h3>
                    <p
                        class="analytics__main-bar__amount analytics__setting__amount--middle-week expenses"
                    >
                        <!-- 9 046,14 ₽ -->
                    </p>
                </div>
            </div>
        </div>
        <CurrentBalance
            :rangeStart="rangeStart"
            :rangeEnd="rangeEnd"
        ></CurrentBalance>
        <div class="analytics__all-blocks">
            <div id="analytics__circle-diagram">
                <CircleDiagram
                    :key="keyForDiagram"
                    :labels="labels"
                    :dataChart="dataChart"
                    :colorsChart="colorsChart"
                ></CircleDiagram>
                <div id="diagramSeparator"></div>
                <CircleDiagram
                    :key="keyForDiagramExp"
                    :labels="labelsExp"
                    :dataChart="dataChartExp"
                    :colorsChart="colorsChartExp"
                ></CircleDiagram>
            </div>
            <p style="display: none">{{ diargamData }}</p>
        </div>
    </main>
</template>

<script>
import moment from "moment";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

import searchImg from "../../../../public/assets/files/images/magnifying-glass.svg";
import errorImg from "../../../../public/assets/files/images/circle-exclamation.svg";

import CurrentBalance from "../blocks/category/CurrentBalance.vue";
import CircleDiagram from "../blocks/circleDiagram.vue";
export default {
    name: "AnalyticsPage",
    components: { CurrentBalance, CircleDiagram },
    data() {
        return {
            searchImg: searchImg,
            errorImg: errorImg,
            time: "",
            rangeStart: "",
            rangeEnd: "",
            spaceValue: " ",
            labels: [],
            dataChart: [],
            colorsChart: [],
            labelsExp: [],
            dataChartExp: [],
            colorsChartExp: [],
            keyForDiagram: 1,
            keyForDiagramExp: 1,
        };
    },
    computed: {
        getCurrentDebtAndBalance() {
            return this.$store.getters.getCurrentDebtAndBalance;
        },
        diargamData() {
            const categories = this.$store.getters.getCategoriesInc;
            const sumCategories = this.$store.getters.getSumOperationInc;

            let labels = [];
            let dataChart = [];
            let colorsChart = [];
            if (sumCategories) {
                for (const [key, value] of Object.entries(sumCategories)) {
                    labels.push(key);
                    dataChart.push(value);
                    categories.forEach((el) => {
                        if (el["title"] === key) {
                            colorsChart.push(el["color"]);
                        }
                    });
                }
            }
            if (this.labels.length === 0) {
                this.labels = labels;
                this.dataChart = dataChart;
                this.colorsChart = colorsChart;
                this.keyForDiagram += 1;
            }

            const categoriesExp = this.$store.getters.getCategoriesExp;
            const sumCategoriesExp = this.$store.getters.getSumOperationExp;

            let labelsExp = [];
            let dataChartExp = [];
            let colorsChartExp = [];
            if (sumCategories) {
                for (const [key, value] of Object.entries(sumCategoriesExp)) {
                    labelsExp.push(key);
                    dataChartExp.push(value);
                    categoriesExp.forEach((el) => {
                        if (el["title"] === key) {
                            colorsChartExp.push(el["color"]);
                        }
                    });
                }
            }
            if (this.labelsExp.length === 0) {
                this.labelsExp = labelsExp;
                this.dataChartExp = dataChartExp;
                this.colorsChartExp = colorsChartExp;
                this.keyForDiagramExp += 1;
            }

            return this.$store.getters.getSumOperation;
        },
        currentAccount() {
            if (this.getCurrentDebtAndBalance["account"]) {
                let parts = this.getCurrentDebtAndBalance["account"]
                    .toFixed(2)
                    .replaceAll(".", this.options["options"]["separatorValue"])
                    .split(".");
                parts[0] = parts[0].replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    this.spaceValue
                );
                return parts.join(".");
            } else {
                return 0;
            }
        },
        currentDebt() {
            if (this.getCurrentDebtAndBalance["debt"]) {
                let parts = this.getCurrentDebtAndBalance["debt"]
                    .toFixed(2)
                    .replaceAll(".", this.options["options"]["separatorValue"])
                    .split(".");
                parts[0] = parts[0].replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    this.spaceValue
                );
                return parts.join(".");
            } else {
                return 0;
            }
        },
        currentSaving() {
            if (this.getCurrentDebtAndBalance["debt"]) {
                let parts = this.getCurrentDebtAndBalance["saving"]
                    .toFixed(2)
                    .replaceAll(".", this.options["options"]["separatorValue"])
                    .split(".");
                parts[0] = parts[0].replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    this.spaceValue
                );
                return parts.join(".");
            } else {
                return 0;
            }
        },
        timeError() {
            return this.$store.getters.getAllErrors["timeError"];
        },
        timeTwoError() {
            return this.$store.getters.getAllErrors["timeTwoError"];
        },
        AuthStatusStatus() {
            return this.$store.getters.getAuthStatusStatus;
        },
        options() {
            if (this.$store.getters.getOptionsList) {
                switch (
                    this.$store.getters.getOptionsList["options"]["spaceValue"]
                ) {
                    case "Нет":
                        this.spaceValue = "";
                        break;
                    case "Пробел":
                        this.spaceValue = " ";
                        break;
                    case "Слэш":
                        this.spaceValue = "/";
                        break;
                }
                return this.$store.getters.getOptionsList;
            } else {
                return {
                    options: {
                        currencyValue: "₽",
                        separatorValue: "",
                        spaceValue: "",
                    },
                };
            }
        },
    },
    methods: {
        updateSearch() {
            this.rangeStart = this.$refs.operAddTimeStart.value;
            this.rangeEnd = this.$refs.operAddTimeEnd.value;
            this.$store.commit("toggleSearchTrigger");
        },
        loadOptions() {
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadOptionsByUserId");
            }
        },
    },
    mounted() {
        new AirDatepicker("#timeAnalytics", {
            autoClose: true,
            range: true,
            dateFormat: "yyyy-MM-dd",
            onSelect({ date, formattedDate, datepicker }) {
                if (formattedDate[0]) {
                    document.querySelector("#inputOperAddStart").value =
                        formattedDate[0];
                } else {
                    document.querySelector("#inputOperAddStart").value = "";
                }

                if (formattedDate[1]) {
                    document.querySelector("#inputOperAddEnd").value =
                        formattedDate[1];
                } else {
                    document.querySelector("#inputOperAddEnd").value = "";
                }
            },
        });
        this.$store.dispatch("loadDebtAndBalanceByUserId");
        this.$store.dispatch("loadExpensesCategoriesFromDB");
        this.$store.dispatch("loadIncomeCategoriesFromDB");
        this.loadOptions();
    },
};
</script>

<style scoped></style>
