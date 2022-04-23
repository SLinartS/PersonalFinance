const moduleCategory = {
    state() {
        return {
            categories: [],
            categoriesInc: [],
            categoriesExp: [],
            sumOperation: {},
            sumOperationInc: {},
            sumOperationExp: {},
            changedDataCategory: [],
            colorsList: [],
        };
    },
    mutations: {
        setCategories(state, value) {
            state.categories = value;
        },
        setCategoriesInc(state, value) {
            state.categoriesInc = value;
        },
        setCategoriesExp(state, value) {
            state.categoriesExp = value;
        },
        setSumOperation(state, value) {
            state.sumOperation = value;
        },
        setSumOperationExp(state, value) {
            state.sumOperationExp = value;
        },
        setSumOperationInc(state, value) {
            state.sumOperationInc = value;
        },
        setChangedDataCategory(state, value) {
            state.changedDataCategory = value;
        },
        setColorsList(state, value) {
            state.colorsList = value;
        },
    },
    getters: {
        getCategories(state) {
            return state.categories;
        },
        getCategoriesExp(state) {
            return state.categoriesExp;
        },
        getCategoriesInc(state) {
            return state.categoriesInc;
        },
        getSumOperation(state) {
            return state.sumOperation;
        },
        getSumOperationExp(state) {
            return state.sumOperationExp;
        },
        getSumOperationInc(state) {
            return state.sumOperationInc;
        },
        getChangedDataCategory(state) {
            return state.changedDataCategory;
        },
        getColorsList(state) {
            return state.colorsList;
        },
    },
    actions: {
        async loadIncomeCategoriesFromDB({ commit, getters, dispatch }) {
            let variable;
            await fetch(
                "/api/getCategoriesByType/" +
                    getters.getAuthStatus.userId +
                    "/income"
            )
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));
            dispatch("loadIncomeOperationsByCat", variable);
            commit("setCategories", variable);
            commit("setCategoriesInc", variable);
        },
        async loadExpensesCategoriesFromDB({ commit, getters, dispatch }) {
            let variable;
            await fetch(
                "/api/getCategoriesByType/" +
                    getters.getAuthStatus.userId +
                    "/expenses"
            )
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));
            dispatch("loadExpensesOperationsByCat");
            commit("setCategories", variable);
            commit("setCategoriesExp", variable);
        },
        async loadIncomeOperationsByCat({ commit, getters }) {
            let variable;
            await fetch(
                "/api/getSumCategoryOperations/" +
                    getters.getAuthStatus.userId +
                    "/income"
            )
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));
            commit("setSumOperation", variable);
            commit("setSumOperationInc", variable);
        },
        async loadExpensesOperationsByCat({ commit, getters }) {
            let variable;
            await fetch(
                "/api/getSumCategoryOperations/" +
                    getters.getAuthStatus.userId +
                    "/expenses"
            )
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));
            commit("setSumOperation", variable);
            commit("setSumOperationExp", variable);
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

        async insertCategoryById(
            { getters, commit, dispatch },
            newDataCategory
        ) {
            newDataCategory["userId"] = getters.getAuthStatus["userId"];
            await dispatch("globalValidate", {
                title: newDataCategory["title"],
                description: "notValidateCode",
                amount: "notValidateCode",
                time: "notValidateCode",
                timeTwo: "notValidateCode",
                selected: "notValidateCode",
                img: newDataCategory["img_url"],
            });
            if (getters.getErrorStatus === 0) {
                await fetch("/api/insertCategoryByUserId/", {
                    method: "POST",
                    body: JSON.stringify(newDataCategory),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
                    .then()
                    .catch((error) => console.log(error));

                switch (newDataCategory["type"]) {
                    case "income":
                        dispatch("loadIncomeCategoriesFromDB");
                        break;
                    case "expenses":
                        dispatch("loadExpensesCategoriesFromDB");
                        break;
                }

                commit("togglePopupCategoryChange", {
                    status: false,
                    typeAction: "",
                    typeBlock: "",
                });
            }
        },

        async updateCategoryById(
            { getters, commit, dispatch },
            changedDataCategory
        ) {
            await dispatch("globalValidate", {
                title: changedDataCategory["title"],
                description: "notValidateCode",
                amount: "notValidateCode",
                time: "notValidateCode",
                timeTwo: "notValidateCode",
                selected: "notValidateCode",
                img: changedDataCategory["img_url"],
            });
            if (getters.getErrorStatus === 0) {
                await fetch("/api/updateCategoryById/", {
                    method: "POST",
                    body: JSON.stringify(changedDataCategory),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
                    .then()
                    .catch((error) => console.log(error));
                switch (changedDataCategory["type"]) {
                    case "income":
                        dispatch("loadIncomeCategoriesFromDB");
                        break;
                    case "expenses":
                        dispatch("loadExpensesCategoriesFromDB");
                        break;
                }

                commit("togglePopupCategoryChange", {
                    status: false,
                    typeAction: "",
                    typeBlock: "",
                });
            }
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
