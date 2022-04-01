import {createStore} from 'vuex';
import moduleBalance from "./storeModules/moduleBalance";
import moduleOperation from "./storeModules/moduleOperation";
import moduleAuthReg from "./storeModules/moduleAuthReg";
import modulePopupControl from "./storeModules/modulePopupControl";

const store = createStore({
    modules: {
        moduleBalance,
        moduleOperation,
        moduleAuthReg,
        modulePopupControl
    },
    state() {
        return {

        };
    },
    mutations: {

    },
    getters: {

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
