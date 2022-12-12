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
          <a href="">购物车</a>
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
                  <a style="text-decoration: none;color: #3f3f3f" :href="'detail.html?id='+p.id">
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
      activeIndex: "",
      wd: "",//文本框双向绑定的变量
      productArr: [],
      username: '',
      nickname: '',
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
        this.nickname = responseBody.data.nickname;
      })
    },
    // 处理点击查询功能
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      //跳转到结果页面 把分类id传递过去
      location.href = "/index/result?categoryId=" + key;//这里的key代表分类的id(与index相同)
    },
    search() {//搜索的点击事件(搜索后跳转结果会将wd搜索内容在路径上传递过去)
      let url = 'http://localhost:9900/spu/selectByWd?wd=' + this.wd;
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.productArr = responseBody.data;
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
      if (location.search.indexOf("wd") != -1) {//包含wd代表路径上传的是搜索结果
        let url = 'http://localhost:9900/spu/selectByWd' + location.search;
        this.axios.get(url).then((response) => {
          let responseBody = response.data;
          if (responseBody.state == 20000) {
            this.productArr = responseBody.data;
          } else {
            this.$message.error(responseBody.message);
          }
        })
      } else {//不包含wd代表路径上传的是分类信息id
        let url = 'http://localhost:9900/spu/selectByCategoryId' + location.search
        this.axios.get(url).then((response) => {
          console.log("执行了查询结果的功能!")
          let responseBody = response.data;
          if (responseBody.state == 20000) {
            this.productArr = responseBody.data;
            console.log(this.productArr)
            //?id=3
            this.activeIndex = location.search.split("=")[1];
          } else {
            this.$message.error(responseBody.message);
          }
        })
      }
    }
  },
  mounted() {
    this.loadCategoryList();
    this.loadLocalRuleForm();
    this.loadUserNickname();
    this.loadProductList();
  }
}
</script>