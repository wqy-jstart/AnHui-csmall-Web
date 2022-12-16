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
                <el-badge style="margin-left: 40px;margin-right: 40px" :value="valueToDistribute" class="item" type="primary">
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
                <el-badge style="margin-left: 40px" :value="3" class="item">
                  <a href="">退款</a>
                </el-badge>
              </div>
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
      valueToPay:'',
      valueToDistribute:'',
      valueToTake:'',
      user: {
        id:'',
        avatar: '',
        nickname: '',
      },
      activeIndex: "",
      size: 'medium',
      username: '',
    }
  },
  methods: {
    toPay(){
      location.href = "/user/waitToPay?id="+this.user.id;
    },
    toDistribute(){
      location.href = "/user/waitToDistribute?id="+this.user.id;
    },
    toTake(){
      location.href = "/user/waitToTake?id="+this.user.id;
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
    toCart(){
      location.href = '/user/shoppingCart?id='+this.user.id;
    },
    loadUserDetail() {
      let url = 'http://localhost:9900/users/selectByUsername?username=' + this.username;
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        this.user = responseBody.data;
      })
    },
    loadOrderCount(){
      let id = location.search.split("=")[1];
      let url = 'http://localhost:9900/carts/'+id+'/selectCount';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.valueToPay = responseBody.data;
        }else {
          this.$message.error(responseBody.message);
        }
      })
    },
    loadOrderCountToNotDib(){
      let id = location.search.split("=")[1];
      let url = 'http://localhost:9900/orders/'+id+'/selectCountToNotDib';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.valueToDistribute = responseBody.data;
        }else {
          this.$message.error(responseBody.message);
        }
      })
    },
    loadOrderCountToDib(){
      let id = location.search.split("=")[1];
      let url = 'http://localhost:9900/orders/'+id+'/selectCountToDib';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.valueToTake = responseBody.data;
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
    this.loadOrderCount();
    this.loadOrderCountToNotDib();
    this.loadOrderCountToDib();
  }
}
</script>