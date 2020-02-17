<template>
  <div id="header-wrap">
    <div class="pull-left header-icon"><svg-icon iconClass="nav" className="nav"></svg-icon></div>
    <div class="pull-right">
      <div class="user-info pull-left">
管理员
      </div>
      <div class="header-icon pull-left"><svg-icon iconClass="exit" className="exit"></svg-icon></div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap{
  position: fixed;
  top: 0;
  left: $navMenu;
  right: 0;
  height: 75px;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
  line-height: 75px;
}
.svg-icon{
  width: 1em;
  height: 1em;
  fill: currentColor;
}
.header-icon{
  padding: 0 32px;
  svg{
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info{
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
}
</style>