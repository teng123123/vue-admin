<template>
   <svg :class="svgClass" aria-hidden="true">
     <use :xlink:href="iconName"></use>
     </svg>
</template>
<script>
import {ref,computed,onMounted } from '@vue/composition-api'
export default {
  name:"svgIcon",
  // props:['iconClass','className'],
  props:{
    iconClass:{
      type:String, // 定义接受的值
      default:''// 没传值的默认值
      // require:true // true 必须传值
    },
    className:{
      type:String,
      default:''
    }
  },
  setup(props){
    // console.log(props.iconClass);
    const msg = ref("全局组件");
    const iconName = computed(()=>`#icon-${props.iconClass}`)
    const svgClass = computed(()=>{
      if(props.className){
        return `svg-icon ${props.className}`;
      }else{
        return `svg-icon`;
      }
    })
    /**
     * 返回******************************************************
     */
    return {
      msg,
      iconName,
      svgClass
    }
  }
}
</script>
<style lang="sccs" scoped>
</style>