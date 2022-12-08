<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>相册列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="图片id" width="80" align="center"></el-table-column>
      <el-table-column prop="albumId" label="相册id" width="180" align="center"></el-table-column>
      <el-table-column prop="url" label="图片" align="center" header-align="center">
        <template slot-scope="scope">
<!--        <el-avatar shape="square" :size="100" :src="scope.row.url"></el-avatar>-->
          <img :width="scope.row.width" :height="scope.row.height" :src="scope.row.url" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="description" label="图片描述" width="240px" header-align="center"></el-table-column>
      <el-table-column prop="width" label="图片宽" align="center" header-align="center"></el-table-column>
      <el-table-column prop="height" label="图片高" align="center" header-align="center"></el-table-column>
      <el-table-column label="是否作为封面" width="180" align="center">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              @change="changeCover(scope.row)"
              v-model="scope.row.isCover"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#aaaaaa">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序序号" width="80" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"
                     @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini"
                     @click="openDeleteConfirm(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--    &lt;!&ndash; 弹出的编辑相册的对话框 &ndash;&gt;-->
<!--    <el-dialog title="修改相册" :visible.sync="dialogFormVisible">-->
<!--      <el-form :model="ruleForm">-->
<!--        <el-form-item label="相册名称" :label-width="formLabelWidth">-->
<!--          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="相册描述" :label-width="formLabelWidth">-->
<!--          <el-input v-model="ruleForm.description" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="排序序号" :label-width="formLabelWidth">-->
<!--          <el-input v-model="ruleForm.sort" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="submitEdit()">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // dialogFormVisible: false,
      // ruleForm: {
      //   id: '',
      //   name: '',
      //   description: '',
      //   sort: ''
      // },
      // formLabelWidth: '120px'
    }
  },
  methods: {
    // // 处理提交修改
    // submitEdit() {
    //   let url = 'http://localhost:9900/albums/update';
    //   console.log('url:' + url);
    //   let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
    //   console.log('formData=' + formData);
    //   this.axios.post(url, formData).then((response) => {
    //     let responseBody = response.data;
    //     if (responseBody.state == 20000) {
    //       this.$message({
    //         type: 'success',
    //         message: '修改相册成功!'
    //       });
    //       this.dialogFormVisible = false;
    //       this.loadAlbumList();
    //     } else if (responseBody.state == 40900) {
    //       this.$message.error(responseBody.message);
    //     } else {
    //       this.$message.error(responseBody.message);
    //       this.dialogFormVisible = false;
    //       this.loadAlbumList();
    //     }
    //   })
    // },
    // // 处理修改前的数据
    // handleEdit(album) {
    //   let message = '您正在尝试编辑【' + album.id + '-' + album.name + '】的相册详情……';
    //   console.log(message);
    //   this.dialogFormVisible = true;
    //   // this.ruleForm = album;
    //   let url = 'http://localhost:9900/albums/' + album.id + '/selectById';
    //   console.log(url);
    //   this.axios.get(url).then((response) => {
    //     let responseBody = response.data;
    //     if (responseBody.state == 20000) {
    //       this.ruleForm = responseBody.data;
    //       this.dialogFormVisible = true;
    //     } else {
    //       this.$message.error(responseBody.message);
    //       this.loadAlbumList();
    //     }
    //   })
    // },
    handleDelete(picture) {
      let url = 'http://localhost:9900/pictures/' + picture.id + '/deleteById';
      console.log('url=' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.$message.success("删除成功！")
          this.loadPictureList();
        }
      });
    },
    openDeleteConfirm(picture) {
      let message = '此操作将永久删除id为[' + picture.id + ']的图片, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(picture);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 该方法用来请求相册的列表数据
    loadPictureList() {
      let url = "http://localhost:9900/pictures" // 请求路径
      console.log('url=' + url);
      this.axios.get(url).then((response) => {// 发送异步请求
        let responseBody = response.data;
        this.tableData = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadPictureList();
  }
}
</script>