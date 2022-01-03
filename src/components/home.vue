<template>
  <div class="layout" id="home">
    <Layout>
      <v-nav></v-nav>
      <Content style="margin-top: 20px;">
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
      <v-footer></v-footer>
    </Layout>
  </div>
</template>
<script>
  import axios from 'axios'
  import navs from './nav.vue'
  import footers from './footer.vue'
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
    },
    components:{
      "v-nav":navs,
      "v-footer":footers
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
  span {
    display: inline-block;
    width: 70px;
    height: 20px;
  }
</style>
