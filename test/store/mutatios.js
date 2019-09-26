import{
    TEST1,
    TEST2,
    FOOTER_STATUS,
    SOCKET_CONNECT,
    SOCKET_NEW_MSG,
    ACCOUNT,
    EXCHANGE_ACCOUNT
} from './mutation-types'

import { store } from '../tool/mUtils'

export default{
    [TEST1](state,test1){
        state.test1 = test1
    },
    [TEST2](state,test2){
        state.test2 = test2
    },
    [FOOTER_STATUS](state,footer_status){
        state.footer_status = footer_status;
    },
    [SOCKET_CONNECT](state){
        console.log('socket连接成功');
        state.socketConnect = true;
    },
    [SOCKET_NEW_MSG](state,info){
        console.log(info)
        state.sockerNewMsg = info;
    },
    [ACCOUNT](state,account){
        state.account = account;
    },
    [EXCHANGE_ACCOUNT](state,exchangeAccount){
        state.exchangeAccount = exchangeAccount;
    }
   
}