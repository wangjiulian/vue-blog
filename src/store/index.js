import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutatios'

Vue.use(Vuex)

const state = {
    test1: '',
    test2: '',
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})