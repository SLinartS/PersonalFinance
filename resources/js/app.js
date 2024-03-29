/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue').default;

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

import {createApp} from 'vue';
import App from "./components/App"
import store from "./store"
import router from "./router"

import moment from "moment"
moment.locale('ru');


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


// app.config.unwrapInjectedRef = true

const app = createApp(App)

app.use(store);
app.use(router);
app.mount("#app")

