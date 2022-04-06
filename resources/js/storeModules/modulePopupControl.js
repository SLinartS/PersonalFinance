
const modulePopupControl = {
    state() {
        return {
            popupNav: false,
            popupAuth: false,
            popupReg: false,
            popupBalanceChange: false,
        };
    },
    mutations: {
        togglePopupNav(state, value) {
            state.popupNav = value
        },
        togglePopupAuth(state, value) {
            if (state.popupReg) {
                state.popupAuth = false
            } else {
                state.popupAuth = value
            }
        },
        togglePopupReg(state, value) {
            if (state.popupAuth) {
                state.popupReg = false
            } else {
                state.popupReg = value
            }
        },
        togglePopupBalanceChange(state, value) {
            state.popupBalanceChange = value
        }
    },
    getters: {
        popupNav(state) {
            return state.popupNav
        },
        popupAuth(state) {
            return state.popupAuth
        },
        popupReg(state) {
            return state.popupReg
        },
        popupBalanceChange(state) {
            return state.popupBalanceChange
        },
    },
}

export default modulePopupControl;
