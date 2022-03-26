import {createStore} from 'vuex';

const store = createStore({
    state() {
        return {
            allData: null,
        };
    },
    mutations: {
        loadDB(state) {
            console.log(state)
        }
    },
    getters: {
        allData(state) {
            console.log(state)
        },
    },
    actions: {
        load(context) {
            console.log(context)
        },
    }
})

export default store;
