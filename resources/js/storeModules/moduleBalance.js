const moduleBalance = {
    state() {
        return {
            accounts: {},
            changedAccountData: [],
        };
    },
    mutations: {
        setAccounts(state, value) {
            state.accounts = value;
        },
        setChangedAccountData(state, value) {
            state.changedAccountData = value;
        },
    },
    getters: {
        currentAccounts(state) {
            return state.accounts;
        },
        getChangedAccountData(state) {
            return state.changedAccountData;
        },
    },
    actions: {
        async loadAccountsData({ commit, getters }) {
            let variable = 0;
            await fetch(
                "/api/getAccountsByUserId/" + getters.getAuthStatus.userId
            )
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));
            if (variable !== 0) {
                commit("setAccounts", variable);
            } else {
                commit("setAccounts", 0);
            }
        },

        async loadAccountById({ commit }, id) {
            let variable;
            await fetch("/api/getAccountById/" + id)
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));

            if (variable !== 0) {
                commit("setChangedAccountData", variable);
            } else {
                commit("setChangedAccountData", 0);
            }
        },

        async updateAccountById(
            { commit, dispatch, getters },
            changedAccountData
        ) {
            await dispatch("globalValidate", {
                title: changedAccountData["title"],
                description: "notValidate",
                amount: changedAccountData["amount"],
                time: "notValidateCode",
                selected: "notValidateCode",
                img: "notValidateCode"
            });
            if (getters.getErrorStatus === 0) {
                await fetch("/api/updateAccountById", {
                    method: "POST",
                    body: JSON.stringify(changedAccountData),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
                    .then()
                    .catch((error) => console.log(error));

                dispatch("loadAccountsData");
                commit("togglePopupBalanceChange", {
                    status: false,
                    typeAction: "",
                    typeBlock: "",
                });
                commit("setChangedAccountData", []);
            }
        },
        async deleteAccountById({ commit }, id) {
            await fetch("/api/deleteAccountById/" + id)
                .then()
                .catch((error) => console.log(error));
        },

        async clearAccountsByUserId({ getters }, type) {
            const postData = {
                type: type,
                userId: getters.getAuthStatus["userId"],
            };
            await fetch("/api/clearAccountsByUserId", {
                method: "POST",
                body: JSON.stringify(postData),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
                .then()
                .catch((error) => console.log(error));
        },

        async insertAccountByType({ commit, getters, dispatch}, newAccountData) {
            newAccountData["userId"] = getters.getAuthStatus["userId"];

            await dispatch("globalValidate", {
                title: newAccountData["title"],
                description: "notValidate",
                amount: newAccountData["amount"],
                time: "notValidateCode",
                selected: "notValidateCode",
                img: "notValidateCode"
            });
            if (getters.getErrorStatus === 0) {
                await fetch("/api/insertAccountByUserId/", {
                    method: "POST",
                    body: JSON.stringify(newAccountData),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
                    .then()
                    .catch((error) => console.log(error));

                dispatch("loadAccountsData");
                commit("togglePopupBalanceChange", {
                    status: false,
                    typeAction: "",
                    typeBlock: "",
                });
                commit("setChangedAccountData", []);
            }
        },
    },
};

export default moduleBalance;
