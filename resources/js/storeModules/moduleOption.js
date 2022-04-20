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
    },
};

export default moduleOption;
