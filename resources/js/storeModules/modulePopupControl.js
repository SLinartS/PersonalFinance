const modulePopupControl = {
    state() {
        return {
            popupNav: false,
            popupAuth: false,
            popupReg: false,
            popupBalanceChange: {
                status: false,
                typeAction: "",
                typeBlock: "",
            },
            popupBalanceDelete: {
                status: false,
                typeBlock: "",
            },
            popupOperationChange: {
                status: false,
            },
            popupOperationDelete: {
                status: false,
            },
        };
    },
    mutations: {
        togglePopupNav(state, value) {
            state.popupNav = value;
        },
        togglePopupAuth(state, value) {
            if (state.popupReg) {
                state.popupAuth = false;
            } else {
                state.popupAuth = value;
            }
        },
        togglePopupReg(state, value) {
            if (state.popupAuth) {
                state.popupReg = false;
            } else {
                state.popupReg = value;
            }
        },
        togglePopupBalanceChange(state, { status, typeAction, typeBlock }) {
            state.popupBalanceChange = {
                status: status,
                typeAction: typeAction,
                typeBlock: typeBlock,
            };
        },
        togglePopupBalanceDelete(state, { status, typeBlock }) {
            state.popupBalanceDelete = {
                status: status,
                typeBlock: typeBlock,
            };
        },
        togglePopupOperationChange(state, { status }) {
            state.popupOperationChange = {
                status: status,
            };
        },
        togglePopupOperationDelete(state, { status }) {
            state.popupOperationDelete = {
                status: status,
            };
        },
    },
    getters: {
        popupNav(state) {
            return state.popupNav;
        },
        popupAuth(state) {
            return state.popupAuth;
        },
        popupReg(state) {
            return state.popupReg;
        },
        popupBalanceChange(state) {
            return state.popupBalanceChange;
        },
        popupBalanceDelete(state) {
            return state.popupBalanceDelete;
        },
        popupOperationChange(state) {
            return state.popupOperationChange;
        },
        popupOperationDelete(state) {
            return state.popupOperationDelete;
        },
    },
};

export default modulePopupControl;
