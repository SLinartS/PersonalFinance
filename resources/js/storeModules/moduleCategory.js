
const moduleCategory = {
    state() {
        return {
            categories: [],
            sumOperation: {},
            changedDataCatogory: [],
            colorsList: [],
        };
    },
    mutations: {
        setCategories(state, value) {
            state.categories = value;
        },
        setSumOperation(state, value) {
            state.sumOperation = value;
        },
        setChangedDataCategory(state, value) {
            state.changedDataCatogory = value;
        },
        setColorsList(state, value) {
            state.colorsList = value;
        },
    },
    getters: {
        getCategories(state) {
            return state.categories;
        },
        getSumOperation(state) {
            return state.sumOperation;
        },
        getChangedDataCategory(state) {
            return state.changedDataCatogory;
        },
        getColorsList(state) {
            return state.colorsList;
        },
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
            commit("setSumOperation", variable)
        },
        async loadExpensesOperatonsByCat({ commit, getters }) {
            let variable;
            await fetch("/api/getSumCategoryOperations/" + getters.getAuthStatus.userId + "/expenses")
                .then(async response => variable = await response.json())
                .catch((error) => console.log(error));
            commit("setSumOperation", variable)
        },

        async loadCategoryById({ commit }, id) {
            let variable;
            await fetch("/api/getCategoryById/" + id)
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));
            if (variable !== 0) {
                commit("setChangedDataCategory", variable);
            } else {
                commit("setChangedDataCategory", 0);
            }
        },

        async loadColorsList({ commit }, id) {
            let variable;
            await fetch("/api/getColorsList/")
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));

            if (variable !== 0) {
                commit("setColorsList", variable);
            } else {
                commit("setColorsList", 0);
            }
        },

        async insertCategoryById({ getters }, newDataCategory ) {
            newDataCategory["userId"] = getters.getAuthStatus["userId"];
            await fetch("/api/insertCategoryByUserId/", {
                method: "POST",
                body: JSON.stringify(newDataCategory),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
                .then()
                .catch((error) => console.log(error));
        },

        async deleteCategoryById({ commit }, id) {
            let variable;
            await fetch("/api/deleteCategoryById/" + id)
                .then(async (response) => (variable = await response.text()))
                .catch((error) => console.log(error));
        },

    },
};

export default moduleCategory;
