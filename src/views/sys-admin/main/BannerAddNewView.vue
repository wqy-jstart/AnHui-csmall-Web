<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 800px" label-width="130px" class="demo-ruleForm">
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="轮播图片" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item label="商品SPU的Id" prop="spuId">
        <el-input v-model="ruleForm.spuId"></el-input>
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
      ruleForm: {
        name: '',
        description: '',
        sort: '',
        spuId:'',
        url:'',
        enable:'0',
      },
      rules: {
        url: [
          {required: true, message: '请输入轮播图片', trigger: 'blur'},
        ],
        spuId: [
          {required: true, message: '请输入轮播对应的商品id', trigger: 'blur'},
        ],
        description: [
          {required: true, message: '请输入轮播图简介', trigger: 'blur'},
          {min: 2, max: 35, message: '长度在 2 到 35 个字符', trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请输入排序序号', trigger: 'blur'},
          {min: 1, max: 2, message: '长度在 1 到 2 个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      // 对表单进行检查
      this.$refs[formName].validate((valid) => {
        if (valid) { // 满足条件则通过验证
          let url = 'http://localhost:9900/banners/insert'
          console.log('url = ' + url);
          let formData = this.qs.stringify(this.ruleForm);//将formData对象转换成FormData格式,当后端不添加@RequestBody注解时接收
          console.log('formData=' + formData);
          this.axios.post(url, formData).then((response)=>{//箭头函数
            let responseBody = response.data;
            console.log('responseBody = ');
            console.log(responseBody);
            if (responseBody.state == 20000){
              this.$message({
                message: '添加轮播图成功！',
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