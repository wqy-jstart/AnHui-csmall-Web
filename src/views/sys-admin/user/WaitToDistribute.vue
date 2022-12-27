<style>
header a {
  text-decoration: none;
  color: #6c6c6c;
  font-size: 18px;
}

a {
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
          <span
              style="font-size: 32px;font-weight: bold;font-family: 幼圆;line-height: 62px;color: white;margin-left: 360px">我的商城</span>
          <!--下标代表当前菜单-->
          <a href="javascript:void (0)" @click="toIndex()">
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
        <div style="height: 20px"></div>
        <div style="height: 800px;width: 1100px">
          <div style="width: 1100px;border: 1px solid #877c7c">
            <div style="height: 120px;background-color: #e4e6e7;overflow: hidden;border: 1px solid #877c7c">
              <div style="margin-top: 13px;margin-left: 20px">
                <el-avatar :size="90"
                           :src="user.avatar"/>
                <span style="color: #191a1a;font-weight: bold">{{ user.nickname }}</span>
              </div>
            </div>
            <div style="height: 50px;text-align: center;font-size: 25px;font-family: 微软雅黑">
              <div style="margin-top: 30px">
                <el-badge style="margin-right: 40px" :value="valueToPay" class="item">
                  <a href="javascript:void(0)" @click="toPay()">待付款</a>
                </el-badge>
                <el-divider direction="vertical"/>
                <el-badge style="margin-left: 40px;margin-right: 40px" :value="valueToDistribute" class="item"
                          type="primary">
                  <a href="javascript:void(0)" @click="toDistribute()">待发货</a>
                </el-badge>
                <el-divider direction="vertical"/>
                <el-badge style="margin-left: 40px;margin-right: 40px" :value="valueToTake" class="item" type="primary">
                  <a href="javascript:void(0)" @click="toTake()">待收货</a>
                </el-badge>
                <el-divider direction="vertical"/>
                <el-badge style="margin-left: 40px;margin-right: 40px" :value="4" class="item" type="success">
                  <a href="">待评价</a>
                </el-badge>
                <el-divider direction="vertical"/>
                <el-badge style="margin-left: 40px" :value="valueToBack" class="item">
                  <a href="javascript:void(0)" @click="toBack1()">退货</a>
                </el-badge>
              </div>
            </div>
          </div>
          <div style="width: 1100px;border: 1px solid #877c7c">
            <div style="width: 1100px;height: 60px;background-color: #e4e6e7">
              <h1 style="margin-left: 20px;line-height: 60px">待发货:</h1>
            </div>
            <div>
              <el-row :gutter="12" style="margin-top: 10px;margin-left: 10px" v-for="c in orderArr">
                <el-col :span="23">
                  <el-card shadow="hover" style="padding: 10px;height: 180px">
                    <div style="float: right;margin-bottom: 10px">
                      <el-button type="danger" size="mini"
                                 @click="toBack(c.spuId)">退货
                      </el-button>
                    </div>
                    <el-image
                        style="width: 120px; height: 120px;float: left"
                        :src="c.url"
                        fit="fill"></el-image>
                    <div style="width: 180px;height: 120px;margin-left: 10px;float:left">
                      <p style="font-size: 18px;color: #2f2c2a;font-weight: bold;margin-bottom: 5px">
                        商品名称:&nbsp{{ c.spuName }}</p>
                      <p style="font-size: 15px;color: #666;margin-bottom: 5px">物流名称:&nbsp 暂无</p>
                      <p style="font-size: 15px;color: #666;margin-bottom: 5px">数量:&nbsp{{ c.number }}</p>
                    </div>
                    <div style="width: 180px;float: left;margin-left: 50px">
                      <p style="font-size: 15px;color: #2f2c2a;margin-bottom: 5px;font-weight: bold">
                        收件人:{{ c.addressName }}</p>
                      <p style="font-size: 15px;color: #666;margin-bottom: 5px">收货地址:{{ c.info }}</p>
                      <p style="font-size: 15px;color: #666;margin-bottom: 5px">电话:{{ c.pnumber }}</p>
                      <p style="font-size: 15px;color: #666;float: left">标签:</p>
                      <el-tag size="mini">{{ c.tags }}</el-tag>
                    </div>
                    <div style="width: 90px;height: 100px;margin-left: 26px;float:left">
                      <p style="font-size: 20px;font-weight: bold">
                        ￥{{ c.totalAmount }}
                      </p>
                    </div>
                    <div style="width: 180px;height: 100px;margin-left: 30px;float:left">
                      <p style="font-size: 15px;color: #2f2c2a;font-weight: bold;margin-bottom: 5px">订单号:</p>
                      <div style="word-break: break-all;overflow: hidden">
                        <span style="font-size: 15px;color: #2f2c2a;margin-bottom: 5px">{{ c.outTradeNo }}</span>
                      </div>
                      <p style="font-size: 15px;color: #666;margin-bottom: 5px">流水号:</p>
                      <p style="font-size: 15px;color: #666;margin-bottom: 5px">{{ c.tradeNo }}</p>
                      <p style="font-size: 15px;color: #666;margin-bottom: 5px">付款时间:</p>
                      <p style="font-size: 15px;color: #666;margin-bottom: 5px">{{ c.time }}</p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
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

    <!-- 弹出的编辑订单的对话框 -->
    <el-dialog title="提交退货信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="商品名称:" :label-width="formLabelWidth">
          <span>{{ ruleForm.spuName }}</span>
        </el-form-item>
        <el-form-item label="收件人姓名:" :label-width="formLabelWidth">
          <span>{{ ruleForm.addressName }}</span>
        </el-form-item>
        <el-form-item label="收货地址:" :label-width="formLabelWidth">
          <span>{{ ruleForm.info }}</span>
        </el-form-item>
        <el-form-item label="电话号码:" :label-width="formLabelWidth">
          <span>{{ ruleForm.pnumber }}</span>
        </el-form-item>
        <el-form-item label="商品数量:" :label-width="formLabelWidth">
          <span>{{ ruleForm.number }}</span>
        </el-form-item>
        <el-form-item label="订单号:" :label-width="formLabelWidth">
          <span>{{ ruleForm.outTradeNo }}</span>
        </el-form-item>
        <el-form-item label="退货理由:" :label-width="formLabelWidth"  prop="backText">
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容:"
              v-model="ruleForm.backText">
          </el-input>
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
      orderArr: [],
      valueToPay: '',
      valueToDistribute: '',
      valueToTake: '',
      valueToBack:'',
      user: {
        id: '',
        avatar: '',
        nickname: '',
      },
      activeIndex: "",
      size: 'medium',
      username: '',
      ruleForm: {
        spuName: '',
        addressName: '',
        info: '',
        pnumber: '',
        number: '',
        outTradeNo: '',
        backText: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        backText: [
          {required: true, message: '请输入退货理由:', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    // 处理提交
    submitEdit() {
      if (this.ruleForm.backText == null){
        this.$message.warning("请输入退货理由!")
      }else {
        let url = this.GLOBAL.productUrl+'orders/updateToBack';
        console.log('url:' + url);
        let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
        console.log('formData=' + formData);
        this.axios.create({
          'headers': {
            'Authorization': localStorage.getItem('jwtToAdmin')
          }
        }).post(url, formData).then((response) => {
          let responseBody = response.data;
          if (responseBody.state == 20000) {
            this.$message({
              type: 'success',
              message: '退货成功!'
            });
            this.dialogFormVisible = false;
            this.loadOrderList();
          } else if (responseBody.state == 40900) {
            this.$message.error(responseBody.message);
          } else {
            this.$message.error(responseBody.message);
            this.dialogFormVisible = false;
            this.loadOrderList();
          }
        })
      }
    },
    toBack(spuId) {
      let message = '您确定要对id为[{'+spuId+'}]的商品进行退货处理吗?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormVisible = true;
        let url = this.GLOBAL.productUrl+'orders/' + this.user.id + '/' + spuId + '/selectById';
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwtToAdmin')
              }
            }).get(url).then((response) => {
          let responseBody = response.data;
          if (responseBody.state == 20000) {
            this.ruleForm = responseBody.data;
            this.dialogFormVisible = true;
          } else {
            this.$message.error(responseBody.message);
            this.loadOrderList();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退货'
        });
      })
    },
    toIndex(){
      location.href = "/user/index?id=" + this.user.id;
    },
    toBack1(){
      location.href = "/user/waitToBack?id=" + this.user.id;
    },
    toPay() {
      location.href = "/user/waitToPay?id=" + this.user.id;
    },
    toDistribute() {
      location.href = "/user/waitToDistribute?id=" + this.user.id;
    },
    toTake() {
      location.href = "/user/waitToTake?id=" + this.user.id;
    },
    openAddress() {
      location.href = '/user/address?id=' + this.user.id;
    },
    // 加载本地的表单中的数据,存放到roleForm中去
    loadLocalRuleForm() {
      let localRuleFormString = localStorage.getItem('ruleFormToUser');
      if (localRuleFormString) {
        this.username = JSON.parse(localRuleFormString);
        console.log(this.username)
      }
    },
    toCart() {
      location.href = '/user/shoppingCart?id=' + this.user.id;
    },
    loadUserDetail() {
      let url = this.GLOBAL.productUrl+'users/selectByUsername?username=' + this.username;
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        this.user = responseBody.data;
      })
    },
    loadOrderList() {
      let id = location.search.split("=")[1];
      let url = this.GLOBAL.productUrl+'orders/' + id + '/selectByUserIdToNoDib';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.orderArr = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    loadOrderCount() {
      let id = location.search.split("=")[1];
      let url = this.GLOBAL.productUrl+'carts/' + id + '/selectCount';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.valueToPay = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    loadOrderCountToNotDib() {
      let id = location.search.split("=")[1];
      let url = this.GLOBAL.productUrl+'orders/' + id + '/selectCountToNotDib';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.valueToDistribute = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    loadOrderCountToDib() {
      let id = location.search.split("=")[1];
      let url = this.GLOBAL.productUrl+'orders/' + id + '/selectCountToDib';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.valueToTake = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    loadOrderCountToBack(){
      let id = location.search.split("=")[1];
      let url = this.GLOBAL.productUrl+'orders/'+id+'/selectCountToBack';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.valueToBack = responseBody.data;
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
    this.loadOrderList();
    this.loadOrderCount();
    this.loadOrderCountToNotDib();
    this.loadOrderCountToDib();
    this.loadOrderCountToBack();
  }
}
</script>