<style>
header a {
  text-decoration: none;
  color: #6c6c6c;
  font-size: 18px;
}

.el-table .el-table__cell {
  padding: 0;
}

.el-descriptions-item__label.is-bordered-label {
  width: 120px;
  height: 50px;
}

/*悬停*/
a:hover {
  color: purple
}

/*点击*/
a:active {
  color: brown
}

.el-table .cell {
  white-space: nowrap; /*设置内容不换行*/
  text-overflow: ellipsis; /*有超出显示范围的文本时显示*/
}

.p_img:hover {
  position: relative;
  top: 5px;
  /*设置元素阴影: x偏移值 y偏移值 浓度(值越大越模糊) 范围 颜色*/
  box-shadow: 0 0 2px 3px #525050;
}

.el-footer {
  height: 60px;
  background-image: url('../../../../public/wave.png') !important;
}
</style>
<template>
  <div>
    <el-container>
      <!--顶栏部分-->
      <el-header height="150px">
        <div style="width: 1400px;margin: 0 auto">
          <img src="../../../../public/LogoToMall.png" style="width: 300px;height: 100px;vertical-align: middle" alt="">
          <a href="/index">首页</a>
          <el-divider direction="vertical"/>
          <a href="">热点资讯</a>
          <el-divider direction="vertical"/>
          <a href="">商家入驻</a>
          <el-divider direction="vertical"/>
          <a href="">社会招聘</a>
          <el-divider direction="vertical"/>
          <a href="javascript:void(0)" @click="toCart()">购物车</a>
          <el-divider direction="vertical"/>
          <a href="">帮助</a>
          <el-divider direction="vertical"/>
          <a href="/login">退出登录</a>
        </div>
        <!--导航菜单-->
        <div style="background-color: #cd331f;height: 62px">
          <span style="font-size: 32px;font-weight: bold;font-family: 幼圆;line-height: 62px;color: white;margin-left: 360px">我的商城</span><!--下标代表当前菜单-->
          <a href="/user/index">
            <span style="font-size: 17px;font-family: 微软雅黑;color: white;margin-left: 100px">首页</span>
          </a>
          <a href="/user/detail">
            <span style="font-size: 17px;font-family: 微软雅黑;color: white;margin-left: 100px">账户详情</span>
          </a>
          <a href="javascript:void(0)" @click="openAddress()">
            <span style="font-size: 17px;font-family: 微软雅黑;color: white;margin-left: 100px">我的收货地址</span>
          </a>
        </div>
      </el-header>
      <!--中间部分-->
      <el-main style="width: 1200px;margin: 0 auto">
        <el-avatar :size="90"
                   :src="user.avatar"/><span style="color: #191a1a;font-weight: bold">{{user.nickname}}</span>
        <el-button style="float: right;margin-top:30px" type="primary" size="medium" @click="handleEdit()">修改</el-button>
        <div style="height: 20px"></div>
        <el-descriptions :column="1" :size="size" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
             用户名:
            </template>
            {{user.username}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-female"></i>
              性别:
            </template>
            {{user.gender}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-watch-1"></i>
              年龄:
            </template>
            {{user.age}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              昵称:
            </template>
            {{user.nickname}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号:
            </template>
            {{user.phone}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-sunset"></i>
              电子邮箱:
            </template>
            {{user.email}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-school"></i>
              个性签名:
            </template>
            {{user.sign}}
          </el-descriptions-item>
        </el-descriptions>
      </el-main>
      <!--底栏部分-->
      <el-footer>
        <div class="el-footer">
        </div>
        <div style="background-color: #3f3f3f;padding:30px 0;text-align: center;color: #b1b1b1">
          <p>Copyright © 安徽信息科技有限公司版权所有 京ICP备12003770号-3 京公网安备 11010802029565号
          </p>
          <p>皖智在线WWW.WANZHI.CN 专注于IT网页技能开发</p>
          <p>涵盖多种开发教研体系，致力于打造权威的IT职业教育平台</p>
        </div>
      </el-footer>
    </el-container>

    <!-- 弹出的编辑用户的对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="用户昵称:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户年龄:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户头像:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.avatar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户性别:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="个性签名:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.sign" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      activeIndex: "",
      size: 'medium',
      username:'',
      dialogFormVisible: false,
      ruleForm: {
        id: '',
        name: '',
        description: '',
        sort: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    openAddress(){
      location.href = '/user/address?id='+this.user.id;
    },
    // 加载本地的表单中的数据,存放到roleForm中去
    loadLocalRuleForm() {
      let localRuleFormString = localStorage.getItem('ruleFormToUser');
      if (localRuleFormString) {
        this.username = JSON.parse(localRuleFormString);
        console.log(this.username)
      }
    },
    toCart(){
      location.href = '/user/shoppingCart?id='+this.user.id;
    },
    // 处理提交修改
    submitEdit() {
      this.ruleForm.id = this.user.id;
      let url = 'http://localhost:9900/users/update';
      let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
      console.log('formData=' + formData);
      this.axios.post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.dialogFormVisible = false;
          this.loadUserDetail();
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisible = false;
          this.loadUserDetail();
        }
      })
    },
    // 处理修改前的数据
    handleEdit() {
      this.ruleForm.id = this.user.id;
      this.dialogFormVisible = true;
      // this.ruleForm = album;
      let url = 'http://localhost:9900/users/' + this.ruleForm.id + '/selectById';
      console.log(url);
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.ruleForm = responseBody.data;
          this.dialogFormVisible = true;
        } else {
          this.$message.error(responseBody.message);
          this.loadUserDetail();
        }
      })
    },
    loadUserDetail() {
      let url = 'http://localhost:9900/users/selectByUsername?username=' + this.username;
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        this.user = responseBody.data;
      })
    },
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadLocalRuleForm();
    this.loadUserDetail();
  }
}
</script>