<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{ item.txt }}</li>
      </ul>
      <!-- 表单开始 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input type="text" id="username" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input type="password" id="password" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>
          <el-form-item prop="passwords" class="item-from" v-show="model === 'register'">
            <label for="passwords">重复密码</label>
            <el-input type="password" id="passwords" v-model="ruleForm.passwords" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label for="code">验证码</label>
          <el-row :gutter="11">
            <el-col :span="15"><el-input id="code" v-model="ruleForm.code" maxlength="6" minlength="6"></el-input></el-col>
            <el-col :span="9"><el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button></el-col>
          </el-row>   
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block" :disabled="loginButtonStatus">{{ model === "login" ? "登录" :"注册" }}</el-button>
        </el-form-item>
      </el-form>
     </div>
    </div>
</template>
<script>
import sha1 from "js-sha1";
import { Message } from "element-ui";
import { GetSms,Register,Login } from "@/api/login.js";
import { reactive,ref,isRefs,onMounted} from "@vue/composition-api";
import { stripscript,validatePass,validateEmail,validateVCode } from "@/utils/validate";
export default {
  name:"login",
  setup(props,{ refs,root }){
    // 用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if(validateEmail(value)){
        callback(new Error("用户名格式不正确"));
      } else{
        callback();
      }
    };
    // 验证密码   
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      // console.log(stripscript(value))
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6-20位数字加字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码   
    let validatePasswords = (rule, value, callback) => {
      // 如果model=== login 直接通过
      if(model.value === "login"){  callback();}
      // 过滤后的数据
      // console.log(stripscript(value))
      ruleForm.passwords = stripscript(value)
      value = ruleForm.passwords
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    //  验证码
    let validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'));
      }else if(validateVCode(value)){
        return callback(new Error('验证码格式有误'));
      }else{
        callback();
      }
    }
    /**
     * 声明数据
     */
    // 这里面放data数据 生命周期，自定义函数
    const menuTab = reactive([
      { txt : "登录" , current : true , type : "login"},
      { txt : "注册" , current : false , type : "register"}
    ])
    // 模块值
    const model = ref("login");
    // 登录按钮禁用
    const loginButtonStatus = ref(true);
    // 验证码按钮禁用
    const codeButtonStatus = reactive({
      status : false,
      text:"获取验证码"
    })
    // 倒计时
    const timer = ref(null);
    // 表单绑定数据
    const ruleForm = reactive ({
      username: "",
      password: "",
      passwords: "",
      code: ""
    })
    const rules = reactive ({
      username: [
        { validator: validateUsername, trigger: "blur" }
      ],
      password: [
        { validator: validatePassword, trigger: "blur" }
      ],
      passwords: [
        { validator: validatePasswords, trigger: "blur" }
      ],
      code: [
        { validator: validateCode, trigger: "blur" }
      ]
    })
    /**
     *声明函数 
      */
    const toggleMenu = (data =>{
      menuTab.forEach((ele,index) => {
          ele.current = false;
      });
      // 高光
      data.current = true;
      // 改变注册登录
      model.value = data.type;
      // 重置表单
      // refs["ruleForm"].resetFields();
      refs.loginForm.resetFields();
      // 清除验证码bug
      clearCountDown();
    })
    /**
     * 获取验证码
     */
    const getSms = (()=>{
      if(ruleForm.username == ""){
        root.$message.error("邮箱不能为空！");
        return false;
      }
      if(validateEmail(ruleForm.username)){
        root.$message.error("邮箱格式有误！");
        return false;
      }
      let requestDate = {
        username: ruleForm.username , 
        module: model.value
      }
      // 修改获取验证码按钮状态
      codeButtonStatus.status = true;
      codeButtonStatus.text = "发送中";
      //延时
      setTimeout(()=>{
        GetSms(requestDate).then(response =>{
          console.log(12);
          let data = response.data;
          root.$message({
            message:data.message,
            type:"success"
          });
          // 注册按钮启用
          loginButtonStatus.value = false;
          // 启用定时器计时
          countDown(60);
        }).catch(error =>{
          console.log(error);
        });
      },3000);
    });
    // 提交表单
    const submitForm = (formName => {
      refs[formName].validate((valid) => {
        if (valid) {
          // 表单验证通过
          model.value === "login" ? login():register();
          // if(model.value === "login"){
          //   login();
          // }else{
          //   register();
          // }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    });
    /**
     * 登录
     */
    const login = (()=>{
      let requestData = {
        username :ruleForm.username,
        password:sha1(ruleForm.password),
        code:ruleForm.code,
        module:'login' 
      };
      Login(requestData).then(response =>{
        console.log("login")
      }).catch(error =>{

      });
    });
    /**
     * 注册
     */
    const register = (()=>{
      let requestData = {
        username :ruleForm.username,
        password:sha1(ruleForm.password),
        code:ruleForm.code,
        module:'register' 
      };
      Register(requestData).then(response =>{
        console.log("register");
        let data = response.data;
        root.$message({
          message:data.message,
          type:"success"
        });
        // 模拟注册成功
        toggleMenu(menuTab[0]);
        clearCountDown();
      }).catch(error => {

      });
    });
    /**
     * 倒计时
     */
    const countDown = ((number)=>{
      // 判断计时器是否存在  是则清除
      console.log(timer.value);
      if(timer.value){ clearInterval(timer.value) } 
      let time = number;
      timer.value = setInterval (()=>{
        time--;
        if(time === 0){
          clearInterval(timer.value);
          codeButtonStatus.status = false;
          codeButtonStatus.text = '再次发送';
        }else{
          codeButtonStatus.text = `倒计时${time}秒`;
        };
      },1000);
    });
    /**
     * 清除倒计时
     */
    const clearCountDown = (()=>{
      // 还原验证码按钮状态
      codeButtonStatus.status = false;
      codeButtonStatus.text = "获取验证码"
      // 清除倒计时
      clearInterval(timer.value);
    });
  /**
   * 生命周期
   */
  // 挂载完成
  onMounted(()=>{
   console.log(process.env.NODE_ENV)
  });
  return {
    menuTab,
    model,
    ruleForm,
    loginButtonStatus,
    codeButtonStatus,
    rules,
    toggleMenu,
    submitForm,
    getSms,
  }
}
}
</script>
<style lang="scss" scoped>
  #login{
    height: 100vh;
    background-color: #344a5f;
  }
  .login-wrap{
    width: 330px;
    margin: auto;
  }
  .menu-tab{
    text-align: center;
    li{
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current{
      background-color: rgba(0,0,0,.1)
    }
  }
  .login-form{
    margin-top: 29px;
    label{
      display: block;
      margin-bottom: 3px;
      font-size: 14px;
      color: #fff;
    }
  }
  .item-from{margin-bottom: 13px;}
  .block{
    display: block;
    width: 100%;
    }
  .login-btn{
    margin-top:19px; 
  }
</style>