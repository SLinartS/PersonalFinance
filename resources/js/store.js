import {createStore} from 'vuex';

const store = createStore({
    state() {
        return {
            popupNav: false,
            popupAuth: false,
            popupReg: false,
        };
    },
    mutations: {
        togglePopupNav(state, value) {
            state.popupNav = value
        },
        togglePopupAuth(state, value) {
            state.popupAuth = value
        },
        togglePopupReg(state, value) {
            state.popupReg = value
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
    },
    actions: {
        load(context) {
            console.log(context)
        },
    }
})

export default store;
