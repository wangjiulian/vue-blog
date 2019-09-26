import{
    TEST1,
    TEST2,
} from './mutation-types'

import { store } from '../tool/mUtils'

export default{
    [TEST1](state,test1){
        state.test1 = test1
    },
    [TEST2](state,test2){
        state.test2 = test2
    }
}