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

export const saveComments = async (dispatch , param) => {
   const result = await auth.$http.post("/movie/comment", param);
   return result;
}

export const getComments = async (dispatch , param) => {
   const result = await auth.$http.post("/movie/getComment", param);
   return result;
}