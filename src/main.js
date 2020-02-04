import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import VueGeolocation from 'vue-browser-geolocation';

Vue.config.productionTip = false
Vue.use(VueGeolocation);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
