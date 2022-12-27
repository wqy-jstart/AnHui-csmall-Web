<style>
header a {
  text-decoration: none;
  color: #6c6c6c;
  font-size: 18px;
}
a{
  text-decoration: none;
  color: #1f1e1e;
}
.el-table .el-table__cell {
  padding: 0;
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

.my-label {
  background: #E1F3D8;
}

.my-content {
  background: #FDE2E2;
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
        <span style="float: right;margin-right: 60px;margin-top: 40px">
          <el-button @click="addressAdd()">添加收货地址</el-button>
        </span>
        <div style="height: 20px"></div>
        <div style="width: 1100px;border: 1px solid #877c7c">
          <el-row :gutter="12" style="margin-top: 10px;margin-left: 10px" v-for="add in address">
            <el-col :span="20">
              <el-card shadow="hover">
                <div style="float: right;margin-bottom: 10px">
                  <el-button type="danger" size="mini"
                             @click="openDeleteConfirm(add.id)">删除</el-button>
                </div>
                <div style="float: right;margin-bottom: 10px;margin-right: 10px">
                    <el-button type="primary" size="mini"
                               @click="handleEdit(add.id)">修改</el-button>
                </div>
                <el-descriptions title="收货信息" :column="3" border>
                  <el-descriptions-item content-class-name="my-content" label="收件人姓名:">{{add.name}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="my-label" label="收货手机号:">{{add.number}}</el-descriptions-item>
                  <el-descriptions-item label="收货地址:">{{add.info}}</el-descriptions-item>
                  <el-descriptions-item label="收货详细地址:">{{add.detailInfo}}</el-descriptions-item>
                  <el-descriptions-item label="备注标签:">
                    <el-tag size="small">{{add.tags}}</el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </el-card>
            </el-col>
          </el-row>
        </div>
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

    <!-- 弹出的编辑收货地址的对话框 -->
    <el-dialog title="修改收货地址" width="40%" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="收件人姓名:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收件人手机号:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.info" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货详细地址" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.detailInfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货备注标签:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.tags" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit()">修 改</el-button>
      </div>
    </el-dialog>

    <!-- 弹出的添加收货地址的对话框 -->
    <el-dialog title="添加收货地址"  width="35%" :visible.sync="dialogFormVisibleToAdd">
      <el-form :model="ruleFormToAdd" :rules="rules" ref="ruleForm">
        <el-form-item label="收件人姓名:" :label-width="formLabelWidth" prop="name">
          <el-input v-model="ruleFormToAdd.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收件人手机号:" :label-width="formLabelWidth" prop="number">
          <el-input v-model="ruleFormToAdd.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址:" :label-width="formLabelWidth" prop="info">
          <el-input v-model="ruleFormToAdd.info" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货详细地址" :label-width="formLabelWidth" prop="detailInfo">
          <el-input v-model="ruleFormToAdd.detailInfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货备注标签:" :label-width="formLabelWidth" prop="tags">
          <el-input v-model="ruleFormToAdd.tags" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleToAdd = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd()">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "",
      size: 'medium',
      username:'',
      user: {
      },
      address:[],
      dialogFormVisible: false,
      ruleForm: {
        id: '',
        name: '',
        info:'',
        detailInfo:'',
        number:'',
        tags:'',
      },
      formLabelWidth: '120px',
      ruleFormToAdd:{
        userId:'',
      },
      dialogFormVisibleToAdd:false,
      rules: {
        name: [
          {required: true, message: '请输入收货人姓名:', trigger: 'blur'},
        ],
        number: [
          {required: true, message: '请输入收货人电话:', trigger: 'blur'},
          {min: 10, max: 11, message: '长度在 10 到 11 位数字', trigger: 'blur'}
        ],
        info: [
          {required: true, message: '请输入收货地址:', trigger: 'blur'},
        ],
        detailInfo: [
          {required: true, message: '请输入收货详细地址:', trigger: 'blur'},
        ],
        tags: [
          {required: true, message: '请输入收货备注标签:', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    openAddress(){
      location.href = '/user/address?id='+this.user.id;
    },
    addressAdd(){
      this.dialogFormVisibleToAdd = true;
    },
    toCart(){
      location.href = '/user/shoppingCart?id='+this.user.id;
    },
    submitAdd(){
      this.ruleFormToAdd.userId = this.user.id;
      let url = this.GLOBAL.productUrl+'addresses/insert';
      console.log('url:' + url);
      let formData = this.qs.stringify(this.ruleFormToAdd);// 将修改的数据转换为formData格式
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToUser')
            }
          }).post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '添加收货信息成功!'
          });
          this.dialogFormVisibleToAdd = false;
          this.loadAddressInfo();
          this.ruleFormToAdd = '';
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisibleToAdd = false;
          this.loadAddressInfo()
        }
      })
    },
    // 处理提交修改
    submitEdit() {
      let url = this.GLOBAL.productUrl+'addresses/update';
      console.log('url:' + url);
      let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToUser')
            }
          }).post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '修改收货信息成功!'
          });
          this.dialogFormVisible = false;
          this.loadAddressInfo()
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisible = false;
          this.loadAddressInfo()
        }
      })
    },
    // 处理修改前的数据
    handleEdit(id) {
      this.dialogFormVisible = true;
      this.ruleForm.id = id;
      let url = this.GLOBAL.productUrl+'addresses/' + id + '/selectById';
      console.log(url);
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.ruleForm = responseBody.data;
          this.dialogFormVisible = true;
        } else {
          this.$message.error(responseBody.message);
          this.loadAddressInfo()
        }
      })
    },
    handleDelete(id) {
      let url = this.GLOBAL.productUrl+'addresses/' + id + '/deleteById';
      console.log('url=' + url);
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToUser')
            }
          }).post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.$message.success("删除成功！")
          this.loadAddressInfo()
        }
      });
    },
    openDeleteConfirm(id) {
      let message = '此操作将永久删除该收货地址, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 加载本地的表单中的数据,存放到roleForm中去
    loadLocalRuleForm() {
      let localRuleFormString = localStorage.getItem('ruleFormToUser');
      if (localRuleFormString) {
        this.username = JSON.parse(localRuleFormString);
      }
    },
    loadUserDetail() {
      let url = this.GLOBAL.productUrl+'users/selectByUsername?username=' + this.username;
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        this.user = responseBody.data;
      })
    },
    loadAddressInfo(){
      let url = this.GLOBAL.productUrl+'addresses/selectByUserId'+location.search;
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.address = responseBody.data;
        }else {
          this.$message.error(responseBody.message);
        }
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadLocalRuleForm();
    this.loadUserDetail();
    this.loadAddressInfo()
  }
}
</script>