<template>
    <div
        class="current-balance__color-block"
        :style="{
            background: `linear-gradient(to right, var(--current-balance-green) ${incomePersent}%, var(--current-balance-reg) ${incomePersent}%)`,
        }"
    >
        <div class="current-balance">
            <div class="current-balance__elem current-balance__elem--income">
                <h3 class="current-balance__title">Поступления</h3>
                <p class="current-balance__amount income">
                    {{ currentIncome }}
                    {{ options["options"]["currencyValue"] }}
                </p>
            </div>
            <div class="current-balance__elem current-balance__elem--result">
                <h3 class="current-balance__title">Итог</h3>
                <p
                    :class="[
                        'current-balance__amount',
                        { 'current-balance__amount--result--income': inColor },
                        {
                            'current-balance__amount--result--expenses':
                                exColor,
                        },
                    ]"
                >
                    {{ currentResult }}
                    {{ options["options"]["currencyValue"] }}
                </p>
            </div>
            <div class="current-balance__elem current-balance__elem--expenses">
                <h3 class="current-balance__title">Расходы</h3>
                <p class="current-balance__amount expenses">
                    {{ currentExpenses }}
                    {{ options["options"]["currencyValue"] }}
                </p>
                <p style="display:none">{{updateSearchTrigger}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    data() {
        return {
            inColor: false,
            exColor: false,
        };
    },
    props: {
        rangeStart: String,
        rangeEnd: String,
    },
    // watch: {
    //     $route(to, from) {
    //         this.getCurrentBalanceByUserId();
    //     },
    // },
    computed: {
        updateSearchTrigger() {
            this.$store.dispatch("loadCurrentBalanceByUserId", {
                rangeStart: this.rangeStart + ":00",
                rangeEnd: this.rangeEnd + ":00",
            });
            return this.$store.getters.readSearchTrigger;
        },
        getCurrentBalance() {
            return this.$store.getters.getCurrentBalance;
        },
        currentIncome() {
            return this.getCurrentBalance["income"];
        },
        currentExpenses() {
            return this.getCurrentBalance["expenses"];
        },
        currentResult() {
            const result = this.currentIncome - this.currentExpenses;
            if (result < 0) {
                this.inColor = false;
                this.exColor = true;
            } else {
                this.inColor = true;
                this.exColor = false;
            }
            return result.toFixed(2);
        },
        incomePersent() {
            const sum = this.currentIncome + this.currentExpenses;
            return Math.round((this.currentIncome / sum) * 100);
        },
        expensesPersent() {
            const sum = this.currentIncome + this.currentExpenses;
            return Math.round((this.currentExpenses / sum) * 100);
        },
        AuthStatusStatus() {
            return this.$store.getters.getAuthStatusStatus;
        },
        options() {
            if (this.$store.getters.getOptionsList) {
                return this.$store.getters.getOptionsList;
            } else {
                return {
                    options: {
                        currencyValue: "",
                    },
                };
            }
        },
    },
    methods: {
        getCurrentBalanceByUserId() {
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadCurrentBalanceByUserId", {
                    rangeStart: "1970-01-01 00:00:00",
                    rangeEnd: moment().format("YYYY-MM-DD HH:mm:ss"),
                });
            }
        },
        loadOptions() {
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadOptionsByUserId");
            }
        },
    },
    mounted() {
        this.getCurrentBalanceByUserId();
        this.loadOptions();
    },
};
</script>

<style></style>
