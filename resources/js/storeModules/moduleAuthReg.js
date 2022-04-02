import router from "../router";

const moduleAuthReg = {
    state() {
        return {
            fieldName: "",
            fieldEmail: "",
            fieldPassword: "",
            fieldPasswordRepeat: "",
            errors: {},
            callbackErrors: {},
            emailIsCorrect: false,
            authStatus: {
                status: false,
                userId: 0,
                userName: "Андрей",
                userEmail: "6ENvmbRdSU@gmail.com",
            },
        };
    },
    mutations: {
        setAuthStatus(state, {field, value}) {
            state.authStatus[field] = value
        },
        changeErrors(state, value) {
            state.errors = value
        },
        changeErrorsAttribute(state, {errorType, value}) {
            state.errors[errorType] = value
            console.log(state.errors)
        },
        changeEmailIsCorrect(state, value) {
            state.emailIsCorrect = value
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
        validateFieldsAuthReg({commit, state, dispatch}, typeAction) {
            commit("changeErrors", {})

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
                if (state.fieldName === "") {
                    commit("changeErrorsAttribute", {errorType: "nameExist", value: "Укажите имя пользователя"})
                } else {
                    if (state.fieldName.length < 6) {
                        commit("changeErrorsAttribute", {
                            errorType: "nameExist",
                            value: "Имя пользователя должно быть не короче 6 символов"
                        })
                    }
                }

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
            if (!state.errors.emailExist &&
                !state.errors.passwordExist &&
                !state.errors.passwordRepeatExist &&
                !state.errors.nameExist) {
                if (typeAction === "reg") {
                    dispatch("regUser")
                } else {
                    dispatch("authUser")
                }
            }
        },
        async regUser({state, commit, dispatch}) {
            let users;
            commit("changeErrors", {})
            await fetch("/api/users")
                .then(async response => users = await response.json())

            console.log(users)

            const data = {
                name: state.fieldName,
                email: state.fieldEmail,
                password: state.fieldPassword,
            }

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === data.email) {
                    commit("changeErrorsAttribute", {errorType: "emailExist", value: "Такая почта уже существует"})
                }
                if (users[i].name === data.name) {
                    commit("changeErrorsAttribute", {errorType: "nameExist", value: "Такое имя пользователя уже существует"})
                }
            }
            if (!state.errors.emailExist && !state.errors.nameExist) {
                commit("setAuthStatus", {field: "status", value: false})
                await fetch("/api/users", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                })
                commit("togglePopupReg", false)
                commit("setAuthStatus", {field: "status", value: true})
            }
            dispatch("changeAuthStatus", data)

        },
        async authUser({state, commit, dispatch}) {
            let users;
            commit("setAuthStatus", {field: "status", value: false})
            commit("changeErrors", {})
            await fetch("/api/users")
                .then(async response => users = await response.json())

            const data = {
                name: state.fieldName,
                email: state.fieldEmail,
                password: state.fieldPassword,
            }

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === data.email) {
                    if (users[i].password === data.password) {
                        commit("setAuthStatus", {field: "status", value: true})
                        break
                    }
                } else {
                    commit("changeErrorsAttribute", {errorType: "passwordExist", value: "Неверная почта или пароль"})
                }
            }
            if (state.authStatus.status === true) {
                commit("togglePopupAuth", false)
                dispatch("changeAuthStatus", data)
            }

        },
        async changeAuthStatus({state, commit}, data) {
            let user
            await fetch("/api/users")
                .then(async response => user = await response.json())

            for (let i = 0; i < user.length; i++) {
                if (user[i].email === data.email) {
                    commit("setAuthStatus", {field: "userName", value: user[i].name})
                    commit("setAuthStatus", {field: "userId", value: user[i].id})
                    commit("setAuthStatus", {field: "userEmail", value: user[i].email})
                }
            }
            commit("setNameField", "")
            commit("setPasswordField", "")
            commit("setEmailField", "")
            commit("setPasswordRepeatField", "")
            router.push({ name: 'main', params: {} })
            console.log(state.authStatus)
        },
        validEmail({commit}, email) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            commit("changeEmailIsCorrect", !re.test(email))
        },
    }
}

export default moduleAuthReg;
