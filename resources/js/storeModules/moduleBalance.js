const moduleBalance = {
    state() {
        return {
            accounts: [],
            debts: [],
            savings: [],
            popupNav: false,
            popupAuth: false,
            popupReg: false,
        };
    },
    mutations: {
        async loadAccountsFromDB(state) {
            console.log("!!!")
            await fetch("/api/account")
                .then(async response => state.accounts = await response.json())
                .catch(error => alert(error))
        },
        async loadDebtsFromDB(state) {
            console.log("!!!")
            await fetch("/api/debt")
                .then(async response => state.debts = await response.json())
                .catch(error => alert(error))
        },
        async loadSavingFromDB(state) {
            console.log("!!!")
            await fetch("/api/saving")
                .then(async response => state.savings = await response.json())
                .catch(error => alert(error))
        },
        togglePopupNav(state, value) {
            state.popupNav = value
        },
        togglePopupAuth(state, value) {
            state.popupAuth = value
        },
        togglePopupReg(state, value) {
            state.popupReg = value
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
        },
        popupNav(state) {
            return state.popupNav
        },
        popupAuth(state) {
            return state.popupAuth
        },
        popupReg(state) {
            return state.popupReg
        },
    },
    actions: {
    }
}

export default moduleBalance;
