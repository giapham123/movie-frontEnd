import * as actions from './actions'

const state = {ilogin:false}
const mutations = {
    LOGIN_FLAG: (state, flag) => {
        state.ilogin = flag;
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}; 