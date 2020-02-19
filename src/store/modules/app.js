import { Login } from "@/api/login";
import { setToken,removeToKen,setUserName,getUserName } from "@/utils/app";
import { removeUserName } from "../../utils/app";
const state= {
  isCollapse:JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  to_ken:"",
  username:getUserName() || ""
}
const getters = {
  isCollapse:state => state.isCollapse,
}
const mutations = {
  SET_COLLAPSE(state){
    state.isCollapse = !state.isCollapse;
    // html5 本地存储
    sessionStorage.setItem("isCollapse",JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state,value){
    state.to_ken = value;
  },
  SET_USERNAME(state,value){
    state.username = value;
  }
}
const actions = {
  login({commit},requestData){
    return new Promise((resolve,reject) =>{
      // 接口
      Login(requestData).then((response) =>{
        let data = response.data.data;
        commit("SET_TOKEN",data.token);
        commit("SET_USERNAME",data.username);
        setToken(data.token);
        setUserName(data.username);
        resolve(response);
      }).catch(error =>{
        reject(error);
      })
    })
  },
  exit({commit}){
    return new Promise((resolve,reject) =>{
      removeToKen();
      removeUserName();
      commit("SET_TOKEN","");
      commit("SET_USERNAME","");
      resolve();
    })

  }
}
export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
};