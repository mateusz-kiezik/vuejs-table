/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import Vue from 'vue'
import { TablePlugin } from 'bootstrap-vue';
import { PaginationPlugin } from 'bootstrap-vue';
import { FormInputPlugin } from 'bootstrap-vue';
import { FormPlugin } from 'bootstrap-vue';
import { OverlayPlugin } from 'bootstrap-vue';
import { ButtonPlugin } from 'bootstrap-vue';
import { ModalPlugin } from 'bootstrap-vue';
import App from './views/App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-vue/dist/bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(TablePlugin);
Vue.use(PaginationPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormPlugin);
Vue.use(OverlayPlugin);
Vue.use(ButtonPlugin);
Vue.use(ModalPlugin);
Vue.use(VueAxios, axios);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

//

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

window.onload = function() {
    const app = new Vue({
        el: '#app',
        render: h => h(App)
    });
}

export default app;



