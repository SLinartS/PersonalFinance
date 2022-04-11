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
                typeAction: "",
                typeBlock: "",
            },
            popupOperationChange: {
                status: false,
            },
            popupOperationDelete: {
                status: false,
                categoryId: "",
                typeAction: "",
                typeBlock: "",
            },
            popupOperationAdd: {
                status: false,
            },
            popupCategoryChange: {
                status: false,
                typeAction: "",
                typeBlock: "",
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
        togglePopupBalanceDelete(state, { status, typeAction, typeBlock }) {
            state.popupBalanceDelete = {
                status: status,
                typeAction: typeAction,
                typeBlock: typeBlock,
            };
        },
        togglePopupOperationChange(state, { status }) {
            state.popupOperationChange = {
                status: status,
            };
        },
        togglePopupOperationDelete(state, { status, categoryId, typeAction, typeBlock }) {
            state.popupOperationDelete = {
                status: status,
                categoryId: categoryId,
                typeAction: typeAction,
                typeBlock: typeBlock,
            };
        },
        togglePopupOperationAdd(state, { status }) {
            state.popupOperationAdd = {
                status: status,
            };
        },
        togglePopupCategoryChange(state, { status, typeAction, typeBlock }) {
            state.popupCategoryChange = {
                status: status,
                typeAction: typeAction,
                typeBlock: typeBlock,
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
        popupOperationAdd(state) {
            return state.popupOperationAdd;
        },
        popupCategoryChange(state) {
            return state.popupCategoryChange;
        },
    },
};

export default modulePopupControl;
