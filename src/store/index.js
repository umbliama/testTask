import Vue from "vue";
import Vuex from "vuex";
import registerModule from "./registerModule";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    registerModule: registerModule
  }
});

export default store;
