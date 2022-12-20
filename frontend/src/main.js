import Vue from 'vue'
import App from './App.vue'

import router from './router';
import axios from './plugins/axios';
import store from './store';
import './main.scss';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(VueToast, {
  position: 'bottom',
  duration: 500,
  dismissible: true,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
