<template>
  <div id="nav">
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo">
          <h2>VPS监控</h2>
        </div>
        <div class="layout-nav">
          <MenuItem name="home" to="/">
          <Icon type="md-home"></Icon>
          首页
          </MenuItem>
          <MenuItem name="login"  to="/login">
          <Icon type="md-contact"></Icon>
          登录
          </MenuItem>
          <MenuItem name="about">
          <Icon type="ios-analytics"></Icon>
          关于
          </MenuItem>
          <MenuItem name="boke" to="https://yux.ink" target="_blank">
          <Icon type="ios-paper"></Icon>
          博客
          </MenuItem>
        </div>
      </Menu>
    </Header>
  </div>
</template>

<script>
  export default{
      data(){
        return{

        }
      }
  }
</script>

<style scoped>
  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;

  }

  .layout-logo h2 {
    text-align: center;
    color: #ffffff;
    position: relative;
    top: -15px;
    left: 0px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

</style>
