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
          <span
              style="font-size: 32px;font-weight: bold;font-family: 幼圆;line-height: 62px;color: white;margin-left: 360px">订单结果</span>
          <!--下标代表当前菜单-->
        </div>
      </el-header>
      <!--中间部分-->
      <el-main style="width: 1200px;margin: 0 auto">
        <el-avatar :size="90"
                   :src="user.avatar"/>
        <span style="color: #191a1a;font-weight: bold">{{ user.nickname }}</span>
        <el-steps style="width: 600px;height: 60px;margin-right: 30px;float: right;margin-top: 20px"
                  process-status="wait" :active="active" align-center finish-status="success">
          <el-step title="1.确认订单信息"></el-step>
          <el-step title="2.付款到支付宝"></el-step>
          <el-step title="3.确认收货"></el-step>
          <el-step title="4.双方互评"></el-step>
        </el-steps>
        <div style="height: 20px"></div>
        <div style="width: 1100px">
          <div style="width: 1100px;border: 1px solid #877c7c">
            <div
                style="width: 1100px;height: 60px;background-color: #e4e6e7;overflow: hidden;border: 1px solid #877c7c">
              <h1 style="margin-left: 20px;line-height: 60px">支付结果详情:</h1>
            </div>
            <div style="width: 1100px;height: 600px;overflow: hidden;margin-top: 20px">
              <el-card class="box-card" style="width: 560px;height: 500px;text-align: center;margin: 0 auto">
                <div slot="header" class="clearfix">
                  <span style="font-size: 25px;font-weight: bold;font-family: 微软雅黑">订单信息</span>
                </div>
                <el-row>
                  <el-col>
                    <p style="font-size: 18px;color: #383737;margin-bottom: 5px">
                      商品:&nbsp{{ this.productName }}
                    </p>
                    <p style="font-size: 15px;color: #666;margin-bottom: 5px">
                      商户订单号:&nbsp{{ this.outTradeNo }}
                    </p>
                    <p style="font-size: 15px;color: #666;margin-bottom: 5px">
                      交易金额:&nbsp{{ this.totalAmount }}
                    </p>
                    <p style="font-size: 15px;color: #666;margin-bottom: 5px">
                      交易流水号:&nbsp{{ this.tradeNo }}
                    </p>
                    <p style="font-size: 15px;color: #666;margin-bottom: 5px">
                      付款时间:&nbsp{{ this.time }}
                    </p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :lg="24">
                    <el-result icon="success" title="支付成功!" subTitle="请根据提示进行操作">
                      <template slot="extra">
                        <el-button type="primary" size="medium" @click="back()">回到首页</el-button>
                      </template>
                    </el-result>
                  </el-col>
                </el-row>
              </el-card>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '2',
      user: {
        id: '',
      },
      username: '',
      userId: '',
      spuId: '',
      addressId: '',
      productName: '',
      num: '', // 商品数量
      outTradeNo: '', // 订单号
      totalAmount: '', // 交易金额
      tradeNo: '', // 流水号
      time: '', // 支付时间
    }
  },
  methods: {
    // 加载本地的表单中的数据,存放到roleForm中去
    loadLocalRuleForm() {
      let localRuleFormString = localStorage.getItem('ruleFormToUser');
      if (localRuleFormString) {
        this.username = JSON.parse(localRuleFormString);
        console.log(this.username)
      }
      // 加载localStorage中的SpuId
      let localRuleFormToUserId = localStorage.getItem('userId');
      if (localRuleFormToUserId) {
        this.userId = JSON.parse(localRuleFormToUserId);
        console.log(this.userId)
      }
      // 加载localStorage中的SpuId
      let localRuleFormToSpuId = localStorage.getItem('spuId');
      if (localRuleFormToSpuId) {
        this.spuId = JSON.parse(localRuleFormToSpuId);
        console.log(this.spuId)
      }
      // 加载localStorage中的AddressId
      let localRuleFormToAddressId = localStorage.getItem('addressId');
      if (localRuleFormToAddressId) {
        this.addressId = JSON.parse(localRuleFormToAddressId);
        console.log(this.addressId)
      }
      // 加载localStorage中的num
      let localRuleFormToNum = localStorage.getItem('num');
      if (localRuleFormToNum) {
        this.num = JSON.parse(localRuleFormToNum);
        console.log(this.num)
      }
      // 加载localStorage中的pname
      let localRuleFormToPName = localStorage.getItem('pname');
      if (localRuleFormToPName) {
        this.productName = JSON.parse(localRuleFormToPName)
      }
    },
    back() {
      location.href = "/index";
    },
    loadUserDetail() {
      let url = 'http://localhost:9900/users/selectByUsername?username=' + this.username;
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.user = responseBody.data;
        } else {
          this.$message.error(responseBody.message)
        }
      })
    },
    loadGetPayInfo() {
      let trade = location.search.split("&")[1].split("=")[1]; // 订单号
      this.outTradeNo = trade;
      let amount = location.search.split("&")[3].split("=")[1]; // 交易金额
      this.totalAmount = amount;
      let tradeNo = location.search.split("&")[5].split("=")[1]; // 交易流水号
      this.tradeNo = tradeNo;
      this.time = new Date();
      console.log("订单号:" + trade);
      console.log("交易金额:" + amount);
      console.log("交易流水号:" + tradeNo);
      let obj = {
        userId: this.userId,
        spuId: this.spuId,
        addressId: this.addressId,
        number: this.num,
        outTradeNo: this.outTradeNo,
        totalAmount: this.totalAmount,
        tradeNo: this.tradeNo
      }
      console.log("对象:" + obj);
      let url = 'http://localhost:9900/orders/insert';
      let objToString = this.qs.stringify(obj);
      this.axios.post(url, objToString).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message.success("订单会在48小时内发货,请耐心等待哦,亲!~")
          localStorage.removeItem("userId");
          localStorage.removeItem("spuId");
          localStorage.removeItem("addressId");
          localStorage.removeItem("num");
          localStorage.removeItem("pname");
        } else {
          this.$message.error(responseBody.message);
        }
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadLocalRuleForm();
    this.loadUserDetail();
    this.loadGetPayInfo();
  }
}
</script>