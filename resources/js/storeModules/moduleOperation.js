import axios from "axios"
const moduleOperation = {

    state() {
        return {
            operations: [],
            ChangedDataOperation: [],
        };
    },
    mutations: {
        setOperations(state, value) {
            state.operations = value;
        },
        setChangedDataOperation(state, value) {
            state.ChangedDataOperation = value;
        },
    },
    getters: {
        currentOperations(state) {
            return state.operations;
        },
        getChangedDataOperation(state) {
            return state.ChangedDataOperation;
        },
    },
    actions: {
        async loadOperationByUserId({ commit, getters }) {
            let variable;
            await fetch(
                "/api/getOperationByUserId/" + getters.getAuthStatus.userId
            )
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));
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

        async insertOperationById({ getters }, changedDataOperation ) {
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

        async deleteOperationDataById({ commit }, id) {
            await fetch("/api/deleteOperationById/" + id)
                .then()
                .catch((error) => console.log(error));
        },


    },
};

export default moduleOperation;
