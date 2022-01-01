<template>
  <div class="layout" id="home">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <h2>VPS监控</h2>
          </div>
          <div class="layout-nav">
            <MenuItem name="home" to="/1">
            <Icon type="md-home"></Icon>
            首页
            </MenuItem>
            <MenuItem name="login">
            <Icon type="md-contact"></Icon>
            登录
            </MenuItem>
            <MenuItem name="about">
            <Icon type="ios-analytics"></Icon>
            关于
            </MenuItem>
            <MenuItem name="boke">
            <Icon type="ios-paper"></Icon>
            博客
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '88px 20px 0',  minHeight: '1300px'}">
        <Row :gutter="12">
          <Col :xs="24" :sm="12" :md="12" :lg="6" style="margin-bottom: 20px;" id="serverinfo" v-for="(server,index) in servers" :key="index">
          <div style="text-align: center;">
            <Card :bordered="true">
              <h3 slot="title">{{ server.servername }}</h3>
              <div>运行状态：
                <Tag type="dot" :color="server.tagcolor">{{server.runningstate}}</Tag>
              </div>

              <Divider dashed />

              <div>
                机器在线时间：
                <Tag color="cyan" size="medium">{{server.uptime}}</Tag>
                <Divider dashed />
                CPU核心数：
                 <Tag color="lime" size="medium">{{server.cpunum}}核</Tag>
              </div>

              <Divider dashed />

              <div>
                本机IP地址：
                <Tag color="volcano">{{server.ip}}</Tag>
              </div>

              <Divider dashed />
              <div>
                <!-- 这里获取的cpu占用率是string，要转成number -->
                CPU占用率：
                <Progress :percent="parseInt(server.cpu)" :stroke-width="30" status="active" text-inside />

              </div>

              <div>
                内存占用率：
                <Progress :percent="parseInt(server.memory)" :stroke-width="30" status="success" text-inside />

              </div>
              <Divider dashed />
              <div>
                数据最后更新时间：
                <Tag color="geekblue">{{server.lasttime}}</Tag>
              </div>
            </Card>
          </div>
          </Col>
        </Row>
      </Content>
      <Footer class="layout-footer-center">
        <h3>2020-2021 &copy; Suwang</h3>
      </Footer>
    </Layout>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name:'home',
    data(){
      return{
        //放数据的数组
        servers:[]
      }

    },
    methods:{
      getserver(){
        this.$axios.get('http://api.yux.ink/server/srget.php').then(response => (this.servers = response.data))
      }
    },
    created() {
      this.getserver();
    }
  }
</script>
<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

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

  .layout-footer-center {
    text-align: center;
    background-color: #515a6e;
  }

  .layout-footer-center h3 {
    color: #ffffff;
  }

  span {
    display: inline-block;
    width: 70px;
    height: 20px;
  }
</style>
