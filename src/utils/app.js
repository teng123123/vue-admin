import cookie from 'cookie_js';

const adminToKen = "admin_toKen";
const usernameKey = "username";
export function getToken(){
  return cookie.get(adminToKen);
}
export function setToken(toKen){
  return cookie.set(adminToKen,toKen);
}
export function removeToKen(){
  return cookie.remove(adminToKen);
}
export function setUserName(value){
  return cookie.set(usernameKey,value);
}
export function getUserName(){
  return cookie.get(usernameKey);
}
export function removeUserName(){
  return cookie.remove(usernameKey);
}