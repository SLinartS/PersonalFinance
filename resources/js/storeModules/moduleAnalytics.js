import axios from "axios";
const moduleAnalytics = {
    state() {
        return {
            currentBalance: {
                income: 0,
                expenses: 0,
            },
            currentDebtAndBalance: {
                account: 0,
                debt: 0,
                saving: 0,
            },
        };
    },
    mutations: {
        setCurrentBalance(state, { income, expenses }) {
            state.currentBalance["income"] = income;
            state.currentBalance["expenses"] = expenses;
        },
        setCurrentDebtAndBalance(state, { account, debt, saving }) {
            state.currentBalance["account"] = account;
            state.currentBalance["debt"] = debt;
            state.currentBalance["saving"] = saving;
        },
    },
    getters: {
        getCurrentBalance(state) {
            return state.currentBalance;
        },
        getCurrentDebtAndBalance(state) {
            return state.currentBalance;
        },
    },
    actions: {
        async loadCurrentBalanceByUserId(
            { commit, getters, dispatch },
            dateRange
        ) {
            dateRange["userId"] = getters.getAuthStatus.userId;

            await dispatch("globalValidate", {
                title: "notValidateCode",
                description: "notValidateCode",
                amount: "notValidateCode",
                time: dateRange["rangeStart"],
                timeTwo: dateRange["rangeEnd"],
                selected: "notValidateCode",
                img: "notValidateCode",
            });

            if (getters.getErrorStatus === 0) {
                let variable;
                await fetch("/api/loadCurrentBalanceByUserId/", {
                    method: "POST",
                    body: JSON.stringify(dateRange),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
                    .then(
                        async (response) => (variable = await response.json())
                    )
                    .catch((error) => console.log(error));

                if (variable !== 0) {
                    commit("setCurrentBalance", {
                        income: variable["income"],
                        expenses: variable["expenses"],
                    });
                } else {
                    commit("setCurrentBalance", {
                        income: 0,
                        expenses: 0,
                    });
                }
            }
        },
        async loadDebtAndBalanceByUserId({ commit, getters }) {
            let variable;
            await fetch(
                "/api/loadDebtAndBalanceByUserId/" +
                    getters.getAuthStatus.userId
            )
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));

            commit("setCurrentDebtAndBalance", {
                account: variable["account"],
                debt: variable["debt"],
                saving: variable["saving"],
            });
        },
    },
};

export default moduleAnalytics;
