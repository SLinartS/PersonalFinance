
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
            await fetch("/api/getCategoriesByType/" + getters.getAuthStatus.userId + "/income")
                .then(async response => variable = await response.json())
                .catch((error) => console.log(error));
            dispatch("loadIncomeOperatonsByCat", variable);
            commit("setCategories", variable);
        },
        async loadExpensesCategoriesFromDB({ commit, getters, dispatch }) {
            let variable;
            await fetch("/api/getCategoriesByType/" + getters.getAuthStatus.userId + "/expenses")
                .then(async response => variable = await response.json())
                .catch((error) => console.log(error));
            dispatch("loadExpensesOperatonsByCat");
            commit("setCategories", variable);
        },
        async loadIncomeOperatonsByCat({ commit, getters }) {
            let variable;
            await fetch(
                "/api/getSumCategoryOperations/" + getters.getAuthStatus.userId + "/income")
                .then(async response => variable = await response.json())
                .catch((error) => console.log(error));
                console.log(variable)
            commit("setSumOperation", variable)
        },
        async loadExpensesOperatonsByCat({ commit, getters }) {
            let variable;
            await fetch("/api/getSumCategoryOperations/" + getters.getAuthStatus.userId + "/expenses")
                .then(async response => variable = await response.json())
                .catch((error) => console.log(error));
                console.log(variable)
            commit("setSumOperation", variable)
        },
    },
};

export default moduleCategory;
