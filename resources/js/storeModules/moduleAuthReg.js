import router from "../router";

const moduleAuthReg = {
    state() {
        return {
            fieldName: "",
            fieldEmail: "",
            fieldPassword: "",
            fieldPasswordRepeat: "",
            errors: {},
            authStatus: {
                status: true,
                userId: 2,
                userName: "Евгений",
                userEmail: "test1@gmail.com",
            },
        };
    },
    mutations: {
        setAuthStatus(state, value) {
            state.authStatus["status"] = value["status"];
            state.authStatus["userId"] = value["userId"];
            state.authStatus["userName"] = value["userName"];
            state.authStatus["userEmail"] = value["userEmail"];
        },
        setAuthStatusFalse(state) {
            state.authStatus = {
                status: false,
                userId: null,
                userName: "",
                userEmail: "",
            };
        },
        changeErrors(state, value) {
            state.errors["nameExist"] = value["nameExist"];
            state.errors["emailExist"] = value["emailExist"];
            state.errors["passwordExist"] = value["passwordExist"];
            state.errors["passwordRepeatExist"] = value["passwordRepeatExist"];
        },
        changeErrorsAttribute(state, { errorType, value }) {
            state.errors[errorType] = value;
        },
        setNameField(state, value) {
            state.fieldName = value;
        },
        setEmailField(state, value) {
            state.fieldEmail = value;
        },
        setPasswordField(state, value) {
            state.fieldPassword = value;
        },
        setPasswordRepeatField(state, value) {
            state.fieldPasswordRepeat = value;
        },
        clearFields(state) {
            state.fieldName = "";
            state.fieldEmail = "";
            state.fieldPassword = "";
            state.fieldPasswordRepeat = "";
        },
        clearErrors(state) {
            state.errors = {};
        },
    },
    getters: {
        getAuthStatus(state) {
            return state.authStatus;
        },
        getAuthStatusStatus(state) {
            return state.authStatus["status"];
        },
        getNameExist(state) {
            if (state.errors.nameExist) {
                return state.errors.nameExist;
            }
        },
        getEmailExist(state) {
            if (state.errors.emailExist) {
                return state.errors.emailExist;
            }
        },
        getPasswordExist(state) {
            if (state.errors.passwordExist) {
                return state.errors.passwordExist;
            }
        },
        getPasswordRepeatExist(state) {
            if (state.errors.passwordRepeatExist) {
                return state.errors.passwordRepeatExist;
            }
        },
    },
    actions: {
        async validateFieldsAuthReg({ commit, state, dispatch }, isReg) {
            commit("setAuthStatusFalse");
            commit("clearErrors");

            let inputData = {
                isReg: isReg,
                name: state.fieldName,
                email: state.fieldEmail,
                password: state.fieldPassword,
                repPassword: state.fieldPasswordRepeat
            };

            let validate;
            await fetch("/api/userCheck", {
                method: "POST",
                body: JSON.stringify(inputData),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
                .then(async (response) => (validate = await response.json()))
                .catch((error) => console.log(error));

            switch (validate["status"]) {
                case 0:
                    commit("changeErrors", {
                        nameExist: validate["errors"]["name"],
                        emailExist: validate["errors"]["email"],
                        passwordExist: validate["errors"]["password"],
                        passwordRepeatExist: validate["errors"]["repPassword"],
                    });
                    break;
                case 1:
                    if (isReg) {
                        commit("changeErrorsAttribute", {
                            errorType: "emailExist",
                            value: validate["errors"]["valideDB"],
                        });
                    } else {
                        commit("changeErrorsAttribute", {
                            errorType: "passwordExist",
                            value: validate["errors"]["valideDB"],
                        });
                    }
                    break;
                default:
                    if (isReg) {
                        dispatch("regUser", inputData);
                    } else {
                        dispatch("changeAuthStatus", inputData);
                    }
                    break;
            }
        },

        async regUser({ dispatch }, inputData) {
            await fetch("/api/insertUser", {
                method: "POST",
                body: JSON.stringify(inputData),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
            }).catch((error) => console.log(error));
            dispatch("changeAuthStatus", inputData);
        },

        async changeAuthStatus({ state, commit }, inputData) {
            commit("togglePopupAuth", false);
            commit("togglePopupReg", false);

            let variable;
            await fetch("/api/findUserData/" + inputData.email)
                .then(async (response) => (variable = await response.json()))
                .catch((error) => console.log(error));

            commit("setAuthStatus", {
                status: true,
                userId: variable["id"],
                userName: variable["name"],
                userEmail: variable["email"],
            });

            commit("clearFields");
            router.push({ name: "main", params: {} });
            console.log(state.authStatus);
        },
    },
};

export default moduleAuthReg;
