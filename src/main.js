import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import auth from './views/auth';

export const serverPort = process.env.VUE_APP_SERVER_BASE_LOCATION;
const bus = new Vue();
Vue.prototype.$http = auth.$http;
Vue.prototype.$bus = bus;
Vue.prototype.$urltest = serverPort;

Vue.use(Vuetify)
Vue.config.productionTip = false
const opts = {}

new Vue({
  router,
  store,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount('#app')
