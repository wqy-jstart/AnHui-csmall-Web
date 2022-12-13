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
  background-image: url('../../public/wave.png') !important;
}
</style>

<template>
  <div>
    <el-container>
      <!--顶栏部分-->
      <el-header height="150px">
        <div style="width: 1400px;margin: 0 auto">
          <img src="../../public/LogoToMall.png" style="width: 300px;height: 100px;vertical-align: middle" alt="">
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

          <span style="display: inline;margin-left: 300px;font-size: 20px;font-weight: bold;font-family: 幼圆;color: #952b2b">
            <a href="/user/detail">
              <el-avatar :size="60"
                         :src="user.avatar"/>
            </a>
            {{
              user.nickname
            }}欢迎回来!</span>
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
          <el-col span="16">
            <!--轮播图开始-->
            <el-carousel height="370px">
              <!--v-for循环遍历所有轮播图对象-->
              <el-carousel-item v-for="b in bannerArr">
                <img :src="b.url" width="100%" height="100%" alt="">
              </el-carousel-item>
            </el-carousel>
            <!--轮播图结束-->
          </el-col>
          <el-col span="8">
            <el-card>
              <h3>
                <i style="font-weight: bold"
                   class="el-icon-trophy">销量最高</i>
              </h3>
              <el-divider></el-divider>
              <el-table
                  :data="topArr"
                  style="width: 100%">
                <el-table-column type="index" label="排名">
                </el-table-column>
                <el-table-column align="center" prop="title" label="商品标题" width="160">
                </el-table-column>
                <el-table-column prop="sales" label="销量">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
        <!--Spu商品上架的展示-->
        <el-row gutter="20">
          <el-col style="margin: 10px 0" span="6" v-for="p in productArr">
            <el-card>
              <!--将图片利用超链接进行包裹-->
              <a :href="'/product/detail?spuId='+p.spuId">
                <img style="width: 200px;height: 150px;" class="p_img" :src="p.url" width="100%" alt="">
              </a>
              <div>
                <p style="font-size: 15px;height: 40px;margin-top: 0">
                  <a style="text-decoration: none;color: #3f3f3f" :href="'/product/detail?spuId='+p.spuId">
                    {{ p.title }}
                  </a>
                </p>
                <p style="font-size: 12px;color: #666">
                  ￥{{ p.listPrice }} &nbsp 浏览量:{{ p.views }}
                  <span style="float: right">销量:{{ p.sales }}件</span><!--该标签共占一行,需要浮动定位-->
                </p>
              </div>
            </el-card>
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
      bannerArr: [],
      activeIndex: "",
      wd: "",//文本框双向绑定的变量
      topArr: [],
      productArr: [],
      username: '',
      user:{
        nickname: '',
      }
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
    // 处理点击查询功能
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      //跳转到结果页面 把分类id传递过去
      location.href = "/index/result?categoryId=" + key;//这里的key代表分类的id(与index相同)
    },
    search() {//搜索的点击事件(搜索后跳转结果会将wd搜索内容在路径上传递过去)
      //跳转到结果页面把搜索内容传递过去
      location.href = "/index/result?wd=" + this.wd;//这里的key代表分类的id(与index相同)
    },
    loadBannerList() {
      let url = 'http://localhost:9900/banners/selectListByEnable';
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.bannerArr = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    loadTopToSalesList() {
      let url = 'http://localhost:9900/spu/selectSortByTitle';
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.topArr = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
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
    loadProductList() {
      let url = 'http://localhost:9900/spu/selectIndexList';
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.productArr = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    }
  },
  mounted() {
    this.loadCategoryList();
    this.loadBannerList();
    this.loadLocalRuleForm();
    this.loadUserNickname();
    this.loadProductList();
    this.loadTopToSalesList();
  }
}
</script>