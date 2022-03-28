import {createStore} from 'vuex';
import moduleBalance from "./storeModules/moduleBalance";
import moduleOperation from "./storeModules/moduleOperation";

const store = createStore({
    modules: {
        moduleBalance,
        moduleOperation
    },
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
        startDataLoad({dispatch}) {
            dispatch("loadAccountsFromDB")
            dispatch("loadDebtsFromDB")
            dispatch("loadSavingFromDB")
        },
    }
})

export default store;
