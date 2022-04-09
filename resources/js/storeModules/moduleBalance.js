const moduleBalance = {
    state() {
        return {
            accounts: [],
            debts: [],
            savings: [],
            changedDataBalance: [],
            operations: [],
        };
    },
    mutations: {
        setAccounts(state, value) {
            state.accounts = value;
        },
        setDebts(state, value) {
            state.debts = value;
        },
        setSavings(state, value) {
            state.savings = value;
        },
        setChangedDataBalance(state, value) {
            state.changedDataBalance = value;
        },
    },
    getters: {
        currentAccounts(state) {
            return state.accounts;
        },
        currentDebts(state) {
            return state.debts;
        },
        currentSavings(state) {
            return state.savings;
        },
        getChangedDataBalance(state) {
            return state.changedDataBalance;
        },
    },
    actions: {
        async loadBalanceData({ commit, getters, dispatch }, type) {
            let variable = 0;
            switch (type) {
                case "account":
                    await fetch(
                        "/api/getAccountsByUserId/" +
                            getters.getAuthStatus.userId
                    )
                        .then(
                            async (response) =>
                                (variable = await response.json())
                        )
                        .catch((error) => console.log(error));
                    if (variable !== 0) {
                        commit("setAccounts", variable);
                    } else {
                        commit("setAccounts", 0);
                    }
                    break;
                case "debt":
                    await fetch(
                        "/api/getDebtsByUserId/" + getters.getAuthStatus.userId
                    )
                        .then(
                            async (response) =>
                                (variable = await response.json())
                        )
                        .catch((error) => console.log(error));
                    if (variable !== 0) {
                        commit("setDebts", variable);
                    } else {
                        commit("setDebts", 0);
                    }
                    break;
                case "saving":
                    await fetch(
                        "/api/getSavingsByUserId/" +
                            getters.getAuthStatus.userId
                    )
                        .then(
                            async (response) =>
                                (variable = await response.json())
                        )
                        .catch((error) => console.log(error));
                    if (variable !== 0) {
                        commit("setSavings", variable);
                    } else {
                        commit("setSavings", 0);
                    }
                    break;
                default:
                    dispatch("loadBalanceData", "account");
                    dispatch("loadBalanceData", "debt");
                    dispatch("loadBalanceData", "saving");
                    break;
            }
        },

        async loadBalanceDataById({ commit }, { id, type }) {
            let variable;
            switch (type) {
                case "account":
                    await fetch("/api/getAccountById/" + id)
                        .then(
                            async (response) =>
                                (variable = await response.json())
                        )
                        .catch((error) => console.log(error));
                    break;
                case "debt":
                    await fetch("/api/getDebtById/" + id)
                        .then(
                            async (response) =>
                                (variable = await response.json())
                        )
                        .catch((error) => console.log(error));
                    break;
                case "saving":
                    await fetch("/api/getSavingById/" + id)
                        .then(
                            async (response) =>
                                (variable = await response.json())
                        )
                        .catch((error) => console.log(error));
                    break;
            }
            if (variable !== 0) {
                commit("setChangedDataBalance", variable);
            } else {
                commit("setChangedDataBalance", 0);
            }
        },

        async updateBalanceDataById({ commit }, { changedDataBalance, type }) {
            switch (type) {
                case "account":
                    await fetch("/api/updateAccountById", {
                        method: "POST",
                        body: JSON.stringify(changedDataBalance),
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    })
                        .then()
                        .catch((error) => console.log(error));
                    break;
                case "debt":
                    await fetch("/api/updateDebtById", {
                        method: "POST",
                        body: JSON.stringify(changedDataBalance),
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    })
                        .then()
                        .catch((error) => console.log(error));
                    break;
                case "saving":
                    await fetch("/api/updateSavingById", {
                        method: "POST",
                        body: JSON.stringify(changedDataBalance),
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    })
                        .then()
                        .catch((error) => console.log(error));
                    break;
            }
        },
        async deleteBalanceDataById({ commit }, { id, type }) {
            switch (type) {
                case "account":
                    await fetch("/api/deleteAccountById/" + id)
                        .then()
                        .catch((error) => console.log(error));
                    break;
                case "debt":
                    await fetch("/api/deleteDebtById/" + id)
                        .then()
                        .catch((error) => console.log(error));
                    break;
                case "saving":
                    await fetch("/api/deleteSavingById/" + id)
                        .then()
                        .catch((error) => console.log(error));
                    break;
            }
        },

        async clearBalanceDataByUserId({ getters }, type) {
            const userId = getters.getAuthStatus["userId"];
            switch (type) {
                case "account":
                    await fetch("/api/clearAccountsByUserId/" + userId)
                        .then()
                        .catch((error) => console.log(error));
                    break;
                case "debt":
                    await fetch("/api/clearDebtsByUserId/" + userId)
                        .then()
                        .catch((error) => console.log(error));
                    break;
                case "saving":
                    await fetch("/api/clearSavingsByUserId/" + userId)
                        .then()
                        .catch((error) => console.log(error));
                    break;
            }
        },

        async insertBalanceDataByType({ getters }, { changedDataBalance, type }) {
            changedDataBalance["userId"] = getters.getAuthStatus["userId"];
            switch (type) {
                case "account":
                    await fetch("/api/insertAccountByUserId/", {
                        method: "POST",
                        body: JSON.stringify(changedDataBalance),
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    })
                        .then()
                        .catch((error) => console.log(error));
                    break;
                case "debt":
                    await fetch("/api/insertDebtByUserId", {
                        method: "POST",
                        body: JSON.stringify(changedDataBalance),
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    })
                        .then()
                        .catch((error) => console.log(error));
                    break;
                case "saving":
                    await fetch("/api/insertSavingByUserId", {
                        method: "POST",
                        body: JSON.stringify(changedDataBalance),
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    })
                        .then()
                        .catch((error) => console.log(error));
                    break;
                default:
                    break;
            }
        },
    },
};

export default moduleBalance;
