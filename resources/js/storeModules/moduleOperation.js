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
        async loadOperationFromDB({commit, dispatch, getters}) {
            let variable
            await fetch("/api/operation/" + (getters.getAuthStatus).userId)
                .then(async response => variable = await response.json())
                // .catch(error => alert(error))
            if (variable !== 0) {
                commit("setOperations", variable)
            } else {
                commit("setOperations", 0)
            }

            dispatch("packedOperations")
        },
        packedOperations({commit, getters}) {
            if (getters.currentOperations.length !== 0) {
                let sortedOperations = getters.currentOperations.sort(function (a, b) {
                    return new Date(b.time) - new Date(a.time);
                });

                let packagedOperations = [];
                let currentSubarray = 0;
                let currentDateTime = new Date(sortedOperations[1].time);
                let currentDate = [
                    currentDateTime.getFullYear(),
                    currentDateTime.getMonth() + 1,
                    currentDateTime.getDate()
                ]

                for (let i = 0; i < sortedOperations.length; i++) {
                    let dateTimeInQuestion = new Date(sortedOperations[i].time)
                    let dateInQuestion = [
                        dateTimeInQuestion.getFullYear(),
                        dateTimeInQuestion.getMonth() + 1,
                        dateTimeInQuestion.getDate()
                    ]

                    let equals = true;
                    for (let i = 0; i < 3; i++) {
                        if (dateInQuestion[i] !== currentDate[i]) {equals = false; break;}
                    }

                    if (equals) {
                        if (packagedOperations.length === 0) packagedOperations.push([]);
                        packagedOperations[currentSubarray].push(sortedOperations[i]);
                    } else {
                        {
                            if (packagedOperations.length !== 0) currentSubarray++;
                            packagedOperations.push([]);
                            packagedOperations[currentSubarray].push(sortedOperations[i]);
                            currentDate = dateInQuestion;
                        }
                    }
                }
                commit("setOperations", (packagedOperations))
            }
        },
    }
}

export default moduleOperation;
