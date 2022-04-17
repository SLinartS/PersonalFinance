import axios from "axios";
const moduleOperation = {
    state() {
        return {
            operations: [],
            ChangedDataOperation: [],
            searchCrit: "",
            searchRangeStart: "",
            searchRangeEnd: "",
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
        setSearchRangeStart(state, value) {
            state.searchRangeStart = value;
        },
        setSearchRangeEnd(state, value) {
            state.searchRangeEnd = value;
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
        getSearchRangeStart(state) {
            return state.searchRangeStart;
        },
        getSearchRangeEnd(state) {
            return state.searchRangeEnd;
        },
    },
    actions: {
        async loadOperationByUserId({ commit, getters, dispatch }) {
            const data = {
                userId: getters.getAuthStatus.userId,
                searchCrit: getters.getSearchCrit,
                searchRangeStart: getters.getSearchRangeStart,
                searchRangeEnd: getters.getSearchRangeEnd,
            };

            if (data["searchCrit"].length === 0) {
                await dispatch("globalValidate", {
                    title: "notValidateCode",
                    description: "notValidateCode",
                    amount: "notValidateCode",
                    time: data["searchRangeStart"],
                    timeTwo: data["searchRangeEnd"],
                    selected: "notValidateCode",
                    img: "notValidateCode",
                });
            } else {
                commit("clearAllErrors");
            }

            if (getters.getErrorStatus === 0) {
                let variable;
                await fetch("/api/getOperationByUserId/", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
                    .then(
                        async (response) => (variable = await response.json())
                    )
                    .catch((error) => console.log(error));
                if (variable !== 0) {
                    commit("setOperations", variable);
                } else {
                    commit("setOperations", 0);
                }
                commit("setSearchRangeStart", "");
                commit("setSearchRangeEnd", "");
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
                commit("setChangedDataOperation", []);
            }
        },

        async updateOperationById(
            { commit, dispatch, getters },
            changedDataOperation
        ) {
            await dispatch("globalValidate", {
                title: "notValidateCode",
                description: changedDataOperation["description"],
                amount: changedDataOperation["amount"],
                time: changedDataOperation["time"],
                timeTwo: "notValidateCode",
                selected: "notValidateCode",
                img: "notValidateCode",
            });
            if (getters.getErrorStatus === 0) {
                await fetch("/api/updateOperationById", {
                    method: "POST",
                    body: JSON.stringify(changedDataOperation),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
                    .then()
                    .catch((error) => console.log(error));

                dispatch("loadOperationByUserId");
                commit("togglePopupOperationChange", {
                    status: false,
                });
                commit("setChangedDataOperation", []);
            }
        },

        async insertOperationById(
            { getters, commit, dispatch },
            newDataOperation
        ) {
            await dispatch("globalValidate", {
                title: "notValidateCode",
                description: newDataOperation["description"],
                amount: newDataOperation["amount"],
                time: newDataOperation["time"],
                timeTwo: "notValidateCode",
                selected: "notValidateCode",
                img: "notValidateCode",
            });
            if (getters.getErrorStatus === 0) {
                newDataOperation["userId"] = getters.getAuthStatus["userId"];
                await fetch("/api/insertOperationByUserId/", {
                    method: "POST",
                    body: JSON.stringify(newDataOperation),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
                    .then()
                    .catch((error) => console.log(error));

                switch (newDataOperation["typeCategory"]) {
                    case "income":
                        dispatch("loadIncomeCategoriesFromDB");
                        break;
                    case "expenses":
                        dispatch("loadExpensesCategoriesFromDB");
                        break;
                }
                commit("togglePopupOperationAdd", {
                    status: false,
                });
                commit("setChangedDataCategory", []);
            }
        },

        async deleteOperationById({ commit }, id) {
            await fetch("/api/deleteOperationById/" + id)
                .then()
                .catch((error) => console.log(error));
        },
    },
};

export default moduleOperation;
