
const moduleBalance = {
    state() {
        return {
            accounts: [],
            debts: [],
            savings: [],
            changedData: []
        };
    },
    mutations: {
        setAccounts(state, value) {
            state.accounts = value
        },
        setDebts(state, value) {
            state.debts = value
        },
        setSavings(state, value) {
            state.savings = value
        },
        setChangedData(state, value) {
            state.changedData = value
        },
    },
    getters: {
        currentAccounts(state) {
            return state.accounts
        },
        currentDebts(state) {
            return state.debts
        },
        currentSavings(state) {
            return state.savings
        },
        getChangedData(state) {
            return state.changedData
        },
    },
    actions: {
        async loadBalanceDataFromDB({ commit, getters }, type) {
            let variable = 0;
            switch (type) {
                case "account":
                    await fetch("/api/getAccountsByUserId/" + (getters.getAuthStatus).userId)
                        .then(async response => variable = await response.json())
                        .catch(error => alert(error))
                    if (variable !== 0) {
                        commit("setAccounts", variable)
                    } else {
                        commit("setAccounts", 0)
                    }
                    break;
                case "debt":
                    await fetch("/api/getDebtsByUserId/" + (getters.getAuthStatus).userId)
                        .then(async response => variable = await response.json())
                        .catch(error => alert(error))
                    if (variable !== 0) {
                        commit("setDebts", variable)
                    } else {
                        commit("setDebts", 0)
                    }
                    break;
                case "saving":
                    await fetch("/api/getSavingsByUserId/" + (getters.getAuthStatus).userId)
                        .then(async response => variable = await response.json())
                        .catch(error => alert(error))
                    if (variable !== 0) {
                        commit("setSavings", variable)
                    } else {
                        commit("setSavings", 0)
                    }
                    break;
                default:
                    break;
            }
        },

        async loadBalanceDataFromDBById({ commit }, { id, type }) {
            let variable;
            switch (type) {
                case "account":
                    await fetch("/api/getAccountById/" + id)
                        .then(async response => variable = await response.json())
                        .catch(error => alert(error))
                    break;
                case "debt":
                    await fetch("/api/getDebtById/" + id)
                        .then(async response => variable = await response.json())
                        .catch(error => alert(error))
                    break;
                case "saving":
                    await fetch("/api/getSavingById/" + id)
                        .then(async response => variable = await response.json())
                        .catch(error => alert(error))
                    break;
                default:
                    break;
            }
            if (variable !== 0) {
                commit("setChangedData", variable)
            } else {
                commit("setChangedData", 0)
            }
        },

        async updateBalanceDataFromDBById({ commit, getters }, { changedData, type }) {
            switch (type) {
                case "account":
                    await fetch("/api/updateAccountById", {
                        method: 'POST',
                        body: JSON.stringify(changedData),
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then()
                        .catch(error => alert(error))
                case "debt":
                    await fetch("/api/updateDebtById", {
                        method: 'POST',
                        body: JSON.stringify(changedData),
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then()
                        .catch(error => alert(error))
                case "saving":
                    await fetch("/api/updateSavingById", {
                        method: 'POST',
                        body: JSON.stringify(changedData),
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then()
                        .catch(error => alert(error))
                default:
                    break;
            }
        },
        async deleteBalanceDataFromDBById({ commit, getters }, {id, type}) {
            switch (type) {
                case "account":
                    await fetch("/api/deleteAccountById/" + id)
                        .then()
                        .catch(error => alert(error))
                    break;
                case "debt":
                    await fetch("/api/deleteDebtById/" + id)
                        .then()
                        .catch(error => alert(error))
                    break;
                case "saving":
                    await fetch("/api/deleteSavingById/" + id)
                        .then()
                        .catch(error => alert(error))
                    break;
                default:
                    break;
            }
        },

    },

}


export default moduleBalance;
