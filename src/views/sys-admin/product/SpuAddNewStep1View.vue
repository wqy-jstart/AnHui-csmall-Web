<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增SPU</el-breadcrumb-item>
      <el-steps style="width: 1000px;height: 60px;margin-left: 30px" process-status="wait"  :active="active" align-center finish-status="success">
        <el-step title="1.选择类别"></el-step>
        <el-step title="2.填写基本信息"></el-step>
        <el-step title="3.选择相册"></el-step>
        <el-step title="4.确认商品详情"></el-step>
        <el-step title="5.等待审核..."></el-step>
      </el-steps>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品类别" prop="categoryId">
        <el-input v-model="ruleForm.categoryId" placeholder="请输入商品类别的ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      ruleForm: {
        categoryId: '',
        categoryName: ''
      },
      rules: {
        categoryId: [
          {required: true, message: '请输入商品类别的ID', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    // 加载本地的表单中类别id数据,存到ruleForm中
    loadLocalRuleForm(){
      let localRuleFormString = localStorage.getItem('ruleForm');
      if (localRuleFormString){
        let localRuleForm = JSON.parse(localRuleFormString);
        this.ruleForm.categoryId = localRuleForm.categoryId;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.GLOBAL.productUrl+'categories/'+this.ruleForm.categoryId+'/selectById';
          console.log('url='+url);
          this.axios
              .create({
                'headers':{
                  'Authorization':localStorage.getItem('jwtToAdmin')
                }
              }).get(url).then((response)=>{
            let responseBody = response.data;
            console.log(responseBody.data)
            if (responseBody.state == 20000){ // 如果成功
              if (responseBody.data.isParent ==1){ // 判断类别是否为父级
                this.$message.error('错误:选择的类别必须不包含子级类别!');
              }else {
                this.ruleForm.categoryName = responseBody.data.name;
                let ruleFormString = JSON.stringify(this.ruleForm);
                localStorage.setItem('ruleForm',ruleFormString);
                this.$router.push('spu-add-new2');
              }
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.loadLocalRuleForm();
  }
}
</script>

<style scoped>

</style>