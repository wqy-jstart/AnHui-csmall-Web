<style>
body {
  background-image: url("../../public/loginImage.png");
  background-size: cover; /*设置封面*/
}

.layout-header {
  background: rgba(255, 255, 255, 0.5);
  color: #fff;
  text-align: left;
  line-height: 60px;
}

a {
  text-decoration: none;
  font-size: 25px;
}

.layout-main {
  text-align: center;
}
</style>
<template>
  <div>
    <el-container>
      <el-header class="layout-header">
        <div class="block">
          <h1 style="color: black;font-size: 35px">皖派土特产网络超市
            <span style="float: right">
              <a href="/login">User Login</a>
          </span>
          </h1>
        </div>
      </el-header>
      <el-main class="layout-main">
        <el-card style="width: 500px;height: 360px;margin: 300px auto;
                background-color: rgba(255,255,255,0.3)">
          <!--label-width设置用户名这一列所占的宽度,如果不设置会显示在上面-->
          <h1>Admin Login</h1>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px"
                   style="width: 400px;margin: 40px auto">
            <el-form-item label="用户名" prop="username">
              <el-input type="username" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="ruleForm.rem">记住用户名和密码</el-checkbox><!--rem默认为false,勾选后为true-->
            </el-form-item>
            <el-form-item>
              <el-button style="position: relative;right: 30px"
                         type="primary" @click="submitForm('ruleForm')">登录
              </el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>

export default {
  data() {
    return {
      ruleForm: {// 初始化ruleForm对象
        username: '',
        password: '',
        rem: false//rem默认为false,勾选后为true
      },
      rules: { // 制定规则
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ],
      },
    };
  },
  methods: {
    // 处理登录事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.GLOBAL.passportUrl+'admins/login';
          let formData = this.qs.stringify(this.ruleForm)
          this.axios.post(url, formData).then((response) => {
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              let ruleFormString = JSON.stringify(this.ruleForm.username);
              localStorage.setItem('ruleFormToAdmin', ruleFormString);
              location.href = "/";
              let jwt = responseBody.data;
              console.log('登陆成功,服务器响应JWT:' + jwt);
              localStorage.setItem('jwtToAdmin', jwt);
              console.log('已经将JWT保存到localStorage中')
              this.$message({
                message: '登录成功,欢迎管理员回来!',
                type: 'success'
              });
            } else {
              this.$message.error(responseBody.message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>