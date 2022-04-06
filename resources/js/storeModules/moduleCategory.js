
const moduleCategory = {
    state() {
        return {
            categories: [],
            sumOperation: {}
        };
    },
    mutations: {
        setCategories(state, value) {
            state.categories = value;
        },
        setSumOperation(state, value) {
            state.sumOperation = value;
        },
    },
    getters: {
        getCategories(state) {
            return state.categories;
        },
        getSumOperation(state) {
            return state.sumOperation;
        }
    },
    actions: {
        async loadIncomeCategoriesFromDB({ commit, getters, dispatch }) {
            let variable;
            await fetch("/api/reqCatsByType/" + getters.getAuthStatus.userId + "/income")
                .then(async (response) => (variable = await response.json()))
                .catch((error) => alert(error));
            dispatch("loadIncomeOperatonsByCat", variable);
            commit("setCategories", variable);
        },
        async loadExpensesCategoriesFromDB({ commit, getters, dispatch }) {
            let variable;
            await fetch("/api/reqCatsByType/" + getters.getAuthStatus.userId + "/expenses")
                .then(async (response) => (variable = await response.json()))
                .catch((error) => alert(error));
            dispatch("loadExpensesOperatonsByCat");
            commit("setCategories", variable);
        },
        async loadIncomeOperatonsByCat({ commit, getters }) {
            let operationByCat;
            await fetch(
                "/api/reqOperationsByCat/" + getters.getAuthStatus.userId + "/income")
                .then(async (response) => (operationByCat = await response.json()))
                .catch((error) => alert(error));
            commit("setSumOperation", operationByCat)
        },
        async loadExpensesOperatonsByCat({ commit, getters }) {
            let operationByCat;
            await fetch("/api/reqOperationsByCat/" + getters.getAuthStatus.userId + "/expenses")
                .then(async (response) => (operationByCat = await response.json()))
                .catch((error) => alert(error));
            commit("setSumOperation", operationByCat)
        },
    },
};

export default moduleCategory;
