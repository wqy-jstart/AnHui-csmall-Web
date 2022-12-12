<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>类别列表</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in history"><span v-text="item.name"></span></el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <!-- prop必须是服务器绑定的属性名 -->
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="180" align="center"></el-table-column>
      <el-table-column prop="parentId" label="父级类别id" width="120" align="center"></el-table-column>
      <el-table-column prop="depth" label="深度" width="120" align="center"></el-table-column>
      <el-table-column prop="keywords" label="关键字" width="120" align="center"></el-table-column>
      <el-table-column label="是否启用" width="80" align="center">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              @change="changeEnable(scope.row)"
              v-model="scope.row.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#aaaaaa">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="isParent" label="是否为父级" width="120" align="center"></el-table-column>
      <el-table-column label="是否显示导航栏" width="80" align="center">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              @change="changeDisplay(scope.row)"
              v-model="scope.row.isDisplay"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#aaaaaa">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="120" align="center"></el-table-column>
      <el-table-column label="查看子级" width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" :disabled="scope.row.isParent == 0 "
                     @click="showSubCategories(scope.row)">查看子级
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"
                     @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini"
                     :disabled="scope.row.isParent == 1"
                     @click="openDeleteConfirm(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin-top: 10px;float: right;"
               v-if="currentDepth != 1"
               @click="goBack()">返回
    </el-button>

    <!-- 弹出的编辑相册的对话框 -->
    <el-dialog title="修改分类" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类父级id" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.parentId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类关键字" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.keywords" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类排序" :label-width="formLabelWidth">
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
      history: [],
      currentDepth: 1, // 默认深度为1
      currentParentId: 0,
      displayText: ['不显示在导航栏', '显示在导航栏'],
      enableText: ['禁用', '启用'],
      tableData: [],
      dialogFormVisible: false,
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
    goBack() {
      let parentCategory = this.history[--this.currentDepth - 1];// 定义上一级的数组下标
      this.currentParentId = parentCategory.parentId;// 将当前父级id修改为上一级的父级id
      this.history.pop();// 去除数组中末尾的部分
      this.loadCategoryList();
    },
    showSubCategories(category) {
      this.history[this.currentDepth - 1] = category;// 每查询一层,都将上一层的类别对象保存到history数组中
      this.currentDepth++;// 当前深度增加
      this.currentParentId = category.id;// "当前父级id"==当前的类别id
      this.loadCategoryList()
    },
    changeDisplay(category) {
      console.log('category id=' + category.id);
      //点击后获取的enable值
      console.log('category isDisplay=' + category.isDisplay);
      let url = 'http://localhost:9900/categories/' + category.id;
      if (category.isDisplay == 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        console.log("显示类别")
        url += '/display';
      } else {
        console.log("隐藏类别")
        url += '/hidden';
      }
      console.log('url=' + url)
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          let message = '将类别[' + category.name + ']的显示改为[' + this.displayText[category.isDisplay] + ']成功!';
          this.$message({
            message: message,
            type: 'success'
          });
        } else { // 否则输出错误信息
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 40400) { // 数据不存在的时候才刷新
          this.loadCategoryList();
        }
      })
    },
    changeEnable(category) {
      console.log('category id=' + category.id);
      //点击后获取的enable值
      console.log('category enable=' + category.enable);
      let url = 'http://localhost:9900/categories/' + category.id;
      if (category.enable == 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        console.log("启用类别")
        url += '/enable';
      } else {
        console.log("禁用类别")
        url += '/disable';
      }
      console.log('url=' + url)
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          let message = '将类别[' + category.name + ']的状态改为[' + this.enableText[category.enable] + ']成功!';
          this.$message({
            message: message,
            type: 'success'
          });
        } else { // 否则输出错误信息
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 40400) { // 数据不存在的时候才刷新
          this.loadCategoryList();
        }
      })
    },
    // 处理提交修改
    submitEdit() {
      let url = 'http://localhost:9900/categories/update';
      console.log('url:' + url);
      let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
      console.log('formData=' + formData);
      this.axios.post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '修改分类成功!'
          });
          this.dialogFormVisible = false;
          this.loadCategoryList();
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisible = false;
          this.loadCategoryList();
        }
      })
    },
    // 处理修改前的数据
    handleEdit(category) {
      let message = '您正在尝试编辑【' + category.id + '-' + category.name + '】的相册详情……';
      console.log(message);
      this.dialogFormVisible = true;
      // this.ruleForm = album;
      let url = 'http://localhost:9900/categories/' + category.id + '/selectById';
      console.log(url);
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.ruleForm = responseBody.data;
          this.dialogFormVisible = true;
        } else {
          this.$message.error(responseBody.message);
          this.loadCategoryList();
        }
      })
    },
    handleDelete(category) {
      let url = 'http://localhost:9900/categories/' + category.id + '/deleteById';
      console.log('url=' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.$message.success("删除成功！")
          this.loadCategoryList();
        }
      });
    },
    openDeleteConfirm(category) {
      let message = '此操作将永久删除[' + category.name + ']类别, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(category);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 该方法用来请求相册的列表数据
    loadCategoryList() {
      let url = "http://localhost:9900/categories/listByParent?parentId=" + this.currentParentId // 请求路径
      console.log('url=' + url);
      this.axios.get(url).then((response) => {// 发送异步请求
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.tableData = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
        } else {
          this.$message.error(responseBody.message);
        }
      })
    }
  },
  // (挂载)
  mounted() {
    this.loadCategoryList();
  }
}
</script>