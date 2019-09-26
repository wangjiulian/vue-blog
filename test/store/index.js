import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutatios'

Vue.use(Vuex)

const state = {
    test1: '',
    test2: '',
    footer_status:'',
    socketConnect:false, //Socket是否连接
    sockerNewMsg:false, //是否收到新消息
    account:'',//账户
    exchangeAccount:'',//兑换账户信息
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})