<style>
header a {
  text-decoration: none;
  color: #6c6c6c;
  font-size: 18px;
}

.el-table .el-table__cell {
  padding: 0;
}

/*未访问*/
a:link {
  color: blue
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

p {
  padding: 10px;
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
        </div>
        <!--导航菜单-->
        <div style="background-color: #cd331f">
          <el-menu style="width: 1200px;height: 60px ;margin: 0 auto"
                   :default-active="activeIndex"
                   class="el-menu-demo"
                   mode="horizontal"
                   @select="handleSelect"
                   background-color="#cd331f"
                   text-color="#fff"
                   active-text-color="#fff">
            <!--v-for循环遍历List中的所有查询分类信息对象  一个index下对应一个分类-->
            <el-menu-item v-for="c in categoryArr" :index="c.id">{{ c.name }}</el-menu-item><!--下标代表当前菜单-->
            <div style="float: right;position: relative;top: 10px"><!--相对+浮动定位(往右浮动)-->
              <el-input placeholder="请输入搜索内容:" v-model="wd">
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
              </el-input>
            </div>
          </el-menu>
        </div>
      </el-header>
      <!--中间部分-->
      <el-main style="width: 1200px;margin: 0 auto">
        <el-row gutter="20">
          <el-col span="12">
            <el-card>
              <img :src="product.url" width="100%" height="500px" alt="">
            </el-card>
            <el-card v-for="img in product.urls">
              <img :src="img.url" width="80" height="60px" alt="">
            </el-card>
          </el-col>
          <el-col span="12">
            <p style="font-size: 25px">
              {{ product.title }}
            </p>
            <span style="color: #666;font-size: 12px">发布于:{{ product.gmtCreate }}</span>
            <el-divider></el-divider>
            <p style="font-size: 20px;color: #666;margin-top: 0;padding-top: 0">
              品牌: &nbsp{{ product.brandName }}</p>
            <p style="font-size: 15px;color: #666;margin-top: 0;">
              分类: &nbsp{{ product.categoryName }}</p>
            <p style="font-size: 15px;color: #666;float:left">属性:</p>
            <el-row>
              <el-col span="3" style="font-size: 15px;color: #666" v-for="p in product.attributeList">
                <el-tag type="success" size="medium" style="margin: 0 auto">{{ p.valueList }}{{ p.unit }}</el-tag>
              </el-col>
            </el-row>
            <p style="font-size: 15px;color: #666">
              销量: &nbsp{{ product.sales }}件</p>
            <p style="font-size: 15px;color: #666">
              库存: &nbsp{{ product.stock }}</p>
            <p style="font-size: 15px;color: #666;float: left">标签:</p>
            <el-tag>{{ product.tags }}</el-tag>
            <p style="font-size: 15px;color: #666">
              评价: &nbsp{{ product.detail }}</p>
            <el-rate style="padding: 10px"
                     v-model="value"
                     disabled
                     show-score
                     text-color="#ff9900"
                     score-template="{value}">
            </el-rate>
            <template>
              数量: &nbsp<el-input-number v-model="num" size="small" :min="1" :max="10"></el-input-number>
            </template>
            <p style="font-size: 25px;font-weight: bold">
              价格:&nbsp{{ product.indexPrice }}
              <span style="font-size: 15px;color: #666">原价:<s>{{ product.listPrice }}</s></span>
            </p>
            <el-row gutter="20" style="margin-top: 20px;margin-left: 10px">
              <el-button type="warning" icon="el-icon-circle-plus-outline" @click="toPay()">立即购买</el-button>
              <el-button type="primary" icon="el-icon-shopping-cart-2" @click="addCart()">加入购物车</el-button>
            </el-row>
          </el-col>
        </el-row>
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
      categoryArr: [],
      activeIndex: "",
      wd: "",//文本框双向绑定的变量
      product: {
        spuId:'',
        title: '', // 标题
        brandName: '',
        categoryName: '',
        listPrice: '', // 原价
        indexPrice: '', // 现价
        sales: '', // 销量
        tags: '',
        url: '', // 封面
        urls: [], // 图片集
        isRecommend: '',
        detail: '', // 评价
        attributeList: [],
        stock: '', // 库存
        gmtCreate: '', // 发布时间
        num:'',// 数量
      },
      num: '', // 购买数量
      username: '',
      nickname: '',
      value: '4.7', // 推荐即4.7
      user:{
        id:'',
      },
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
    loadUserNickname() {
      let url = 'http://localhost:9900/users/selectByUsername?username=' + this.username;
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        console.log("接收的信息" + response.data);
        this.user = responseBody.data;
      })
    },
    // 添加购物车的事件
    addCart(){
      let obj = {userId:this.user.id,spuId:this.product.spuId};
      let url = 'http://localhost:9900/carts/insert';
      let ruleFormJSON  = this.qs.stringify(obj);
      this.axios.post(url,ruleFormJSON).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.$message.success("添加购物车成功!")
        }else {
          this.$message.error(responseBody.message);
        }
      })
    },
    // 生成支付订单事件
    toPay(){
      location.href = '/product/order?userId='+this.user.id+'&spuId='+this.product.spuId+'&num='+this.num;
    },
    // 处理点击查询功能
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      //跳转到结果页面 把分类id传递过去
      location.href = "/index/result?categoryId=" + key;//这里的key代表分类的id(与index相同)
    },
    toCart(){
      location.href = '/user/shoppingCart?id='+this.user.id;
    },
    search() {//搜索的点击事件(搜索后跳转结果会将wd搜索内容在路径上传递过去)
      location.href = "/index/result?wd=" + this.wd;//这里的key代表分类的id(与index相同)
    },
    loadCategoryList() {
      let url = 'http://localhost:9900/categories/selectByParent';
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.categoryArr = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    loadProductDetail() {
      let url = 'http://localhost:9900/spu/selectToDetail' + location.search;
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.product = responseBody.data;
          console.log(this.product)
        } else {
          this.$message.error(responseBody.message);
        }
      })
    }
  },
  mounted() {
    this.loadCategoryList();
    this.loadLocalRuleForm();
    this.loadUserNickname();
    this.loadProductDetail();
  }
}
</script>