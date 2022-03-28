const moduleOperation = {
    state() {
        return {
            operations: [],
        };
    },
    mutations: {
        setOperations(state, value) {
            state.operations = value
        }
    },
    getters: {
        currentOperations(state) {
            return state.operations
        }
    },
    actions: {
        async loadOperationFromDB({commit}) {
            let variable
            await fetch("/api/operation")
                .then(async response => variable = await response.json())
                .catch(error => alert(error))

            if (variable !== 0) {
                commit("setOperations", variable)
            } else {
                commit("setOperations", 0)
            }
        }
    }
}

export default moduleOperation;
