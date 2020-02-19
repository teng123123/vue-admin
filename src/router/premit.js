import router from "./index";
import store from "../store/index";
import { getToken ,removeToKen,removeUserName} from '../utils/app';

const whiteRouter = ["/login"]; // indexOf 判断数组中是否有某个值
// 守卫路由
router.beforeEach((to,from,next)=>{
  console.log(to);
  if(getToken()){
    if(to.path === "/login"){
      removeToKen();
      removeUserName();
      store.commit("app/SET_TOKEN","");
      store.commit("app/SET_USERNAME","");
      next();
    }else{
      next();
    }
  }else{
    console.log("不存在");
    if(whiteRouter.indexOf(to.path) !== -1){
      next();
    }else{
      next("./login");
    }
  }
})
