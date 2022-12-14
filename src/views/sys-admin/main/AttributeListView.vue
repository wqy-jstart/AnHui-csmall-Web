<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>属性列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>


    <el-form :model="template" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="请选择属性模板">
        <el-select v-model="template.templateId" placeholder="请选择" @change="loadAttributeListByATId()">
          <el-option
              v-for="item in attributeTemplateListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="templateId" label="所属属性模板id" width="120" align="center"></el-table-column>
      <el-table-column prop="name" label="属性名称" width="180" align="center"></el-table-column>
      <el-table-column prop="description" label="属性简介" header-align="center"></el-table-column>
      <el-table-column prop="type" label="属性类型" header-align="center"></el-table-column>
      <el-table-column prop="unit" label="计量单位" header-align="center" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序序号" width="80" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary"  size="mini"
                     @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini"
                     @click="openDeleteConfirm(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin-top: 10px;float: right;"
               v-show="isDisplay"
               @click="goBack()">返回
    </el-button>

    <!-- 弹出的编辑相册的对话框 -->
    <el-dialog title="修改属性" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="属性名称" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性描述" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性备选值列表" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.valueList" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性计量单位" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.unit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序序号" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.sort" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      attributeTemplateListOptions:[],
      tableData: [],
      dialogFormVisible: false,
      template:{
        templateId:'',
      },
      ruleForm: {
        id: '',
        name: '',
        description: '',
        sort: ''
      },
      formLabelWidth: '120px',
      isDisplay: false,
    }
  },
  methods: {
    // 处理提交修改
    submitEdit() {
      let url = 'http://localhost:9900/attributes/update';
      console.log('url:' + url);
      let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
      console.log('formData=' + formData);
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToAdmin')
            }
          }).post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '修改属性成功!'
          });
          this.dialogFormVisible = false;
          this.loadAttributeList();
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisible = false;
          this.loadAttributeList();
        }
      })
    },
    // 处理修改前的数据
    handleEdit(attribute) {
      let message = '您正在尝试编辑【' + attribute.id + '-' + attribute.name + '】的相册详情……';
      console.log(message);
      this.dialogFormVisible = true;
      // this.ruleForm = album;
      let url = 'http://localhost:9900/attributes/' + attribute.id + '/selectById';
      console.log(url);
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToAdmin')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.ruleForm = responseBody.data;
          this.dialogFormVisible = true;
        } else {
          this.$message.error(responseBody.message);
          this.loadAttributeList();
        }
      })
    },
    // 根据属性模板的id查询属性列表
    loadAttributeListByATId(){
      let url = 'http://localhost:9900/attributes/'+this.template.templateId+'/listByTemplate';
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToAdmin')
            }
          }).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.isDisplay = true;
          this.tableData = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    handleDelete(attribute) {
      let url = 'http://localhost:9900/attributes/' + attribute.id + '/deleteById';
      console.log('url=' + url);
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToAdmin')
            }
          }).post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.$message.success("删除成功！")
          this.loadAttributeList();
        }
      });
    },
    openDeleteConfirm(attribute) {
      let message = '此操作将永久删除[' + attribute.name + ']属性, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(attribute);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    loadAttributeTemplateList() {
      let url = 'http://localhost:9900/attributeTemplates';
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToAdmin')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          let attributeTemplateList = responseBody.data;
          this.attributeTemplateListOptions = attributeTemplateList;
        } else {
          this.$message.error(responseBody.message);
        }
      });
    },
    // 返回起始列表
    goBack(){
      this.loadAttributeList();
      this.template.templateId = '';
      this.isDisplay = false;
    },
    loadAttributeList(){
      let url = 'http://localhost:9900/attributes';
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToAdmin')
            }
          }).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.tableData = responseBody.data;
        }else {
          this.$message.error(responseBody.message);
        }
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadAttributeTemplateList();
    this.loadAttributeList();
  }
}
</script>