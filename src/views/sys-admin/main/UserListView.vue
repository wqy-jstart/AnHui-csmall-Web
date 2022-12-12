<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="user" border style="width: 100%">
      <el-table-column prop="id" label="用户id" width="80"/>
      <el-table-column prop="username" label="用户名" width="180"/>
      <el-table-column prop="avatar" label="用户头像" align="center" header-align="center" width="100px">
        <template slot-scope="scope">
          <!--          <img :src="scope.row.avatar" width="120" height="120" alt="">-->
          <div class="block"><el-avatar :size="80" :src="scope.row.avatar"></el-avatar></div>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="用户昵称" align="center" header-align="center" width="100px"/>
      <el-table-column prop="gender" label="用户性别" align="center" header-align="center" width="100px"/>
      <el-table-column prop="age" label="用户年龄" align="center" width="80"/>
      <el-table-column prop="email" label="电子邮箱"/>
      <el-table-column prop="sign" label="个性签名"/>
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <el-button type="success" size="mini"
                     @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini"
                     @click="openDeleteConfirm(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
    }
  },
  methods: {
    // 处理修改的数据
    handleEdit(album) {
    },
    handleDelete(user) {
      let url = 'http://localhost:9900/users/' + user.id + '/deleteById';
      console.log('url=' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.$message.success("删除成功！")
          this.loadAlbumList();
        }
      });
    },
    openDeleteConfirm(user) {
      let message = '此操作将永久删除[' + user.username + ']用户, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(user);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 该方法用来请求用户的列表数据
    loadAlbumList() {
      let url = "http://localhost:9900/users" // 请求路径
      console.log('url=' + url);
      this.axios.get(url).then((response) => {// 发送异步请求
        let responseBody = response.data;
        this.user = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadAlbumList();
  }
}
</script>