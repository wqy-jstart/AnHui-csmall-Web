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
              style="font-size: 32px;font-weight: bold;font-family: 幼圆;line-height: 62px;color: white;margin-left: 360px">提交订单</span>
          <!--下标代表当前菜单-->
        </div>
      </el-header>
      <!--中间部分-->
      <el-main style="width: 1200px;margin: 0 auto">
        <el-avatar :size="90"
                   :src="user.avatar"/>
        <span style="color: #191a1a;font-weight: bold">{{ user.nickname }}</span>
        <el-steps style="width: 600px;height: 60px;margin-right: 30px;float: right;margin-top: 20px" process-status="wait"  :active="active" align-center finish-status="success">
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
              <h1 style="margin-left: 20px;line-height: 60px">请选择收货地址:</h1>
            </div>
            <!--选择收货地址-->
            <div style="margin-left: 20px">
              <el-row :gutter="5" v-for="add in addressArr" style="margin-bottom: 10px">
                <el-col :span="20">
                  <el-card shadow="hover">
                    {{ add.info }} &nbsp {{ add.detailInfo }} &nbsp ({{ add.name }} &nbsp 收) &nbsp{{ add.number }} &nbsp
                    <el-tag>{{ add.tags }}</el-tag>
                    <div style="float: right">
                      <template>
                        <el-radio @input="input()" v-model="radio" :label='add.id'>
                          <i class="el-icon-check"></i>
                        </el-radio>
                      </template>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="width: 1100px;border: 1px solid black;background-color: #e4e6e7;margin-top: 20px">
            <h1 style="margin-left: 20px;line-height: 60px">确认订单信息:</h1>
          </div>
          <div style="width: 1100px;border: 1px solid black;overflow: hidden">
            <el-card>
              <div slot="header" class="clearfix">
                <span style="margin-left: 20px;font-weight: bold">商品图片</span>
                <span style="margin-left: 90px;font-weight: bold">店铺宝贝</span>
                <span style="margin-left: 160px;font-weight: bold">商品属性</span>
                <span style="margin-left: 210px;font-weight: bold">价格</span>
                <span style="margin-left: 155px;font-weight: bold">数量</span>
              </div>
              <div>
                <el-image
                    style="width: 120px; height: 140px;float: left"
                    :src="product.url"
                    fit="fill"></el-image>
                <div style="width: 180px;height: 100px;margin-left: 10px;float:left">
                  <p style="font-size: 15px;color: #666;margin-bottom: 5px">商品标题:&nbsp{{ product.title }}</p>
                  <p style="font-size: 15px;color: #666;margin-bottom: 5px">商品品牌:&nbsp{{ product.brandName }}</p>
                  <p style="font-size: 15px;color: #666;margin-bottom: 5px">商品分类:&nbsp{{ product.categoryName }}</p>
                  <span style="font-size: 15px;color: #666">备注:付款后48小时内发货</span>
                </div>
                <div style="width: 220px;float: left;margin-left: 50px">
                  <p style="font-size: 15px;color: #666;float: left">属性:</p>
                  <el-row :gutter="5" style="height: 30px">
                    <el-col span="6" style="font-size: 15px;color: #666"  v-for="p in product.attributeList">
                      <el-tag type="success" size="mini">{{ p.valueList }}{{ p.unit }}</el-tag>
                    </el-col>
                  </el-row>
                  <p style="font-size: 15px;color: #666;float: left">标签:</p>
                  <el-tag size="mini">{{ product.tags }}</el-tag>
                  <p style="font-size: 15px;color: #666;margin-top: 10px">
                    评价: &nbsp{{ product.detail }}</p>
                  <el-rate style="padding: 10px"
                           v-model="value"
                           disabled
                           show-score
                           text-color="#ff9900"
                           score-template="{value}">
                  </el-rate>
                </div>
                <div style="width: 180px;height: 100px;margin-left: 10px;float:left">
                  <p style="font-size: 20px;font-weight: bold;text-align: center">
                     ￥{{ product.indexPrice }}
                  </p>
                </div>
                <div style="width: 150px;height: 100px;margin-left: 35px;float:left">
                  <template>
                    <el-input-number v-model="num" size="small" align="center" :disabled="true"></el-input-number>
                  </template>
                </div>
              </div>
              <div style="margin-top: 120px;margin-left: 860px">
                <div style="border: 2px solid darkred;width: 200px;height: 120px;text-align: right">
                  <p style="font-size: 15px;color: #2d2d2d;font-weight: bold">实付款:
                    <span style="font-weight: bold;font-size: 35px;color: #de5e38;font-family: 幼圆">￥{{this.payPrice}}</span></p>
                  <p style="font-size: 13px;color: #2d2d2d;margin-top: 10px;text-align: right">寄送至: &nbsp{{ address.info }} &nbsp {{ address.detailInfo }}</p>
                  <p style="font-size: 13px;color: #2d2d2d;margin-top: 10px;text-align: right">收货人: &nbsp{{ address.name }}</p>
                </div>
                <el-button style="background-color: #e7643a;color: white;margin-top: 10px;margin-left: 50px">提交订单</el-button>
              </div>
            </el-card>
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
      active:'1',
      user: {},
      username: '',
      radio: '', // 绑定的选中的收货地址id
      addressArr: [],
      value:'4.7',
      num:'',
      payPrice:'',
      address:{
        info:'',
        detailInfo:'',
        name:'',
        number:''
      },
      product: {
        spuId:'',
        title: '', // 标题
        brandName: '',
        categoryName: '',
        indexPrice: '', // 现价
        tags: '',
        url: '', // 封面
        detail: '', // 评价
        attributeList: [],
        num:'',
      },
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
    },
    toCart(){
      location.href = '/user/shoppingCart?id='+this.user.id;
    },
    input(){
      this.selectAddressById(this.radio);
    },
    loadUserDetail() {
      let url = 'http://localhost:9900/users/selectByUsername?username=' + this.username;
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        this.user = responseBody.data;
      })
    },
    selectAddressById(radio){
      let url = 'http://localhost:9900/addresses/'+radio+'/selectById';
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        this.address = responseBody.data;
      })
    },
    loadAddressList() {
      // ?userId=1&spuId=5
      let userId = location.search.split("&")[0].split("=")[1];
      let url = 'http://localhost:9900/addresses/selectByUserId?id=' + userId;
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.addressArr = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    loadProductDetail() {
      // ?userId=1&spuId=5&num=2
      this.num = location.search.split("&")[2].split("=")[1];
      let spuId = location.search.split("&")[1].split("=")[1];
      console.log("id为:"+spuId)
      let url = 'http://localhost:9900/spu/selectToDetail?spuId=' + spuId;
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.product = responseBody.data;
          this.payPrice = this.product.indexPrice * this.num;
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
    this.loadAddressList();
    this.loadProductDetail();
  }
}
</script>