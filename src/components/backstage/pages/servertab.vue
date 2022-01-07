<template>

  <Content :style="{padding: '0 16px 16px'}">

      <div>

        <Table border :columns="columns1" :data="data2">

          <template slot-scope="{ row, index }" slot="memory">
            <Progress :percent="parseInt(row.memory)" :stroke-width="20" stroke-color="#bec84d" />
          </template>

          <template slot-scope="{ row, index }" slot="cpu">
            <Progress :percent="parseInt(row.cpu)" :stroke-width="20" stroke-color="#d6a9b7" />
          </template>

          <template slot-scope="{ row, index }" slot="runningstate">
            <Tag type="dot" :color="row.tagcolor">{{ row.runningstate }}</Tag>
          </template>

          <template slot-scope="{ row, index }" slot="isshow">
            <i-switch true-color="#13ce66" v-model="row.isshow" @on-change="change(row.isshow,index)" true-value="1"
              false-value="0" :before-change="handleBeforeChange"/></i-switch>


          </template>

        </Table>

      </div>

  </Content>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'servertab',
    data() {
      return {
        columns1: [{
            title: '主机名',
            key: 'servername'
          },
          {
            title: 'CPU核心数',
            key: 'cpunum'
          },
          {
            title: '内存占用率 | %',
            slot: 'memory'
          },
          {
            title: 'CPU占用率 | %',
            slot: 'cpu'
          },
          {
            title: '内网IP',
            key: 'ip'
          },
          {
            title: '运行时间',
            key: 'uptime'
          },
          {
            title: '标签颜色',
            key: 'tagcolor'
          },
          {
            title: '运行状态',
            // key: 'runningstate',
            slot: 'runningstate',
            align: 'center'
          },
          {
            title: '最后更新数据时间',
            key: 'lasttime'
          },
          {
            title: '是否在主页展示',
            slot: 'isshow',
            align: 'center'
          }
        ],

        data2: []


      };
    },
    created() {
      this.getserver();
    },
    methods: {
      getserver() {
        this.$axios.get('http://api.yux.ink/server/adget/').then(response => {
          this.data2 = response.data;
          // console.log(this.data2)
        })
      },

      change(isshow,index) {
        let token1 = localStorage.getItem("Authorization");//获取本机储存的token

        let data1 =
          {'servername':this.data2[index].servername,
          'isshow':isshow}
        ;
        // this.$Message.info('开始状态' + isshow + '索引' + index);
        // console.log(data1);
        this.$axios({
          method: 'post',
          url: 'http://api.yux.ink/server/modifyshow.php/',
          headers:{
            'Authorization':token1  //一个奇怪的坑。php端必须要接口header里的最后一句，这里必须要用Authorization
          },
          data: data1
        }).then(res => {
          // console.log(res);
          if(res.data.code == 205){
             this.$Message.error('登录已经过期，请重新登录！');
             this.tknull();

          }
          if(res.data.code == 206){
            this.$Message.info('状态更新成功！');
          }else{
            if(isshow == 0){
              this.data2[index].isshow = 1;
            }else{
              this.data2[index].isshow = 0;
            }
            this.$Message.error('状态更新失败！请稍后重试！');
          }
        })
      },
      handleBeforeChange() {
        return new Promise((resolve) => {
          this.$Modal.confirm({
            title: '切换确认',
            content: '您确认要修改此台服务器在主页的数据展示状态吗？',
            onOk: () => {
              resolve();
            }
          });
        });
      }
}
}
</script>

<style>
</style>
