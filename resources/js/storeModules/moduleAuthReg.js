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
                userId: 3,
                userName: "Андрей",
                userEmail: "test1@gmail.com",
            },
        };
    },
    mutations: {
        setAuthStatus(state, { field, value }) {
            state.authStatus[field] = value
        },
        changeErrors(state, value) {
            state.errors = value
        },
        changeErrorsAttribute(state, { errorType, value}) {
            state.errors[errorType] = value
        },
        setNameField(state, value) {
            state.fieldName = value
        },
        setEmailField(state, value) {
            state.fieldEmail = value
        },
        setPasswordField(state, value) {
            state.fieldPassword = value
        },
        setPasswordRepeatField(state, value) {
            state.fieldPasswordRepeat = value
        },
        clearFields(state) {
            state.fieldName = ""
            state.fieldEmail = ""
            state.fieldPassword = ""
            state.fieldPasswordRepeat = ""
        }
    },
    getters: {
        getAuthStatus(state) {
            return state.authStatus;
        },
        getNameExist(state) {
            if (state.errors.nameExist) {
                return state.errors.nameExist
            }
        },
        getEmailExist(state) {
            if (state.errors.emailExist) {
                return state.errors.emailExist
            }
        },
        getPasswordExist(state) {
            if (state.errors.passwordExist) {
                return state.errors.passwordExist
            }
        },
        getPasswordRepeatExist(state) {
            if (state.errors.passwordRepeatExist) {
                return state.errors.passwordRepeatExist
            }
        },
    },
    actions: {
        async validateFieldsAuthReg({ commit, state, dispatch }, typeAction) {
            commit("setAuthStatus", {field: "status", value: false })
            commit("changeErrors", {})
            let inputData
            switch (typeAction) {
                case "auth":
                    inputData = {
                        actionType: typeAction,
                        email: state.fieldEmail,
                        password: state.fieldPassword,
                    }
                    break;
                case "reg":
                    inputData = {
                        actionType: typeAction,
                        name: state.fieldName,
                        email: state.fieldEmail,
                        password: state.fieldPassword,
                        repPassword: state.fieldPasswordRepeat,
                    }
                    break;
                default:
                    break;
            }

            let validate
            await fetch("/api/userCheck", {
                method: 'POST',
                body: JSON.stringify(inputData),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
            .then(async response => validate = await response.json())
            .catch(error => alert(error))

            let errorsExist = false;
            Object.keys(validate).forEach(function (key) {
                const errorStackByType = validate[key]
                for (let i = 0; i < errorStackByType.length; i++) {
                    errorsExist = true
                    switch (errorStackByType[i]) {
                        // NAME VALIDATE ------------------------------------------
                        case "The name field is required.":
                            commit("changeErrorsAttribute", {
                                errorType: "nameExist",
                                value: "Укажите имя пользователя"
                            })
                            break;
                        case "The name must be at least 6 characters.":
                            commit("changeErrorsAttribute", {
                                errorType: "nameExist",
                                value: "Имя пользователя должно быть не короче 6 символов"
                            })
                            break;

                        // EMAIL VALIDATE ------------------------------------------
                        case "The email field is required.":
                            commit("changeErrorsAttribute", {
                                errorType: "emailExist",
                                value: "Укажите эл. почту"
                            })
                            break;
                        case "The email must be a valid email address.":
                            commit("changeErrorsAttribute", {
                                errorType: "emailExist",
                                value: "Неверный формат эл. почты"
                            })
                            break;

                        // PASSWORD VALIDATE ------------------------------------------
                        case "The password field is required.":
                            commit("changeErrorsAttribute", {
                                errorType: "passwordExist",
                                value: "Укажите пароль"
                            })
                            break;

                        case "The password must be at least 8 characters.":
                            commit("changeErrorsAttribute", {
                                errorType: "passwordExist",
                                value: "Пароль должен быть не короче 8 символов"
                            })
                            break;

                        case "The password and rep password must match.":
                            commit("changeErrorsAttribute", {
                                errorType: "passwordRepeatExist",
                                value: "Пароли должны совпадать"
                            })
                            break;

                        case "The rep password field is required.":
                            commit("changeErrorsAttribute", {
                                errorType: "passwordRepeatExist",
                                value: "Повторите пароль"
                            })
                            break;

                        // AUTH VALIDATE ------------------------------------------
                        case "Invalid email or password":
                            commit("changeErrorsAttribute", {
                                errorType: "passwordExist",
                                value: "Неверная почта или пароль"
                            })
                            break;

                        // REG VALIDATE ------------------------------------------
                        case "This mail already exists":
                            commit("changeErrorsAttribute", {
                                errorType: "emailExist",
                                value: "Такая почта уже существует"
                            })
                            break;
                    }
                }
            });

            if (!errorsExist) {
                if (typeAction === "reg") {
                    dispatch("regUser", inputData)
                } else {
                    dispatch("changeAuthStatus", inputData)
                }
            }
        },

        async regUser({commit, dispatch }, inputData) {

            await fetch("/api/users", {
                method: 'POST',
                body: JSON.stringify(inputData),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).catch(error => alert(error))


            dispatch("changeAuthStatus", inputData)
        },
        async changeAuthStatus({ state, commit }, inputData) {

            commit("togglePopupAuth", false)
            commit("togglePopupReg", false)

            commit("setAuthStatus", { field: "status", value: true })

            let user
            await fetch("/api/users")
                .then(async response => user = await response.json())
                .catch(error => alert(error))

            for (let i = 0; i < user.length; i++) {
                if (user[i].email === inputData.email) {
                    commit("setAuthStatus", { field: "userName", value: user[i].name })
                    commit("setAuthStatus", { field: "userId", value: user[i].id })
                    commit("setAuthStatus", { field: "userEmail", value: user[i].email })
                }
            }

            commit("clearFields")
            router.push({ name: 'main', params: {} })
            console.log(state.authStatus)
        },
    }
}

export default moduleAuthReg;
