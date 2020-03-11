<template>
  <div id="category">
    <el-button type="danger" @click="add_first({type:'category_first_add'})">添加一级分类</el-button>
    <hr class="hr-e9"/>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="categroy-wrap">
           <div class="category" v-for="item in category.msg" :key="item.id">
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{ item.category_name }}
                <div class="button-group">
                  <el-button size="mini" type="danger" @click="edit_category({ data : item,type:'category_first_edit'})" round>编辑</el-button>
                  <el-button size="mini" type="success" round>添加子级</el-button>
                  <el-button size="mini" round @click="delete_category(item.id)">删除</el-button>
                </div>
                </h4>
              <ul v-if="item.children">
                <li v-for="children_item in item.children" :key="children_item.id">
                  {{ children_item.category_name }}
                  <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" round >删除</el-button>
                </div>
                </li> 
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="130px" class="from-wrap" >
            <el-form-item label="一级菜单名称" v-if="category_first_input">
              <el-input v-model="form.categoryName"  :disabled="category_first_disabled"></el-input>
            </el-form-item>
            <el-form-item label="二级菜单名称" v-if="category_second_input">
              <el-input v-model="form.secCategoryName" :disabled="category_second_disabled"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="danger" @click="submit" :loading="sub_btn_loading" :disable="sub_btn_disable">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive,ref,onMounted } from '@vue/composition-api';
import { global } from "@/utils/global.js";
import { AddFirstCategory,GetCategory,DeleteCategory,EditCategory } from "@/api/news";
export default{
  name:"category",
  setup(props,{root,refs}){
    // global
    const { confirm } = global();
    const form = reactive({
      categoryName:"",
      secCategoryName:""
    })
    const category = reactive({
      msg:[],
      current:[]
    })
    /**
     * ref
     */
    const category_first_input = ref(true);
    const category_second_input = ref(true);
    const sub_btn_loading = ref(false);
    const category_first_disabled = ref(true);
    const category_second_disabled = ref(true);
    const sub_btn_disable = ref(true);
    const delete_id = ref("");
    const sub_btn_type = ref("");
    /**
     * methods
     */
    // 提交*********************
    const submit = ()=>{
      if(sub_btn_type.value == "category_first_add"){
        addFirstCategory();
      }
      if(sub_btn_type.value == "category_first_edit"){
        editFirstCategory();
      }
    }
    const addFirstCategory = ()=>{
      if(!form.categoryName){
        root.$message({
          message:"不能为空",
          type:"error"
        });
        return false;
      }
      // 改变按钮状态
      sub_btn_loading.value = true;
      AddFirstCategory({ categoryName: form.categoryName }).then(response =>{
        if(response.data.resCode === 0){
          root.$message({
            message:"请求成功",
            type:"success"
          });
          category.msg.push(response.data.data);
        }
        sub_btn_loading.value = false;
      }).catch(error =>{
        sub_btn_loading.value = false;
      })
    }
    // 删除*******************
    const delete_category = (categoryID)=>{
      delete_id.value = categoryID;
      confirm({
        content:"确认删除当前信息，删除后无法恢复！！！",
        tip:"警告",
        fn:delete_category_confirm,
        catch_fn:()=>{delete_id.value = ""; },
        id:""
      })
    }
    // 编辑*******************
    const edit_category = (params)=>{
      sub_btn_type.value = params.type;
      category_first_disabled.value = false;
      category_second_input.value = false;
      sub_btn_disable.value = true;
      console.log(params.type);
      // 一级分类的名称
      form.categoryName = params.data.category_name;
      // 存储当前对象数据
      category.current = params.data;
    }
    const editFirstCategory = ()=>{
      if(category.current.length == 0){
        root.$message({
          message:"未选择分类",
          type:"error"
        })
        return false;
      }
      let requestData = {
        id:category.current.id,
        categoryName:form.categoryName
      }
      EditCategory(requestData).then(response =>{
        let responseData = response.data;
        root.$message({
          message:responseData.message,
          type:"success"
        })
        category.current.category_name = responseData.data.data.categoryName;
        // 清空输入框
        form.categoryName = "";
        category.current = []; 
      }).catch({

      })
    }
    const delete_category_confirm = ()=>{
      DeleteCategory({ categoryId:delete_id.value }).then(response=>{
        let index = category.msg.findIndex( msg => msg.id == delete_id.value);
        category.msg.splice(index,1);
      }).catch(error=>{

      })
    }
    /**
     * reactive
     */
    // 添加*******************
    const add_first = (params)=>{
      sub_btn_type.value = params.type;
      category_first_input.value = true;
      category_second_input.value = false;
      category_first_disabled.value = false;
      sub_btn_disable.value = false;
      console.log(params.type);
    }
    const get_category = ()=>{
      GetCategory({}).then(response=>{
        let data = response.data.data.data
        category.msg = data;
      }).catch(error=>{

      }); 
    }
    /**
     * 挂在完成 生命周期函数
     */
    onMounted(()=>{
      get_category()
    })
    return{
      // ref
      category_first_input,
      category_second_input,
      category_first_disabled,
      category_second_disabled,
      sub_btn_loading,
      sub_btn_disable,
      sub_btn_type,
      // reactive
      form,
      category,
      // metods
      submit,
      add_first,
      delete_category,
      edit_category,
      delete_category_confirm
    }
  }
}
</script>
<style lang="scss" scoped> 
@import "../../styles/config.scss";
.categroy-wrap{
  div:first-child{ &:before{ top:20px; }}
  div:last-child{ &:before{ bottom: 20px; }}
}
.menu-title{
  padding-left:22px;
  line-height:44px;
  background-color: #f3f3f3; 
  border-radius:4px;
}
.category{
  position: relative;
  line-height:44px;
  cursor:pointer;
   &:before{
      content:"";
      position: absolute;
      left:23px;
      top:0px;
      bottom:0px;
      width:32px;
      border-left:1px dotted #000;
    }
  h4{
    padding-left:40px;
    position:relative;
  }
  .svg-icon{
    position:absolute;
    left:16px;
    top:15px;
    background:#fff;
    font-size:15px;
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
  li{
    position: relative;
    padding-left:36px;
    margin-left:24px;
    &:before{
      content:"";
      position: absolute;
      left:0;
      top:22px;
      width:32px;
      border-bottom:1px dotted #000;
    }
  }
  li,h4{
    @include webkit(transition,all .5s ease 0s);
    &:hover{ 
      background-color: #f3f3f3; 
      border-radius:4px;
      .button-group{display:block;}
    } 
  }
}
.button-group{
  position:absolute;
  right:11px;
  z-index:2;
  top:-1px;
  display:none;
  button{ font-size:12px;}
}
.from-wrap{ 
  width:410px;
  padding-top:26px;
}
.hr-e9{
// 计算属性 运算符必须在中文情况下输入
  width:calc(100% + 60px );
  // margin-right:-30px;
  margin-left:-30px;
  border:none;
  margin-top:30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9e9e9;
}
</style>