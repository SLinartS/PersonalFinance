import {createStore} from 'vuex';
import moduleBalance from "./storeModules/moduleBalance";
import moduleOperation from "./storeModules/moduleOperation";
import moduleAuthReg from "./storeModules/moduleAuthReg";
import modulePopupControl from "./storeModules/modulePopupControl";
import moduleCategory from './storeModules/moduleCategory';
import moduleGlobalValidate from "./storeModules/moduleGlobalValidate"
import moduleAnalytics from "./storeModules/moduleAnalytics"
import moduleOption from "./storeModules/moduleOption"

const store = createStore({
    modules: {
        moduleBalance,
        moduleOperation,
        moduleAuthReg,
        modulePopupControl,
        moduleCategory,
        moduleGlobalValidate,
        moduleAnalytics,
        moduleOption,
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
    }
})

export default store;
