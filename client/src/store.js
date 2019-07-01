import Vue from 'vue';
import Vuex from 'vuex';

import { createIframeClient } from 'remix-plugin';

Vue.use(Vuex);

const serverIP = process.env.VUE_APP_SERVER_IP;

export default new Vuex.Store({
  state: {
    remixclient: createIframeClient(),
    compiler: {},
    contractName: '',
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
    setCompiled({state, commit}, type) {
      Vue.axios({
        method: 'POST',
        headers: { 'content-type': 'text/html' },
        data: state.source,
        url: `${serverIP}/libra/compile?type=${type === 'module' ? 'm' : ''}`,
      }).then((response) => {
        commit('setState', {field: 'compiled', data: response.data});
      });
    },
  },
});
