<style>
.right {
  float: right;
  width: 30px;
}
</style>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加属性</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 800px" label-width="130px" class="demo-ruleForm">
      <el-form-item label="属性模板" prop="templateId">
        <el-select v-model="ruleForm.templateId" placeholder="请选择">
          <el-option
              v-for="item in attributeTemplateListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="备选值列表" prop="valueList">
        <el-input v-model="ruleForm.valueList"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="unit">
        <el-input v-model="ruleForm.unit"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
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
      attributeTemplateListOptions: [],
      radio: '1',
      radio1: '1',
      ruleForm: {
        templateId: '',
        name: '',
        description: '',
        valueList: '',
        unit: '',
        sort: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入属性名称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        pinyin: [
          {required: true, message: '请输入属性拼音', trigger: 'blur'},
          {min: 4, max: 35, message: '长度在 4 到 35 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    loadAttributeTemplateList() {
      let url = 'http://localhost:9900/attributeTemplates';
      console.log('url='+url);
      this.axios.get(url).then((response)=>{
        let responseBody = response.data;
        this.attributeTemplateListOptions = responseBody.data;
      })
    }, 
    submitForm(formName) {
      // 对表单进行检查
      this.$refs[formName].validate((valid) => {
        if (valid) { // 满足条件则通过验证
          let url = 'http://localhost:9900/attributes/insert'
          console.log('url = ' + url);
          let formData = this.qs.stringify(this.ruleForm);//将formData对象转换成FormData格式,当后端不添加@RequestBody注解时接收
          console.log('formData=' + formData);
          this.axios.post(url, formData).then((response)=>{//箭头函数
            let responseBody = response.data;
            console.log('responseBody = ');
            console.log(responseBody);
            if (responseBody.state == 20000){
              this.$message({
                message: '添加属性成功！',
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
  },
  mounted() {
    this.loadAttributeTemplateList();
  }
}
</script>
