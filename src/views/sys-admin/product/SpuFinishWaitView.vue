<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增SPU</el-breadcrumb-item>
      <el-steps style="width: 1000px;height: 60px;margin-left: 30px" process-status="wait" :active="active" align-center
                finish-status="success">
        <el-step title="1.选择类别"></el-step>
        <el-step title="2.填写基本信息"></el-step>
        <el-step title="3.选择相册"></el-step>
        <el-step title="4.确认商品详情"></el-step>
        <el-step title="5.等待审核..."></el-step>
      </el-steps>
    </el-breadcrumb>

    <el-divider></el-divider>
    <el-empty description="正在等待审核中...">
      <el-button type="success" size="medium" @click="goBack()">回到首页</el-button>
    </el-empty>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active:5,

    };
  },
  methods: {
    goBack(){
      this.$router.push("/")
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>