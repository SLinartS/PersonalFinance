const moduleOption = {
    state() {
        return {
            options: 0,
        };
    },
    mutations: {
        setOptionsList(state, value) {
            state.options = value;
        },
    },
    getters: {
        getOptionsList(state) {
            return state.options;
        },
    },
    actions: {
        async loadOptionsByUserId({ commit, getters }) {
            let variable;
            await fetch("/api/getOptionsList/" + getters.getAuthStatus.userId)
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));

            if (variable !== 0) {
                commit("setOptionsList", variable);
            } else {
                commit("setOptionsList", 0);
            }
        },
        async updateOptionsByUserId({ getters, commit }, newOptionsData) {
            const postData = {
                userId: getters.getAuthStatus["userId"],
                optionCurrencies: newOptionsData["optionCurrencies"],
                optionSeparators: newOptionsData["optionSeparators"],
                optionSpaces: newOptionsData["optionSpaces"]
            };
            await fetch("/api/updateOptionsList", {
                method: "POST",
                body: JSON.stringify(postData),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
                .then()
                .catch((error) => console.log(error));

            commit("togglePopupSetting", false);
        },
    },
};

export default moduleOption;
