import Vue from 'vue'
import Vuex from 'vuex'

const weeklyModule = {
    state: {
        count: 100
    },
    getters: {},
    mutations: {
        SET_COUNT (state, status) {
            state.count = status
        }
    },
    actions: {
        addCount ({commit, state}, {num}) {
            commit('SET_COUNT', state.count + num);
        }
    }
}

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        weekly: weeklyModule
    }
});