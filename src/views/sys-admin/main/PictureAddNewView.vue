<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加图片</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 800px" label-width="130px" class="demo-ruleForm">
      <el-form-item label="相册" prop="albumId">
        <el-select v-model="ruleForm.albumId" placeholder="请选择">
          <el-option
              v-for="item in albumListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片路径" prop="url">
        <el-input v-model="ruleForm.url"/>
      </el-form-item>
      <el-form-item label="图片简介" prop="description">
        <el-input v-model="ruleForm.description"/>
      </el-form-item>
      <el-form-item label="图片宽" prop="width">
        <el-input v-model="ruleForm.width"/>
      </el-form-item>
      <el-form-item label="图片高" prop="height">
        <el-input v-model="ruleForm.height"/>
      </el-form-item>
      <el-form-item label="是否作为封面" prop="isCover">
        <el-switch
            v-model="ruleForm.isCover"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="图片排序" prop="sort">
        <el-input v-model="ruleForm.sort"/>
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
      albumListOptions:[],
      ruleForm: {
        albumId:'',
        url:'',
        description: '',
        width:'',
        height:'',
        isCover:'0',
        sort:'',
      },
      rules: {
        description: [
          {required: true, message: '请输入图片简介', trigger: 'blur'},
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
          let url = this.GLOBAL.productUrl+'pictures/insert'
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
                message: '添加图片成功！',
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
    },
    loadAlbumList(){
      let url = this.GLOBAL.productUrl+'albums';
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToAdmin')
            }
          }).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.albumListOptions = responseBody.data;
        }else {
          this.$message.error(responseBody.message);
        }
      })
    },
  },
  mounted() {
    this.loadAlbumList();
  }
}
</script>