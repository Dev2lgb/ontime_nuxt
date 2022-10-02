import Vuex from "vuex";
import Vue from "vue";

import { common } from "@/store/modules/common";
import { user } from "@/store/modules/user";

Vue.use(Vuex);

export default () => new Vuex.Store({
  modules: { common: common, user: user },
});
