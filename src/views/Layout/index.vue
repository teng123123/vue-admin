<template>
  <div id="layout" :class="[menuState ? 'close':'open']">
    <LayoutHeader/>
    <LayoutMain/>
    <LayoutNav/>
  </div>
</template>
<script>
import LayoutHeader from "./Conmponents/Header";
import LayoutMain from "./Conmponents/Main";
import LayoutNav from "./Conmponents/Nav";
import { computed } from "@vue/composition-api";
export default {
  name:"layout",
  components:{LayoutHeader,LayoutMain,LayoutNav},
  setup(props,{ root }){
    const menuState = computed(()=> root.$store.state.app.isCollapse );

    return{
      menuState
    }
  }
}
</script>
<style lang="scss" scoped>

</style>