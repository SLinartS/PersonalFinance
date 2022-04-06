import {createStore} from 'vuex';
import moduleBalance from "./storeModules/moduleBalance";
import moduleOperation from "./storeModules/moduleOperation";
import moduleAuthReg from "./storeModules/moduleAuthReg";
import modulePopupControl from "./storeModules/modulePopupControl";
import moduleCategory from './storeModules/moduleCategory';

const store = createStore({
    modules: {
        moduleBalance,
        moduleOperation,
        moduleAuthReg,
        modulePopupControl,
        moduleCategory,
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
            dispatch("loadBalanceDataFromDB", "account");
            dispatch("loadBalanceDataFromDB", "debt");
            dispatch("loadBalanceDataFromDB", "saving");
        },
    }
})

export default store;
