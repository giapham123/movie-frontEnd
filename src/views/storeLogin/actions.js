import auth from '../auth'

export const loginResult = async (dispatch , param) => {
   const result = await auth.$http.post("/auth", param);
   auth.setToken(result.data.token)
   return result;
}

export const clearToken = () => {
   auth.clearToken();
}

export const changeState = ({ commit }, flag) => {
   commit('LOGIN_FLAG', flag)
}