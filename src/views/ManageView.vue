<style>
.layout-header {
  background: #cd5d2c;
}

.layout-header h1 {
  color: #fff;
  text-align: left;
  line-height: 60px;
}

.layout-body {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}

.layout-aside {
  background: #2f2c2a;
  font-family: 微软雅黑;
  font-weight: bolder;
  color: aliceblue;
}

.layout-aside i {
  color: #fff !important;
}

.layout-main {
}

.el-menu-item.is-active {
  background: #262424 !important;
}
</style>
<template>
  <div>
    <!-- 最外层容器 -->
    <el-container>
      <!-- 上半部分：顶栏 -->
      <el-header class="layout-header">
        <h1 style="font-family: 幼圆;font-size: 28px">皖派土特产网络超市运营管理平台
          <span style="float: right;font-size: 24px">欢迎{{nickname}}回来</span>
        </h1>
      </el-header>
      <!-- 下半部分：容器 -->
      <el-container class="layout-body">
        <!-- 下半部分的左侧边栏 -->
        <el-aside class="layout-aside">
          <el-menu
              router
              :default-active="$router.currentRoute.path"
              class="el-menu-vertical-demo"
              background-color="#2f2c2a"
              text-color="#fff"
              active-text-color="#ba6049">
            <!-- 首页 -->
            <el-menu-item index="/">
              <i class="el-icon-loading"></i>
              <span style="color: aliceblue;font-size: 18px;font-weight: bold">首页</span>
            </el-menu-item>

            <!-- 账号管理 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>账号管理</span>
              </template>
              <el-menu-item index="/sys-admin/main/admin/add-new">
                <i class="el-icon-circle-plus"></i>
                <span>添加管理员</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/main/admin/list">
                <i class="el-icon-s-operation"></i>
                <span>管理员列表</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/main/user/list">
                <i class="el-icon-s-operation"></i>
                <span>用户列表</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/main/address/list">
                <i class="el-icon-s-operation"></i>
                <span>收货地址列表</span>
              </el-menu-item>
            </el-submenu>

            <!-- 商品管理 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="3-1">
                <i class="el-icon-s-grid"></i>
                <span slot="title">SPU台账</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/spu-add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">新增SPU</span>
              </el-menu-item>

              <el-submenu index="3-3">
                <template slot="title">
                  <i class="el-icon-picture"></i>
                  <span>相册管理</span>
                </template>
                <el-menu-item index="/sys-admin/main/album/add-new">
                  <i class="el-icon-circle-plus"></i>
                  <span>添加相册</span>
                </el-menu-item>
                <el-menu-item index="/sys-admin/main/album/list">
                  <i class="el-icon-s-operation"></i>
                  <span>相册列表</span>
                </el-menu-item>
                <el-menu-item index="/sys-admin/main/picture/add-new">
                  <i class="el-icon-circle-plus"></i>
                  <span>添加图片</span>
                </el-menu-item>
                <el-menu-item index="/sys-admin/main/picture/list">
                  <i class="el-icon-s-operation"></i>
                  <span>图片列表</span>
                </el-menu-item>
              </el-submenu>

              <el-submenu index="3-4">
                <template slot="title">
                  <i class="el-icon-s-unfold"></i>
                  <span>商品类别</span>
                </template>
                <el-menu-item index="/sys-admin/main/category/add-new">
                  <i class="el-icon-circle-plus"></i>
                  <span>添加类别</span>
                </el-menu-item>
                <el-menu-item index="/sys-admin/main/category/list">
                  <i class="el-icon-s-operation"></i>
                  <span>类别列表</span>
                </el-menu-item>
              </el-submenu>

              <el-submenu index="3-5">
                <template slot="title">
                  <i class="el-icon-s-flag"></i>
                  <span>属性管理</span>
                </template>
                <el-menu-item index="/sys-admin/main/attributeTemplate/add-new">
                  <i class="el-icon-circle-plus"></i>
                  <span>添加属性模板</span>
                </el-menu-item>
                <el-menu-item index="/sys-admin/main/attributeTemplate/list">
                  <i class="el-icon-s-operation"></i>
                  <span>属性模板列表</span>
                </el-menu-item>
                <el-menu-item index="/sys-admin/main/attribute/add-new">
                  <i class="el-icon-circle-plus"></i>
                  <span>添加属性</span>
                </el-menu-item>
                <el-menu-item index="/sys-admin/main/attribute/list">
                  <i class="el-icon-s-operation"></i>
                  <span>属性列表</span>
                </el-menu-item>
              </el-submenu>

              <el-submenu index="1-4">
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <span>品牌管理</span>
                </template>
                <el-menu-item index="/sys-admin/main/brand/add-new">
                  <i class="el-icon-circle-plus"></i>
                  <span>添加品牌</span>
                </el-menu-item>
                <el-menu-item index="/sys-admin/main/brand/list">
                  <i class="el-icon-s-operation"></i>
                  <span>品牌列表</span>
                </el-menu-item>
              </el-submenu>

            </el-submenu>
            <!-- 订单管理 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
            </el-submenu>
            <!-- 营销管理 -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-s-ticket"></i>
                <span>营销管理</span>
              </template>
            </el-submenu>
            <!-- 商家管理 -->
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-s-shop"></i>
                <span>商家管理</span>
              </template>
            </el-submenu>
            <!-- 权限管理 -->
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-s-check"></i>
                <span>权限管理</span>
              </template>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 下半部分的右侧主体部分 -->
        <el-main class="layout-main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      activeMenuItemPath:'',
      nickname:'',
      ruleForm:'',
    }
  },
  methods: {
    // 加载本地的表单中的数据,存放到roleForm中去
    loadLocalRuleForm(){
      let localRuleFormString = localStorage.getItem('ruleForm');
      if (localRuleFormString){
        this.ruleForm = JSON.parse(localRuleFormString);
      }
    },
    loadUserNickname(){
      let url = 'http://localhost:9900/users/selectByUsername?username='+this.ruleForm;
      this.axios.get(url).then((response)=>{
        let responseBody = response.data;
        this.nickname = responseBody.data.nickname;
      })
    }
  },
  mounted() {
    let path = this.$router.currentRoute.path;
    if (path.endsWith('/sys-admin/product/spu-add-new')) {
      this.activeMenuItemPath = '/sys-admin/product/spu-add-new';
    } else {
      this.activeMenuItemPath = path;
    }
    this.loadLocalRuleForm();
    this.loadUserNickname();
  }
}
</script>
