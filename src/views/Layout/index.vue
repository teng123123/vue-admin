<template>
  <div id="layout">
    <LayoutHeader/>
    <LayoutMain/>
    <LayoutNav/>
  </div>
</template>
<script>
import LayoutHeader from "./Conmponents/Header";
import LayoutMain from "./Conmponents/Main";
import LayoutNav from "./Conmponents/Nav";
export default {
  name:"layout",
  components:{LayoutHeader,LayoutMain,LayoutNav},
  setup(){

  }
}
</script>
<style lang="scss" scoped>

</style>