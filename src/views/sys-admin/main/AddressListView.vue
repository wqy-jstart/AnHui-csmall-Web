<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>收货地址列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="address" border style="width: 60%">
      <el-table-column prop="id" label="收货地址id" width="120" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户id" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="收货地址" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="mini"
                     @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger"size="mini"
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
      address: [],
    }
  },
  methods: {
    handleDelete(address) {
      let url = 'http://localhost:9900/addresses/' + address.id + '/deleteById';
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
    openDeleteConfirm(address) {
      let message = '此操作将永久删除[' + address.name + ']收货地址, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(address);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 该方法用来请求收货地址的列表数据
    loadAlbumList() {
      console.log('loadAlbumList');
      let url = "http://localhost:9900/addresses" // 请求路径
      console.log('url=' + url);
      this.axios.get(url).then((response) => {// 发送异步请求
        let responseBody = response.data;
        this.address = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadAlbumList();
  }
}
</script>