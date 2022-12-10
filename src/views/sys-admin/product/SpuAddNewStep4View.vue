<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增SPU</el-breadcrumb-item>
      <el-steps style="width: 1000px;height: 60px;margin-left: 30px" process-status="wait" :active="active" align-center finish-status="success">
        <el-step title="1.选择类别"></el-step>
        <el-step title="2.填写基本信息"></el-step>
        <el-step title="3.选择相册"></el-step>
        <el-step title="4.确认商品详情"></el-step>
        <el-step title="5.等待审核..."></el-step>
      </el-steps>
    </el-breadcrumb>

    <el-divider></el-divider>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="基本信息">
        <el-descriptions :title="this.ruleForm.name">
          <el-descriptions-item label="品牌" span="1">
            <el-tag size="small">{{this.ruleForm.brandName}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="类别" span="2">{{this.ruleForm.categoryName}}</el-descriptions-item>
          <el-descriptions-item label="标题" span="3">{{this.ruleForm.title}}</el-descriptions-item>
          <el-descriptions-item label="简介" span="3">{{this.ruleForm.description}}</el-descriptions-item>
          <el-descriptions-item label="相册" span="3">{{this.ruleForm.albumName}}</el-descriptions-item>
          <el-descriptions-item label="属性模板" span="3">{{this.ruleForm.attributeTemplateName}}</el-descriptions-item>
          <el-descriptions-item label="货号">{{this.ruleForm.typeNumber}}</el-descriptions-item>
          <el-descriptions-item label="售价">{{this.ruleForm.listPrice}}元</el-descriptions-item>
          <el-descriptions-item label="计件单位">{{this.ruleForm.unit}}</el-descriptions-item>
          <el-descriptions-item label="库存">{{this.ruleForm.stock}}</el-descriptions-item>
          <el-descriptions-item label="库存阈警值">{{this.ruleForm.stockThreshold}}</el-descriptions-item>
          <el-descriptions-item label="排序序号">{{this.ruleForm.sort}}</el-descriptions-item>
          <el-descriptions-item label="关键词">{{this.ruleForm.keywords}}</el-descriptions-item>
          <el-descriptions-item label="标签">{{this.ruleForm.tags}}</el-descriptions-item>
        </el-descriptions>
      </el-form-item>
      <el-form-item label="商品详情">
        <div id="wangEditor"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="backToPreStep()">上一步</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active:4,
      editor:{},// 富文本编辑器
      ruleForm: {
        detail:'',
      },
      rules: {
      }
    };
  },
  methods: {
    backToPreStep() {
      this.$router.push('spu-add-new3');
    },
    initWangEditor(){
      this.editor = new this.wangEditor('#wangEditor');
      this.editor.config.zIndex = 1;// 调节显示级别
      this.editor.create();
    },
    // 加载本地ruleForm数据
    loadLocalRuleForm() {
      let localRuleFormString = localStorage.getItem('ruleForm');
      if (localRuleFormString) {
        this.ruleForm = JSON.parse(localRuleFormString);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9900/spu/insert';
          this.ruleForm.detail = this.editor.txt.html();
          let formData = this.qs.stringify(this.ruleForm);
          console.log('formData='+formData);

          this.axios.post(url,formData).then((response)=>{
            let responseBody = response.data;
            if (responseBody.state == 20000){
              this.$alert('添加SPU成功!', '操作成功', {
                confirmButtonText: '确定',
                callback: action => {
                  localStorage.removeItem('ruleForm');
                  this.$router.push('SpuFinishWaitView.vue');
                }
              });
            }else {
              this.$message.error(responseBody.message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  mounted() {
    this.initWangEditor();// 初始化富文本编辑器
    this.loadLocalRuleForm();
  }
}
</script>

<style scoped>

</style>