import axios from "axios";
const moduleOperation = {
    state() {
        return {
            operations: [],
            ChangedDataOperation: [],
            searchCrit: "",
        };
    },
    mutations: {
        setOperations(state, value) {
            state.operations = value;
        },
        setChangedDataOperation(state, value) {
            state.ChangedDataOperation = value;
        },
        setSearchCrit(state, value) {
            state.searchCrit = value;
        },
    },
    getters: {
        currentOperations(state) {
            return state.operations;
        },
        getChangedDataOperation(state) {
            return state.ChangedDataOperation;
        },
        getSearchCrit(state) {
            return state.searchCrit;
        },
    },
    actions: {
        async loadOperationByUserId({ commit, getters }) {
            const data = {
                userId: getters.getAuthStatus.userId,
                searchCrit: getters.getSearchCrit,
            };
            let variable;

            await fetch("/api/getOperationByUserId/", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));
            console.log(variable);
            if (variable !== 0) {
                commit("setOperations", variable);
            } else {
                commit("setOperations", 0);
            }
        },

        async loadOperationById({ commit }, id) {
            let variable;
            await fetch("/api/getOperationById/" + id)
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));
            if (variable !== 0) {
                commit("setChangedDataOperation", variable);
            } else {
                commit("setChangedDataOperation", 0);
            }
        },

        async updateOperationById({ commit }, changedDataOperation) {
            await fetch("/api/updateOperationById", {
                method: "POST",
                body: JSON.stringify(changedDataOperation),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
                .then()
                .catch((error) => console.log(error));
        },

        async insertOperationById({ getters }, changedDataOperation) {
            changedDataOperation["userId"] = getters.getAuthStatus["userId"];
            await fetch("/api/insertOperationByUserId/", {
                method: "POST",
                body: JSON.stringify(changedDataOperation),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
                .then()
                .catch((error) => console.log(error));
        },

        async deleteOperationById({ commit }, id) {
            await fetch("/api/deleteOperationById/" + id)
                .then()
                .catch((error) => console.log(error));
        },
    },
};

export default moduleOperation;
