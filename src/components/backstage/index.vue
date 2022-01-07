<style scoped>
  .layout-con {
    height: 100%;
    width: 100%;
  }

  h2 {
    color: #000000;
    float: left;
  }

  .exit {

    float: right;
  }

</style>
<template>
<!-- <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider hide-trigger >
        <Menu :active-name="sidebarItem" theme="dark" width="auto" @on-select="changeSidebar" />
          <MenuItem name="1-1">
          <Icon type="md-list-box"></Icon>
          <span>数据总览</span>
          </MenuItem>
          <MenuItem name="servertab">
          <Icon type="ios-desktop"></Icon>
          <span>主机信息</span>
          </MenuItem>
          <MenuItem name="1-3">
          <Icon type="md-notifications" />
          <span>警报处理</span>
          </MenuItem>
        </Menu>
      </Sider>

    </Layout>
  </div> -->

  <div class="layout">
      <Layout :style="{minHeight: '100vh'}">

        <Sider hide-trigger >
          <Menu
            @on-select="changeSidebar"
            :active-name="sidebarItem"
            theme="dark"
            width="auto"
            :open-names="['center']"
          >
            <Submenu name="center">
              <template slot="title">
                <Icon type="md-funnel" />
                数据中心
              </template>
              <MenuItem name="serverinfo">
                <Icon type="md-list-box"></Icon>
                <span>数据总览</span>
                </MenuItem>
              <MenuItem name="servertab">
                <Icon type="ios-desktop"></Icon>
                <span>主机信息</span>
              </MenuItem>
              <MenuItem name="alarmprocessing">
                <Icon type="md-notifications" />
                <span>警报处理</span>
              </MenuItem>
            </Submenu>
            
          </Menu>
        </Sider>

       <Layout>
         <Header :style="{background: '#cecece', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
           <h2>VPS监控 - 后台管理系统</h2>
           <div class="exit">
             <Button shape="circle" icon="ios-power" @click="tknull">退出登录</Button>
           </div>
         </Header>
         <Content :style="{padding: '0 16px 16px',margin: '16px 0'}">

           <Card>
            <router-view></router-view>
           </Card>
         </Content>
       </Layout>
      </Layout>
    </div>


</template>
<script>
  export default {
    name: 'index',
    data() {
      return {
        sidebarItem: ""
      }
    },

    methods: {
      tknull() {
        localStorage.removeItem("Authorization");
        this.$router.push('/');
      },
      changeSidebar(name) {
            this.sidebarItem = name;
            this.$router.push({
              name: name,
            });
          }
    },
    mounted() {
        this.sidebarItem = this.$router.name;
      },


  }
</script>
