import router from "../router";

const moduleCategory = {
    state() {
        return {
            categories: []
        };
    },
    mutations: {
        setCategories(state, value) {
            state.categories = value
        }
    },
    getters: {
        getCategories(state) {
            return state.categories
        }
    },
    actions: {
        async loadIncomeCategoriesFromDB({commit, getters}) {
            let variable
            await fetch("/api/reqCatTypes/" + (getters.getAuthStatus).userId + "/income")
                .then(async response => variable = await response.json())
                .catch(error => alert(error))
            commit("setCategories", variable)
        },
        async loadExpensesCategoriesFromDB({commit, getters}) {
            let variable
            await fetch("/api/reqCatTypes/" + (getters.getAuthStatus).userId + "/expenses")
                .then(async response => variable = await response.json())
                .catch(error => alert(error))
            commit("setCategories", variable)
        }
    }
}

export default moduleCategory;
