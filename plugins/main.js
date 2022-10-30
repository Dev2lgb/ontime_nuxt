import Vue from 'vue';
import _ from 'lodash'
import VueLuxon from "vue-luxon";
import VueConfirmDialog from 'vue-confirm-dialog';
Vue.use(VueLuxon);
Vue.prototype._ = _;


Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);
