const moduleAuthReg = {
    state() {
        return {
            fieldEmail: "",
            fieldPassword: "",
            fieldPasswordRepeat: "",
            errors: {},
            callbackErrors: {},
            emailIsCorrect: false,
            authStatus: true,
        };
    },
    mutations: {
        setAuthStatus(state, value) {
            state.authStatus = value
        },
        changeErrors(state, value) {
            state.errors = value
        },
        changeErrorsAttribute(state, { errorType, value }) {
            state.errors[errorType] = value
        },
        changeEmailIsCorrect(state, value) {
            state.emailIsCorrect = value
        },
        setEmailField(state, value) {
            state.fieldEmail = value
        },
        setPasswordField(state, value) {
            state.fieldPassword = value
        },
        setPasswordRepeatField(state, value) {
            state.fieldPasswordRepeat = value
        }
    },
    getters: {
        getAuthStatus(state) {
            return state.authStatus;
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
        validateFieldsAuthReg({ commit, state, dispatch }, typeAction) {
            commit("changeErrors", {})
            commit("changeEmailIsCorrect", false)
            if (state.fieldEmail === "") {
                commit("changeErrorsAttribute", { errorType: "emailExist", value: "Укажите эл. почту" })
            } else {
                dispatch("validEmail", state.fieldEmail)
                if (state.emailIsCorrect) {
                    commit("changeErrorsAttribute", { errorType: "emailExist", value: "Неверный формат эл. почты" })
                }
            }
            if (state.fieldPassword === "") {
                commit("changeErrorsAttribute", { errorType: "passwordExist", value: "Укажите пароль" })
            }
            if (typeAction === "reg") {
                if (state.fieldPasswordRepeat === "") {
                    commit("changeErrorsAttribute", { errorType: "passwordRepeatExist", value: "Укажите пароль ещё раз" })
                } else {
                    if (state.fieldPassword !== state.fieldPasswordRepeat) {
                        commit("changeErrorsAttribute", {
                            errorType: "passwordRepeatExist",
                            value: "Пароли не совпадают"
                        })
                    }
                }
            }
            if (!state.errors.emailExist && !state.errors.passwordExist && !state.errors.passwordRepeatExist) {
                if (typeAction === "reg") {
                    dispatch("regUser")
                } else {
                    dispatch("authUser")
                }

            }
        },
        validEmail({ commit }, email) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            commit("changeEmailIsCorrect", !re.test(email))
        },
        async regUser({ state, commit }) {
            let users;
            commit("setAuthStatus", false)
            commit("changeErrors", {})
            await fetch("/api/users")
                .then(async response => users = await response.json())

            const data = {
                name: state.fieldEmail,
                email: state.fieldEmail,
                password: state.fieldPassword,
            }

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === data.email) {
                    commit("changeErrorsAttribute", { errorType: "emailExist", value: "Такая почта уже существует" })
                }
            }
            if (!state.errors.emailExist) {
                await fetch("/api/users", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                })
                commit("togglePopupReg", false)
                commit("setAuthStatus", true)
            }
        },
        async authUser({ state, commit }) {
            let users;
            commit("setAuthStatus", false)
            commit("changeErrors", {})
            await fetch("/api/users")
                .then(async response => users = await response.json())

            console.log(users)

            const data = {
                name: state.fieldEmail,
                email: state.fieldEmail,
                password: state.fieldPassword,
            }

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === data.email) {
                    if (users[i].password === data.password) {
                        commit("setAuthStatus", true)
                        commit("changeErrors", {})
                    }
                } else {
                    commit("changeErrorsAttribute", { errorType: "passwordExist", value: "Неверная почта или пароль" })
                }
            }
            if (state.authStatus === true) {
                commit("togglePopupAuth", false)
            }
        }
    }
}

export default moduleAuthReg;
