<template>
  <div id="login" class="login">
    <v-nav></v-nav>
    <div id="login_card" class="login_card">


      <Row>
        <Col :xs="{ span: 20, offset: 2 }" :sm="{ span: 10, offset: 7 }" :md="{ span: 8, offset: 8 }"
          :lg="{ span: 6, offset: 9 }">
        <Card :bordered="false">
          <p slot="title">管理员登录</p>
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="用户名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
          </Form>
        </Card>

        </Col>


      </Row>
    </div>
    <v-footer></v-footer>
  </div>

</template>

<script>
  import navs from './nav.vue'
  import footers from './footer.vue'

  export default {
    name: "login",
    data() {
      return {
        formInline: {
          user: '',
          password: '',
          usertoken: ''
        },
        ruleInline: {
          user: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 6,
              message: '密码最少6位数',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    components: {
      "v-nav": navs,
      "v-footer": footers
    },
    methods: {
      loginsuccess() {
        this.$Notice.success({
          title: '登录成功！',
          desc: '登录成功，你的登录凭证将会一直保留，直到你手动注销登录！',
          duration: 3
        });
      },
      loginwarning(message) {
        this.$Notice.warning({
          title: '登录失败',
          desc: message,
          duration: 5
        });
      },

      handleSubmit() {
        //登录按钮被点击
        if (this.formInline.user === '' || this.formInline.password === '') {
          this.$Notice.error({
            title: '账号密码不能为空！',
            desc: "请输入正确的账号密码！",
            duration: 5
          });
        } else {
          this.$axios({
            method: 'post',
            url: 'http://api.yux.ink/server/userlogin.php',
            data: this.formInline
          }).then(res => {
            // console.log(res.data);
            this.Login_judgment(res);

            // console.log(this.formInline.uesrtoken);


          })
        }


      },
      Login_judgment(res) {
        //开始判断返回代码
        // 201:登录成功
        // 202：登录失败
        // 203：账号或者密码错误
        // 204:未知错误
        // 205：Token已过期
        // 206：Token有效，可以登录
        if (res.data.code == 201) {
          this.loginsuccess();
          this.formInline.uesrtoken = res.data.token;
          localStorage.setItem("Authorization", this.formInline.uesrtoken);
          this.$router.push('/index');
        } else {
          this.loginwarning(res.data.message);
        }
      },

    }

  }
</script>

<style scoped>
  .login {
    background-color: #eee;
  }

  .login_card {
    margin-top: 70px;
    margin-bottom: 50px;
    text-align: center;
  }
</style>
