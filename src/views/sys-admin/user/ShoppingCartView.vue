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
          <a href="/user/shoppingCart">购物车</a>
          <el-divider direction="vertical"/>
          <a href="">帮助</a>
          <el-divider direction="vertical"/>
          <a href="/login">退出登录</a>
        </div>
        <!--导航菜单-->
        <div style="background-color: #cd331f;height: 62px">
          <span
              style="font-size: 32px;font-weight: bold;font-family: 幼圆;line-height: 62px;color: white;margin-left: 360px">购物车</span>
          <!--下标代表当前菜单-->
        </div>
      </el-header>
      <!--中间部分-->
      <el-main style="width: 1200px;margin: 0 auto">
        <el-avatar :size="90"
                   :src="user.avatar"/>
        <span style="color: #191a1a;font-weight: bold">{{ user.nickname }}</span>
        <div style="height: 20px"></div>
        <div style="width: 1100px">
          <div style="width: 1100px;border: 1px solid #877c7c">
            <div
                style="width: 1100px;height: 60px;background-color: #e4e6e7;overflow: hidden">
              <h1 style="margin-left: 20px;line-height: 60px">我的购物车:
                <span style="font-weight: bold;font-size: 35px;color: #de5e38;font-family: 幼圆;float: right;margin-right: 20px">￥{{ sumPrice }}</span>
                <span style="float: right;margin-right: 5px;font-size: 19px">合计:</span>
              </h1>
            </div>
            <div style="width: 1100px;border: 1px solid #877c7c">
              <div style="width: 1100px;height: 40px;margin-top: 24px;margin-left: 25px">
                <span style="margin-left: 50px;font-weight: bold">商品图片</span>
                <span style="margin-left: 90px;font-weight: bold">店铺宝贝</span>
                <span style="margin-left: 130px;font-weight: bold">商品属性</span>
                <span style="margin-left: 140px;font-weight: bold">价格</span>
                <span style="margin-left: 140px;font-weight: bold">好评</span>
                <span style="margin-left: 160px;font-weight: bold">操作</span>
              </div>
              <el-row :gutter="12" style="margin-top: 10px;margin-left: 10px" v-for="c in cartArr">
                <el-col :span="24">
                  <el-card shadow="hover" style="padding: 10px">
                    <div style="float: right;margin-bottom: 10px">
                      <el-button type="primary" size="mini"
                                 @click="ToPay(c.spuId)">去购买
                      </el-button>
                      <el-button type="danger" size="mini"
                                 @click="openDeleteConfirm(c.spuId)">删除
                      </el-button>
                    </div>
                    <el-image
                        style="width: 120px; height: 120px;float: left"
                        :src="c.url"
                        fit="fill"></el-image>
                    <div style="width: 180px;height: 120px;margin-left: 10px;float:left">
                      <p style="font-size: 15px;color: #666;margin-bottom: 5px">商品标题:&nbsp{{ c.title }}</p>
                      <p style="font-size: 15px;color: #666;margin-bottom: 5px">商品品牌:&nbsp{{ c.brandName }}</p>
                      <p style="font-size: 15px;color: #666;margin-bottom: 5px">商品分类:&nbsp{{ c.categoryName }}</p>
                    </div>
                    <div style="width: 180px;float: left;margin-left: 50px">
                      <p style="font-size: 18px;color: #2f2c2a;font-weight: bold">{{c.name}}</p>
                      <p style="font-size: 15px;color: #666;float: left">标签:</p>
                      <el-tag size="mini">{{ c.tags }}</el-tag>
                      <p style="font-size: 15px;color: #666;margin-top: 10px">
                        评价: &nbsp{{ c.detail }}</p>
                    </div>
                    <div style="width: 90px;height: 100px;margin-left: 26px;float:left">
                      <p style="font-size: 20px;font-weight: bold">
                        ￥{{ c.indexPrice }}
                      </p>
                    </div>
                    <div style="width: 180px;height: 100px;margin-left: 30px;float:left">
                      <el-rate style="padding: 10px"
                               v-model="value"
                               disabled
                               show-score
                               text-color="#ff9900"
                               score-template="{value}">
                      </el-rate>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      username: '',
      cartArr: [],
      sumPrice:'',
      value: '4.7',
    }
  },
  methods: {
    // 加载本地的表单中的数据,存放到roleForm中去
    loadLocalRuleForm() {
      let localRuleFormString = localStorage.getItem('ruleFormToUser');
      if (localRuleFormString) {
        this.username = JSON.parse(localRuleFormString);
      }
    },
    loadUserDetail() {
      let url = this.GLOBAL.productUrl+'users/selectByUsername?username=' + this.username;
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
    ToPay(id){
      location.href = '/product/detail?spuId='+id;
    },
    handleDelete(id) {
      let url = this.GLOBAL.productUrl+'carts/' + this.user.id + '/'+id+'/deleteById';
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
          this.loadCartList();
          this.loadSUMPrice();
        }
      });
    },
    openDeleteConfirm(id) {
      let message = '此操作将删除该条购物车内容, 是否继续?'
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
    loadCartList() {
      let url = this.GLOBAL.productUrl+'carts/selectToCartList' + location.search;
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.cartArr = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    loadSUMPrice(){
      let url = this.GLOBAL.productUrl+'carts/selectSUMPrice'+location.search;
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToUser')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.sumPrice = responseBody.data;
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
    this.loadCartList();
    this.loadSUMPrice();
  }
}
</script>