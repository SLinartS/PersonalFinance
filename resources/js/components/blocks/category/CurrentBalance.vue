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
                <p style="display: none">
                    {{ updateSearchTrigger }}
                </p>
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
            spaceValue: " ",
            incomeNumber: 0,
            expensesNumber: 0,
        };
    },
    props: {
        rangeStart: String,
        rangeEnd: String,
    },
    mounted() {
        this.getCurrentBalanceByUserId();
        this.loadOptions();
    },
    computed: {
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
        updateSearchTrigger() {
            if (this.AuthStatusStatus) {
                if (!this.rangeStart) {
                    this.$store.dispatch("loadCurrentBalanceByUserId", {
                        rangeStart: "1970-01-01 00:00:00",
                        rangeEnd: moment().format("YYYY-MM-DD HH:mm:ss"),
                    });
                } else {
                    this.$store.dispatch("loadCurrentBalanceByUserId", {
                        rangeStart: this.rangeStart + " 00:00:00",
                        rangeEnd: this.rangeEnd + " 23:59:59",
                    });
                }
                return this.$store.getters.readSearchTrigger;
            }
        },
        getCurrentBalance() {
            if (this.$store.getters.getCurrentBalance) {
                this.incomeNumber =
                    this.$store.getters.getCurrentBalance["income"];
                this.expensesNumber =
                    this.$store.getters.getCurrentBalance["expenses"];
                return this.$store.getters.getCurrentBalance;
            } else {
                this.incomeNumber = 0;
                this.expensesNumber = 0;
                return {
                    income: 0,
                    expenses: 0,
                };
            }
        },
        currentIncome() {
            if (this.getCurrentBalance["income"] === 0) {
                return "0";
            }
            let parts = this.getCurrentBalance["income"]
                .toFixed(2)
                .replaceAll(".", this.options["options"]["separatorValue"])
                .split(".");
            parts[0] = parts[0].replace(
                /\B(?=(\d{3})+(?!\d))/g,
                this.spaceValue
            );
            return parts.join(".");
        },
        currentExpenses() {
            if (this.getCurrentBalance["expenses"] === 0) {
                return "0";
            }
            let parts = this.getCurrentBalance["expenses"]
                .toFixed(2)
                .replaceAll(".", this.options["options"]["separatorValue"])
                .split(".");
            parts[0] = parts[0].replace(
                /\B(?=(\d{3})+(?!\d))/g,
                this.spaceValue
            );
            return parts.join(".");
        },
        currentResult() {
            const result = this.incomeNumber - this.expensesNumber;
            if (result < 0) {
                this.inColor = false;
                this.exColor = true;
            } else {
                this.inColor = true;
                this.exColor = false;
            }
            if (result === 0) {
                return "0";
            }
            let parts = result
                .toFixed(2)
                .replaceAll(".", this.options["options"]["separatorValue"])
                .split(".");
            parts[0] = parts[0].replace(
                /\B(?=(\d{3})+(?!\d))/g,
                this.spaceValue
            );
            return parts.join(".");
        },
        incomePersent() {
            if (this.incomeNumber && this.expensesNumber) {
                const sum = this.incomeNumber + this.expensesNumber;
                return Math.round((this.incomeNumber / sum) * 100);
            } else {
                return 50;
            }
        },
        expensesPersent() {
            if (this.incomeNumber && this.expensesNumber) {
                const sum = this.incomeNumber + this.expensesNumber;
                return Math.round((this.expensesNumber / sum) * 100);
            } else {
                return 50;
            }
        },
        AuthStatusStatus() {
            return this.$store.getters.getAuthStatusStatus;
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
};
</script>

<style></style>
