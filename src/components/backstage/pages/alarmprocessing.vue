<template>
  <Table border :columns="columns2" :data="data3" :disabled-hover="true">

    <template slot-scope="{ row, index }" slot="servername">
      <Tag size="large" color="warning">{{row.servername}}</Tag>
    </template>


    <template slot-scope="{ row, index }" slot="runningstate">
      <Tag type="dot" :color="row.tagcolor">{{ row.runningstate }}</Tag>
    </template>

    <template slot-scope="{ row, index }" slot="ishint">
      <Button type="error" long @click="posthint(index)" >更新状态为已经处理</Button>
    </template>

  </Table>

</template>

<script>
  export default {
    name: "alarmprocessing",
    data() {
      return {
        columns2: [{
            title: '主机名',
            slot: 'servername',
            align: 'center'
          },
          {
            title: '运行状态',
            slot: 'runningstate',
            align: 'center'
          },
          {
            title: '最后更新数据时间',
            key: 'lasttime',
            align: 'center'
          },
          {
            title: '是否标记为已处理',
            slot: 'ishint',
            align: 'center'
          }
        ],
        data3: [],
      }
    },
    created() {
      this.getserver();
    },
    methods: {
      getserver() {
        this.$axios.get('http://api.yux.ink/server/txztcx/').then(response => {
          this.data3 = response.data;
          // console.log(this.data2)
        })
      },
      posthint(index){
        let token1 = localStorage.getItem("Authorization");//获取本机储存的token
        let data1 =
          {'servername':this.data3[index].servername}
        ;
        // this.$Message.info('开始状态' + ishint + '索引' + index);
        // console.log(data1);
        this.$axios({
          method: 'post',
          url: 'http://api.yux.ink/server/srztgx.php',
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
            this.$Message.error('状态更新失败！请稍后重试！');
          }
        })
      }
    }
  };
</script>

<style scoped>
  .tishi{
    background-color: #ff9900;
  }
</style>
