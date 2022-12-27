<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加类别</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 800px" label-width="130px" class="demo-ruleForm">
      <el-form-item label="父类级别" prop="parentId">
        <el-input placeholder="请输入父级类别的id,一级类别请填0" v-model="ruleForm.parentId"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="关键词列表" prop="keywords">
        <el-input v-model="ruleForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-switch
            v-model="ruleForm.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否显示在导航栏" prop="isDisplay">
        <el-switch
            v-model="ruleForm.isDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: true,
      value2: true,
      ruleForm: {
       parentId:'',
        name:'',
        keywords:'',
        sort:'0',
        enable:'1',
        isDisplay:'1',
      },
      rules: {
        parentId: [
          {required: true, message: '请输入父类级别的id,一级类别请填0', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      // 对表单进行检查
      this.$refs[formName].validate((valid) => {
        if (valid) { // 满足条件则通过验证
          let url = this.GLOBAL.productUrl+'categories/insert'
          console.log('url = ' + url);
          let formData = this.qs.stringify(this.ruleForm);//将formData对象转换成FormData格式,当后端不添加@RequestBody注解时接收
          console.log('formData=' + formData);
          this.axios
              .create({
                'headers':{
                  'Authorization':localStorage.getItem('jwtToAdmin')
                }
              }).post(url, formData).then((response)=>{//箭头函数
            let responseBody = response.data;
            if (responseBody.state == 20000){
              this.$message({
                message: '添加分类成功！',
                type: 'success'
              });
              this.resetForm(formName);// 调用该函数重置表单中的信息
            }else {
              this.$message.error(responseBody.message);
            }
          });
        } else { // 否则表单格式有误,不会通过
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) { // 该方法用来重置表单中的信息
      this.$refs[formName].resetFields();
    }
  }
}
</script>