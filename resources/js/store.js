import {createStore} from 'vuex';
import moduleBalance from "./storeModules/moduleBalance";

const store = createStore({
    modules: {
        moduleBalance
    },
    // state() {
    //     return {
    //
    //     };
    // },
    // mutations: {
    // },
    // getters: {
    // },
    actions: {
        startDataLoad(context) {
            context.commit("moduleBalance/loadAccountsFromDB", {root: true})
            context.commit("moduleBalance/loadDebtsFromDB", {root: true})
            context.commit("moduleBalance/loadSavingFromDB", {root: true})
        },
    }
})

export default store;
