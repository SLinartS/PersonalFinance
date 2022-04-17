const moduleGlobalValidate = {
    state() {
        return {
            titleError: "",
            descriptionError: "",
            amountError: "",
            timeError: "",
            timeTwoError: "",
            selectedError: "",
            imgError: "",
        };
    },
    mutations: {
        setAllErrors(
            state,
            {
                titleError,
                descriptionError,
                amountError,
                timeError,
                timeTwoError,
                selectedError,
                imgError,
            }
        ) {
            state.titleError = titleError;
            state.descriptionError = descriptionError;
            state.amountError = amountError;
            state.timeError = timeError;
            state.timeTwoError = timeTwoError;
            state.selectedError = selectedError;
            state.imgError = imgError;
        },
        clearAllErrors(state) {
            state.titleError = "";
            state.descriptionError = "";
            state.amountError = "";
            state.timeError = "";
            state.timeTwoError = "";
            state.selectedError = "";
            state.imgError = "";
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
        setTimeTwoError(state, value) {
            state.timeTwoError = value;
        },
        setSelectedError(state, value) {
            state.selectedError = value;
        },
        setimgError(state, value) {
            state.imgError = value;
        },
    },
    getters: {
        getAllErrors(state) {
            return {
                titleError: state.titleError,
                descriptionError: state.descriptionError,
                amountError: state.amountError,
                timeError: state.timeError,
                timeTwoError: state.timeTwoError,
                selectedError: state.selectedError,
                imgError: state.imgError,
            };
        },
        getErrorStatus(state) {
            if (
                state.titleError === "" &&
                state.descriptionError === "" &&
                state.amountError === "" &&
                state.timeError === "" &&
                state.timeTwoError === "" &&
                state.selectedError === "" &&
                state.imgError === ""
            ) {
                return 0;
            } else {
                return {
                    titleError: state.titleError,
                    descriptionError: state.descriptionError,
                    amountError: state.amountError,
                    timeError: state.timeError,
                    timeTwoError: state.timeTwoError,
                    selectedError: state.selectedError,
                    imgError: state.imgError,
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
        getTimeTwoError(state) {
            return state.timeTwoError;
        },
        getSelectedError(state) {
            return state.selectedError;
        },
        getImgError(state) {
            return state.imgError;
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
                    timeTwoError: variable["timeTwo"],
                    selectedError: variable["selected"],
                    imgError: variable["img"],
                });
            } else {
                commit("setAllErrors", {
                    titleError: "",
                    descriptionError: "",
                    amountError: "",
                    timeError: "",
                    timeTwoError: "",
                    selectedError: "",
                    imgError: "",
                });
            }
        },
    },
};

export default moduleGlobalValidate;
