<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>


    <el-table :data="tableData" border style="width: 80%">
      <el-table-column prop="id" label="轮播图id" width="100" align="center"></el-table-column>
      <el-table-column prop="spuId" label="对应商品id" width="120" align="center"></el-table-column>
      <el-table-column
          label="轮播图"
          width="240"
          align="center">
        <template slot-scope="scope">
          <img style="width: 150px;height: 100px" :src="scope.row.url" width="100%">
        </template>
      </el-table-column>
      <el-table-column prop="description" label="轮播图简介" width="240"></el-table-column>
      <el-table-column label="是否启用" width="120" align="center">
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
      <el-table-column prop="sort" label="轮播图排序" width="120" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"
                     @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini"
                     @click="openDeleteConfirm(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出的编辑轮播图的对话框 -->
    <el-dialog title="修改轮播图" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="轮播图片" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品spuId" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.spuId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="轮播图简介" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.description" autocomplete="off"></el-input>
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
      tableData: [],
      dialogFormVisible: false,
      ruleForm: {
        id: '',
        url: '',
        spuId:'',
        description: '',
        sort: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 处理提交修改
    submitEdit() {
      let url = 'http://localhost:9900/banners/update';
      console.log('url:' + url);
      let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
      console.log('formData=' + formData);
      this.axios.post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '修改轮播图成功!'
          });
          this.dialogFormVisible = false;
          this.loadBannerList();
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisible = false;
          this.loadBannerList();
        }
      })
    },
    // 处理修改前的数据
    handleEdit(banner) {
      this.dialogFormVisible = true;
      // this.ruleForm = album;
      let url = 'http://localhost:9900/banners/' + banner.id + '/selectById';
      console.log(url);
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.ruleForm = responseBody.data;
          this.dialogFormVisible = true;
        } else {
          this.$message.error(responseBody.message);
          this.loadBannerList();
        }
      })
    },
    // 修改封面状态
    changeEnable(banner) {
      console.log('banner id=' + banner.id);
      //点击后获取的enable值
      console.log('banner enable=' + banner.enable);
      let enableText = ['禁用', '启用'];
      let url = 'http://localhost:9900/banners/' + banner.id;
      if (banner.enable === 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        console.log("设置启用")
        url += '/enable';
      } else {
        console.log("设置禁用")
        url += '/disable';
      }
      console.log('url=' + url)
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state === 20000) {
          let message = '将图片[' + banner.id + ']的状态改为[' + enableText[banner.enable] + ']成功!';
          this.$message({
            message: message,
            type: 'success'
          });
        } else { // 否则输出错误信息
          this.$message.error(responseBody.message);
          this.loadBannerList();
        }
        if (responseBody.state == 40400) { // 数据不存在的时候才刷新
          this.loadBannerList();
        }
      })
    },
    handleDelete(banner) {
      let url = 'http://localhost:9900/banners/' +banner.id + '/deleteById';
      console.log('url=' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.$message.success("删除成功！")
          this.loadBannerList();
        }
      });
    },
    openDeleteConfirm(album) {
      let message = '此操作将永久删除id为[' + album.id + ']的轮播图, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(album);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 该方法用来请求轮播图的列表数据
    loadBannerList() {
      let url = "http://localhost:9900/banners/" // 请求路径
      console.log('url=' + url);
      this.axios.get(url).then((response) => {// 发送异步请求
        let responseBody = response.data;
        this.tableData = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadBannerList();
  }
}
</script>