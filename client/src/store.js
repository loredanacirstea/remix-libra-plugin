import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const serverIP = process.env.VUE_APP_SERVER_IP;

export default new Vuex.Store({
  state: {
    compiler: {},
    source: '',
    compiled: '',
  },
  mutations: {
    setState(state, {field, data}) {
      state[field] = data;
    },
  },
  actions: {
    setCompiler({commit}) {
      Vue.axios.get(`${serverIP}/libra/compiler`).then((response) => {
        let data = {version: response.data.replace('Compiler ', '')};
        commit('setState', {field: 'compiler', data});
      });
    },
    setCompiled({commit}, source) {
      Vue.axios.post(`${serverIP}/libra/compile`, source).then((response) => {
        commit('setState', {field: 'compiled', data: response.data});
      });
    },
  },
});
