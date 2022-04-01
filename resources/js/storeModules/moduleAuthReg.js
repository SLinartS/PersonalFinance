const moduleAuthReg = {
    state() {
        return {
            fieldEmail: "",
            fieldPassword: "",
            fieldPasswordRepeat: "",
            errors: {},
            emailIsCorrect: false
        };
    },
    mutations: {
        changeErrors(state, value) {
            state.errors = value
        },
        changeErrorsAttribute(state, {errorType, value}) {
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
        validateFieldsAuthReg({commit, state, dispatch}, typeAction) {
            commit("changeErrors", {})
            commit("changeEmailIsCorrect", false)
            if (state.fieldEmail === "") {
                commit("changeErrorsAttribute", {errorType: "emailExist", value: "Укажите эл. почту"})
            } else {
                dispatch("validEmail", state.fieldEmail)
                if (state.emailIsCorrect) {
                    commit("changeErrorsAttribute", {errorType: "emailExist", value: "Неверный формат эл. почты"})
                }
            }
            if (state.fieldPassword === "") {
                commit("changeErrorsAttribute", {errorType: "passwordExist", value: "Укажите пароль"})
            }
            if (typeAction === "reg") {
                if (state.fieldPasswordRepeat === "") {
                    commit("changeErrorsAttribute", {errorType: "passwordRepeatExist", value: "Укажите пароль ещё раз"})
                } else {
                    if (state.fieldPassword !== state.fieldPasswordRepeat) {
                        commit("changeErrorsAttribute", {
                            errorType: "passwordRepeatExist",
                            value: "Пароли не совпадают"
                        })
                    }
                }
            }
            console.log(state.errors)
            if(!state.errors.fieldEmail && !state.errors.fieldPassword && !state.errors.fieldPasswordRepeat) {
                dispatch("sendUserData")
            }
        },
        validEmail({commit}, email) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            commit("changeEmailIsCorrect", !re.test(email))
        },
        async sendUserData({state}) {
            console.log("!!!")
            const data = {
                name: state.fieldEmail,
                email: state.fieldEmail,
                password: state.fieldPassword,
            }
            await fetch("/api/users", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        }
    }
}

export default moduleAuthReg;
