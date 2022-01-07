<template>
  <Row class="isrow">
    <Col span="6" offset="2">

    <Card :bordered="false" :dis-hover="true" class="col1">
      <p slot="title">主机总数</p>
      <p><h1>{{datas.zonshu}}</h1>
      </p>
    </Card>



    </Col>
    <Col span="6" offset="2">
      <Card :bordered="false" :dis-hover="true" class="col1">
        <p slot="title">在线总数：</p>
        <p><h1>{{ datas.zaixian }}</h1>
        </p>
      </Card>
    </Col>
    <Col span="6" offset="2">
      <Card :bordered="false" :dis-hover="true" class="col1">
        <p slot="title">掉线总数：</p>
        <p><h1>{{ datas.diaoxian }}</h1>
        </p>
      </Card>
    </Col>
  </Row>
</template>
<script>
  export default {
    name: "serverinfo",
    data(){
      return{
        datas:[]
      }
    },
    created() {
      this.getserver();
    },
    methods: {
      getserver() {
        this.$axios.get('http://api.yux.ink/server/srtotal/').then(response => {
          this.datas = response.data;
          // console.log(this.datas)
        })
      }
    }
  };
</script>

<style scoped>
.isrow{
  text-align: center;

}
.col1{
  background-color: #c5c8ce;
}
</style>
