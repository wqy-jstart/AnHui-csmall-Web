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
a:link{color: blue}
/*悬停*/
a:hover {color: purple}
/*点击*/
a:active{color: brown}

.el-table .cell {
  white-space: nowrap; /*设置内容不换行*/
  text-overflow: ellipsis; /*有超出显示范围的文本时显示*/
}

.p_img:hover {
  position: relative;
  top: 5px;
  /*设置元素阴影: x偏移值 y偏移值 浓度(值越大越模糊) 范围 颜色*/
  box-shadow: 0 0 3px 5px #333;
}
</style>

<template>
  <div>
    <el-container>
      <!--顶栏部分-->
      <el-header height="150px">
        <div style="width: 1400px;margin: 0 auto">
          <img src="../../public/LogoToMall.png" style="width: 300px;height: 100px;vertical-align: middle" alt="">
          <a href="">首页</a>
          <el-divider direction="vertical"/>
          <a href="">热点资讯</a>
          <el-divider direction="vertical"/>
          <a href="">商家入驻</a>
          <el-divider direction="vertical"/>
          <a href="">社会招聘</a>
          <el-divider direction="vertical"/>
          <a href="">校园招聘</a>
          <el-divider direction="vertical"/>
          <a href="">帮助</a>
          <el-divider direction="vertical"/>
          <a href="/login">退出登录</a>
          <a style="margin-left: 400px;font-size: 20px;font-weight: bold;font-family: 幼圆;color: #952b2b">{{nickname}},欢迎回来!</a>
        </div>
        <!--导航菜单-->
        <div style="background-color: #cd5d2c">
          <el-menu style="width: 1200px;height: 60px ;margin: 0 auto"
                   :default-active="activeIndex"
                   class="el-menu-demo"
                   mode="horizontal"
                   @select="handleSelect"
                   background-color="#cd5d2c"
                   text-color="#fff"
                   active-text-color="#fff">
            <!--v-for循环遍历List中的所有查询分类信息对象  一个index下对应一个分类-->
            <el-menu-item v-for="c in categoryArr" :index="c.id">{{ c.name }}</el-menu-item><!--下标代表当前菜单-->
            <div style="float: right;position: relative;top: 10px"><!--相对+浮动定位(往右浮动)-->
              <el-input placeholder="请输入搜索内容" v-model="wd">
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
              </el-input>
            </div>
          </el-menu>
        </div>
      </el-header>
      <!--中间部分-->
      <el-main style="width: 1200px;margin: 0 auto">
        <el-row gutter=20>
          <el-col span=16>
            <!--轮播图开始-->
            <el-carousel height="300px">
              <!--v-for循环遍历所有轮播图对象-->
              <el-carousel-item v-for="b in bannerArr">
                <img :src="b.url" width="100%" height="100%" alt="">
              </el-carousel-item>
            </el-carousel>
            <!--轮播图结束-->
          </el-col>
          <el-col span=8>
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
                <el-table-column prop="title" label="商品标题" width="100">
                </el-table-column>
                <el-table-column prop="saleCount" label="销量">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <!--底栏部分-->
      <el-footer>Footer</el-footer>
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
      nickname:'',
    }
  },
  methods: {
    // 加载本地的表单中的数据,存放到roleForm中去
    loadLocalRuleForm(){
      let localRuleFormString = localStorage.getItem('ruleForm');
      if (localRuleFormString){
        this.nickname = JSON.parse(localRuleFormString);
      }
    },
    loadUserNickname(){
      let url = 'http://localhost:9900/users/selectByUsername?username='+this.nickname;
      this.axios.get(url).then((response)=>{
        let responseBody = response.data;
        this.nickname = responseBody.data.nickname;
      })
    },
    // 处理点击查询功能
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      //跳转到结果页面 把分类id传递过去
      location.href = "/result.html?id=" + key;//这里的key代表分类的id(与index相同)
    },
    search() {//搜索的点击事件(搜索后跳转结果会将wd搜索内容在路径上传递过去)
      //跳转到结果页面把搜索内容传递过去

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
    }
  },
  mounted() {
    this.loadCategoryList();
    this.loadBannerList();
    this.loadLocalRuleForm();
    this.loadUserNickname();
  }
}
</script>