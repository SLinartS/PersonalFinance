import router from "../router";

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
            console.log("----------------", state.setSumOperation)
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
            await fetch(
                "/api/reqCatTypes/" + getters.getAuthStatus.userId + "/income"
            )
                .then(async (response) => (variable = await response.json()))
                .catch((error) => alert(error));
            console.log(variable);
            dispatch("loadIncomeOperatonsByCat", variable);
            commit("setCategories", variable);
        },
        async loadExpensesCategoriesFromDB({ commit, getters, dispatch }) {
            let variable;
            await fetch(
                "/api/reqCatTypes/" + getters.getAuthStatus.userId + "/expenses"
            )
                .then(async (response) => (variable = await response.json()))
                .catch((error) => alert(error));
            console.log(variable);
            dispatch("loadExpensesOperatonsByCat");
            commit("setCategories", variable);
        },
        async loadIncomeOperatonsByCat({ commit, getters, dispatch }) {
            let operationByCat;
            await fetch(
                "/api/reqCatOperations/" +
                getters.getAuthStatus.userId +
                "/income")
                .then(async (response) => (operationByCat = await response.json()))
                .catch((error) => alert(error));
            console.log(operationByCat);
            dispatch("sumOperationsByCategory", operationByCat);
        },
        async loadExpensesOperatonsByCat({ commit, getters, dispatch }) {
            let operationByCat;
            await fetch(
                "/api/reqCatOperations/" +
                getters.getAuthStatus.userId +
                "/expenses")
                .then( async (response) => (operationByCat = await response.json()))
                .catch((error) => alert(error));
            console.log(operationByCat);
            dispatch("sumOperationsByCategory", operationByCat);
        },
        sumOperationsByCategory({ commit, getters }, operationByCat) {
            let locSumOper = {};
            let equal = false;
            console.log(operationByCat.length);
            for (let i = 0; i < operationByCat.length; i++) {
                Object.keys(locSumOper).forEach((key) => {
                    if (key === operationByCat[i]["title"]) {
                        equal = true;
                    }
                    console.log(key);
                    console.log(operationByCat[i]["title"]);
                });
                if (!equal) {
                    locSumOper[operationByCat[i]["title"]] = 0;
                    console.log(locSumOper);
                }
                equal = false;
            }
            console.log(locSumOper);
            Object.keys(locSumOper).forEach((key) => {
                for (let i = 0; i < operationByCat.length; i++) {
                    if ((key = operationByCat[i]["title"])) {
                        locSumOper[key] =
                        locSumOper[key] +
                            Number(operationByCat[i]["operation_amount"]);
                    }
                }
            });
            console.log(locSumOper);
            commit("setSumOperation", locSumOper)
        },
    },
};

export default moduleCategory;
