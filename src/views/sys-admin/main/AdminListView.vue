<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <!-- prop必须是服务器绑定的属性名 -->
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="120" align="center"></el-table-column>
      <el-table-column label="头像url" width="100px">
        <template slot-scope="scope">
          <!--          <img :src="scope.row.avatar" width="120" height="120" alt="">-->
          <div class="block">
            <el-avatar :size="80" :src="scope.row.avatar"></el-avatar>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120" align="center"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" width="180" align="center"></el-table-column>
      <el-table-column prop="description" label="管理员简介" header-align="center"></el-table-column>
      <el-table-column label="是否启用" width="80" align="center">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              @change="changeEnable(scope.row)"
              v-model="scope.row.enable"
              :disabled="scope.row.id == 1"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#aaaaaa">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="loginCount" label="累计登录次数" width="180" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"
                     :disabled="scope.row.id == 1"
                     @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini"
                     :disabled="scope.row.id == 1"
                     @click="openDeleteConfirm(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出的编辑相册的对话框 -->
    <el-dialog title="修改管理员信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="管理员昵称:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码:" :label-width="formLabelWidth">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员头像:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.avatar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员电话号码:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员电子邮箱:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
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
      tableData: [],
      dialogFormVisible: false,
      ruleForm: {
        username: '',
        password: '',
        avatar: '',
        phone: '',
        email: '',
      },
      formLabelWidth: '120px',
    }
  },
  methods: {
    // 改变管理员状态
    changeEnable(admin) {
      console.log('admin id=' + admin.id);
      //点击后获取的enable值
      console.log('admin enable=' + admin.enable);
      let enableText = ['禁用', '启用'];
      let url = 'http://localhost:9901/admins/' + admin.id;
      if (admin.enable == 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        console.log("启用管理员")
        url += '/enable';
      } else {
        console.log("禁用管理员")
        url += '/disable';
      }
      console.log('url=' + url)
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToAdmin')
            }
          })
          .post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          let message = '将管理员[' + admin.username + ']的启用状态改为[' + enableText[admin.enable] + ']成功!';
          this.$message({
            message: message,
            type: 'success'
          });
        } else { // 否则输出错误信息
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 40400) { // 数据不存在的时候才刷新
          this.loadAlbumList();
        }
      })
    },
    // 处理提交修改
    submitEdit() {
      let url = 'http://localhost:9901/admins/update';
      console.log('url:' + url);
      let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
      console.log('formData=' + formData);
      this.axios.create({
        'headers': {
          'Authorization': localStorage.getItem('jwtToAdmin')
        }
      }).post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '修改管理员成功!'
          });
          this.dialogFormVisible = false;
          this.loadAdminList();
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisible = false;
          this.loadAdminList();
        }
      })
    },
    // 处理修改前的数据
    handleEdit(admin) {
      let message = '您正在尝试编辑【' + admin.id + '-' + admin.nickname + '】的管理员详情……';
      console.log(message);
      this.dialogFormVisible = true;
      // this.ruleForm = album;
      let url = 'http://localhost:9901/admins/' + admin.id + '/selectById';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToAdmin')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.ruleForm = responseBody.data;
          this.dialogFormVisible = true;
        } else {
          this.$message.error(responseBody.message);
          this.loadAdminList();
        }
      })
    },
    // 根据id删除管理员
    handleDelete(admin) {
      let url = 'http://localhost:9901/admins/' + admin.id + '/deleteById';
      console.log('url=' + url);
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToAdmin')
            }
          })
          .post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.$message.success("删除成功！")
          this.loadAdminList();
        }
      });
    },
    openDeleteConfirm(admin) {
      let message = '此操作将永久删除[' + admin.username + ']管理员, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(admin);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 该方法用来请求管理员的列表数据
    loadAdminList() {
      console.log('loadAdminList');
      console.log('在localStorage中的JWT数据:' + localStorage.getItem('jwt'))
      let url = "http://localhost:9901/admins" // 请求路径
      console.log('url=' + url);
      // .create方法会返回一个axios对象,可在其中配置请求头
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwtToAdmin')
            }
          })
          .get(url).then((response) => {// 发送异步请求
        let responseBody = response.data;
        this.tableData = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadAdminList();
  }
}
</script>