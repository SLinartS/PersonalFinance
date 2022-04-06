
const moduleOperation = {
    state() {
        return {
            operations: [],
            currentDate: [],
            dateInQuestion: [],
        };
    },
    mutations: {
        setOperations(state, value) {
            state.operations = value
        },
        setCurrentDate(state, value) {
            state.currentDate = value
        },
        setDateInQuestion(state, value) {
            state.dateInQuestion = value
        }
    },
    getters: {
        currentOperations(state) {
            return state.operations
        }
    },
    actions: {
        async loadOperationFromDB({ commit, dispatch, getters }) {
            let variable
            await fetch("/api/operation/" + (getters.getAuthStatus).userId)
                .then(async response => variable = await response.json())
                .catch(error => alert(error))

            if (variable !== 0) {
                commit("setOperations", (variable))
            } else {
                commit("setOperations", 0)
            }


        },
    }
}

export default moduleOperation;
