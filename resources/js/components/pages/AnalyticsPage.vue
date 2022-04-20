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
                            class="change__block-input change__block-input--datetime"
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
                            class="change__block-input change__block-input--datetime"
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
                    {{ currentAccount }} ₽
                </p>
                <h3 class="analytics__main-bar__title">Тек. долги:</h3>
                <p class="analytics__main-bar__amount-result result">
                    {{ currentDebt }} ₽
                </p>
                <h3 class="analytics__main-bar__title">Тек. накопления:</h3>
                <p class="analytics__main-bar__amount-result result">
                    {{ currentSaving }} ₽
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
            :updateSearchTrigger="updateSearchTrigger"
        ></CurrentBalance>
        <div class="analytics__all-blocks">
            <div id="analytics__circle-diagram">
                <CircleDiagram></CircleDiagram>
            </div>
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
            updateSearchTrigger: 1,
        };
    },
    computed: {
        getCurrentDebtAndBalance() {
            return this.$store.getters.getCurrentDebtAndBalance;
        },
        currentAccount() {
            return this.getCurrentDebtAndBalance["account"];
        },
        currentDebt() {
            return this.getCurrentDebtAndBalance["debt"];
        },
        currentSaving() {
            return this.getCurrentDebtAndBalance["saving"];
        },
        timeError() {
            return this.$store.getters.getAllErrors["timeError"];
        },
        timeTwoError() {
            return this.$store.getters.getAllErrors["timeTwoError"];
        },
    },
    methods: {
        updateSearch() {
            this.rangeStart = this.$refs.operAddTimeStart.value;
            this.rangeEnd = this.$refs.operAddTimeEnd.value;
            this.updateSearchTrigger = !this.updateSearchTrigger;
        },
    },
    mounted() {
        new AirDatepicker("#timeAnalytics", {
            timepicker: true,
            minutesStep: 5,
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
    },
};
</script>

<style scoped></style>
