const moduleBalance = {
    state() {
        return {
            accounts: [],
            debts: [],
            savings: [],
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
        }
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
        }
    },
    actions: {
        async loadAccountsFromDB({commit}) {
            let variable;
            await fetch("/api/account")
                .then(async response => variable = await response.json())
                .catch(error => alert(error))

            if (variable !== 0) {
                commit("setAccounts", variable)
            } else {
                commit("setAccounts", 0)
            }
        },
        async loadDebtsFromDB({commit}) {
            let variable;
            await fetch("/api/debt")
                .then(async response => variable = await response.json())
                .catch(error => alert(error))

            if (variable !== 0) {
                commit("setDebts", variable)
            } else {
                commit("setDebts", 0)
            }
        },
        async loadSavingFromDB({commit}) {
            let variable;
            await fetch("/api/saving")
                .then(async response => variable = await response.json())
                .catch(error => alert(error))

            if (variable !== 0) {
                commit("setSavings", variable)
            } else {
                commit("setSavings", 0)
            }
        }
    }
}

export default moduleBalance;
