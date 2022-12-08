<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>属性模板列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="属性模板名称" width="180" align="center"></el-table-column>
      <el-table-column prop="pinyin" label="属性模板拼音" width="180"></el-table-column>
      <el-table-column prop="keywords" label="属性模板关键字" width="180" align="center"></el-table-column>
      <el-table-column prop="sort" label="属性模板排序" width="180" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="mini"
                     @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini"
                     @click="openDeleteConfirm(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出的编辑相册的对话框 -->
    <el-dialog title="修改属性模板" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="模板名称" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板描述" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.pinyin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板备选值列表" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.keywords" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板排序" :label-width="formLabelWidth">
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
      dialogFormVisible: false,
      tableData: [],
      ruleForm: {
        id: '',
        name: '',
        description: '',
        sort: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 处理提交修改
    submitEdit() {
      let url = 'http://localhost:9900/attributeTemplates/update';
      console.log('url:' + url);
      let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
      console.log('formData=' + formData);
      this.axios.post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '修改属性模板成功!'
          });
          this.dialogFormVisible = false;
          this.loadAttributeTemplateList();
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisible = false;
          this.loadAttributeTemplateList();
        }
      })
    },
    // 处理修改前的数据
    handleEdit(attributeTemplate) {
      let message = '您正在尝试编辑【' + attributeTemplate.id + '-' + attributeTemplate.name + '】的相册详情……';
      console.log(message);
      this.dialogFormVisible = true;
      // this.ruleForm = album;
      let url = 'http://localhost:9900/attributeTemplates/' + attributeTemplate.id + '/selectById';
      console.log(url);
      this.axios.get(url).then((response) => {
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
    handleDelete(AttributeTemplate) {
      let url = 'http://localhost:9900/attributeTemplates/' + AttributeTemplate.id + '/deleteById';
      console.log('url=' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.$message.success("删除成功！")
          this.loadAttributeTemplateList();
        }
      });
    },
    openDeleteConfirm(AttributeTemplate) {
      let message = '此操作将永久删除[' + AttributeTemplate.name + ']属性模板, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(AttributeTemplate);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 该方法用来请求相册的列表数据
    loadAttributeTemplateList() {
      let url = "http://localhost:9900/attributeTemplates" // 请求路径
      console.log('url=' + url);
      this.axios.get(url).then((response) => {// 发送异步请求
        let responseBody = response.data;
        this.tableData = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadAttributeTemplateList();
  }
}
</script>
