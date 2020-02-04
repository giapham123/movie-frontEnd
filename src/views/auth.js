
import axios from 'axios';

const HTTP_BASES = {
    baseURL: 'http://localhost:3000/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

class auth{
    constructor(){
        this.$http = axios.create(HTTP_BASES);

        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) this.setToken(token);
        
    }

    setToken(token) {
        this.$http.defaults.headers.common['Authorization'] = `${token}`;
        localStorage.setItem("ACCESS_TOKEN", token);
    }
    
    clearToken() {
        localStorage.clear();
    }
}

export default new auth();