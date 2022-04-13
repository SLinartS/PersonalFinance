const moduleGlobalValidate = {
    state() {
        return {
            titleError: "",
            descriptionError: "",
            amountError: "",
            timeError: "",
        };
    },
    mutations: {
        setAllErrors(
            state,
            { titleError, descriptionError, amountError, timeError }
        ) {
            state.titleError = titleError;
            state.descriptionError = descriptionError;
            state.amountError = amountError;
            state.timeError = timeError;
        },
        setTitleError(state, value) {
            state.titleError = value;
        },
        setDescriptionError(state, value) {
            state.descriptionError = value;
        },
        setAmountError(state, value) {
            state.amountError = value;
        },
        setTimeError(state, value) {
            state.timeError = value;
        },
    },
    getters: {
        getAllErrors(state) {
            return {
                titleError: state.titleError,
                descriptionError: state.descriptionError,
                amountError: state.amountError,
                timeError: state.timeError,
            };
        },
        getErrorStatus(state) {
            if (
                (state.titleError === "" &&
                state.descriptionError === "" &&
                state.amountError === "" &&
                state.timeError === "")
            ) {
                return 0;
            } else {
                return {
                    titleError: state.titleError,
                    descriptionError: state.descriptionError,
                    amountError: state.amountError,
                    timeError: state.timeError,
                };
            }
        },
        getTitleError(state) {
            return state.titleError;
        },
        getDescriptionError(state) {
            return state.descriptionError;
        },
        getAmountError(state) {
            return state.amountError;
        },
        getTimeError(state) {
            return state.timeError;
        },
    },
    actions: {
        async globalValidate({ commit }, validateData) {
            let variable;
            await fetch("/api/validateField/", {
                method: "POST",
                body: JSON.stringify(validateData),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));
            console.log(variable);

            if (variable !== 0) {
                commit("setAllErrors", {
                    titleError: variable["title"],
                    descriptionError: variable["description"],
                    amountError: variable["amount"],
                    timeError: variable["time"],
                });
            } else {
                commit("setAllErrors", {
                    titleError: "",
                    descriptionError: "",
                    amountError: "",
                    timeError: "",
                });
            }
        },
    },
};

export default moduleGlobalValidate;
