import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.devtools = true;

import VueRouter from 'vue-router'
import ourRoutes from './router'

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: ourRoutes,
});

import VueAxios from 'vue-axios'
import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.use(VueAxios, axios);

// Vue-material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial);

// Vue-Flash-Message
import VueFlashMessage from 'vue-flash-message'
require('vue-flash-message/dist/vue-flash-message.min.css');
Vue.use(VueFlashMessage);

import Store from './store/Store'

// new Vue(Vue.util.extend({ router,Store },App)).$mount('#app');

new Vue({
	Store,
	router,
	render: h => h(App)
}).$mount('#app');
