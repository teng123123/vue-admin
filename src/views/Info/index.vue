<template>
  <div>
      <el-row :gutter="16">
        <el-col :span="4">
          <div class="label-wrap category">
            <label for="">类型:</label>
            <div class="warp-content">
              <el-select v-model="category_value" placeholder="请选择" style="width:100%">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="label-wrap date">
            <label for="" style="margin-left:-10px">日期:</label>
            <div class="warp-content">
              <el-date-picker style="width:100%"
                v-model="data_value"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']">
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
           <div class="label-wrap key_word">
            <label for="" style="margin-left:-10px">关键字:</label>
            <div class="warp-content">
             <el-select v-model="search_key" style="width:100%">
              <el-option v-for="item in search_option"
              :key="item.value"
              :value="item.value"
              :label="item.label"></el-option>
            </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <el-input v-model="search_keyWork" placeholder="请输入" style="width:100%"></el-input>
        </el-col>
         <el-col :span="2">
          <el-button type="danger" style="width:100%">搜索</el-button>
        </el-col>
        <el-col :span="2" style="opacity:0">.</el-col>
         <el-col :span="2">
          <el-button type="danger" style="width:100%" @click="dialog_info=true">新增</el-button>
        </el-col>
      </el-row>

  <!-- 表格数据 -->
  <el-table :data="table_data" border style="width: 100%;margin-top:20px; ">
    <el-table-column type="selection" width="40"></el-table-column>
    <el-table-column prop="title" label="标题" width="550"></el-table-column>
    <el-table-column prop="category" label="类别" width="100"></el-table-column>
    <el-table-column prop="date" label="日期" width="200"> </el-table-column>
    <el-table-column prop="user" label="管理员" width="100"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="danger" size="small" @click="delete_item">删除</el-button>
        <el-button type="success" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 底部分页 -->
  <el-row style="margin-top:10px;">
    <el-col :span="12" >
      <el-button @click="delete_all">批量删除</el-button>
    </el-col>
    <el-col :span="12">
      <el-pagination
       class="pull-right"
       background 
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :page-sizes="[10, 20, 30, 40]"
       layout="total,sizes,prev, pager, next,jumper"
       :total="100"></el-pagination>
    </el-col>
  </el-row>
  <!-- 新增弹窗 -->
  <DialogInfo :flag.sync="dialog_info"/>

  </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import { global } from "@/utils/global.js";
import { reactive,ref,watch } from '@vue/composition-api';
export default{
  name:"infoIndex",
  components:{ DialogInfo },
  setup(props,{root}){
    const { str,confirm } = global();
    watch(()=> console.log(str.value));
    /**
     * 数据
     */
    // 信息弹窗
    const dialog_info = ref(false);
    const search_key = ref("id");
    const category_value = ref("");
    const data_value = ref("");
    const search_keyWork = ref("");
    // 类型
    const options = reactive([
    {
      value:1,
      label:"xinxi1"
    },
    {
      value:2,
      label:"xinxi2"
    },
    {
      value:3,
      label:"xinxi3"
    }
    ]);
    // 表格数据
    const table_data = reactive ([
      {
        title:"这是第一个标题",
        category:"类型1",
        date: '2016-05-02',
        user: '管理员'
      },
      {
        title:"这是第二个标题",
        category:"类型2",
        date: '2016-05-02',
        user: '管理员'
      },
      {
        title:"这是第三个标题",
        category:"类型3",
        date: '2016-05-02',
        user: '管理员'
      },
      {
        title:"这是第四个标题",
        category:"类型4",
        date: '2016-05-02',
        user: '管理员'
      }
    ]);
    // 搜索关键字
    const search_option = reactive([
      { value:"id",label:"ID" },
      { value:"title",label:"标题" },
    ]);

    // 方法
    const handleSizeChange = (val)=>{

    }
    const handleCurrentChange = (val)=>{

    }
    const delete_item = ()=>{
      confirm({ 
        content:"确认删除当前信息，删除后无法恢复！！！",
        tip:"警告",
        fn:confirm_delete
      });
    } 
    const delete_all = ()=>{
      confirm({
        content:"确认删除选中的数据，删除后无法恢复！！！",
        fn:confirm_delete
      });
    }
    const confirm_delete = ()=>{
      console.log(1231231);
    }
    return {
      // ref
      data_value,
      search_key,
      search_keyWork,
      category_value,
      dialog_info, 
      // reactive
      table_data,
      options,
      search_option,
      // method
      handleSizeChange,
      handleCurrentChange,
      delete_item,
      delete_all,
      confirm_delete
    }
  }
}
</script>
<style lang="scss"> 
@import "../../styles/config.scss";
.label-wrap{
  &.category{ @include labelDom(left,60,40)}
  &.date{ @include labelDom(right,50,40) }
  &.key_word{ @include labelDom(right,55,40)}
}
</style>