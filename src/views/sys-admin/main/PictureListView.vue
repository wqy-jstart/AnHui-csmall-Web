<head>
<meta name="referrer" content="no-referrer">
</head>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>图片列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <!--根据相册查询图片信息的功能-->
    <el-form :model="album" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="请选择相册:">
        <el-select v-model="album.id" placeholder="请选择" @change="loadPictureListByAlbum()">
          <el-option
              v-for="item in albumListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
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
    <el-button style="margin-top: 10px;float: right;"
               v-show="isDisplay"
               @click="goBack()">返回
    </el-button>

    <!-- 弹出的编辑相册的对话框 -->
    <el-dialog title="修改图片" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="请选择归属的相册:">
          <el-select v-model="ruleForm.albumId" placeholder="请选择" @change="loadPictureListByAlbum()">
            <el-option
                v-for="item in albumListOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片路径:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片描述:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片宽:" :label-width="formLabelWidth">
          <el-radio-group v-model="ruleForm.width">
            <el-radio :label="100">100px</el-radio>
            <el-radio :label="200">200px</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片高:" :label-width="formLabelWidth">
          <el-radio-group v-model="ruleForm.height">
            <el-radio :label="100">100px</el-radio>
            <el-radio :label="200">200px</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序序号:" :label-width="formLabelWidth">
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
      album:{},
      albumListOptions:[],
      dialogFormVisible: false,
      ruleForm: {
        id:'',
        albumId:'',
        url:'',
        description:'',
        width:'',
        height:'',
        isCover:'1',
        sort:'',
      },
      formLabelWidth: '120px',
      isDisplay: false,
    }
  },
  methods: {
    // 处理提交修改
    submitEdit() {
      let url = 'http://localhost:9900/pictures/update';
      console.log('url:' + url);
      let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
      console.log('formData=' + formData);
      this.axios.post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '修改图片成功!'
          });
          this.dialogFormVisible = false;
          this.loadPictureList();
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisible = false;
          this.loadPictureList();
        }
      })
    },
    // 修改封面状态
    changeCover(picture) {
      console.log('picture id=' + picture.id);
      //点击后获取的enable值
      console.log('picture enable=' + picture.isCover);
      let enableText = ['禁用', '启用'];
      let url = 'http://localhost:9900/pictures/' + picture.id;
      if (picture.isCover === 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        console.log("设置封面")
        url += '/isCover';
      } else {
        console.log("设置非封面")
        url += '/isNotCover';
      }
      console.log('url=' + url)
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state === 20000) {
          let message = '将图片[' + picture.id + ']的状态改为[' + enableText[picture.isCover] + ']成功!';
          this.$message({
            message: message,
            type: 'success'
          });
        } else { // 否则输出错误信息
          this.$message.error(responseBody.message);
          this.loadPictureList();
        }
        if (responseBody.state == 40400) { // 数据不存在的时候才刷新
          this.loadPictureList();
        }
      })
    },
    // 处理修改前的数据
    handleEdit(picture) {
      this.loadAlbumList();// 加载相册信息
      this.dialogFormVisible = true;
      let url = 'http://localhost:9900/pictures/' + picture.id + '/selectById';
      console.log(url);
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.dialogFormVisible = true;
          this.ruleForm = responseBody.data;
          console.log(this.ruleForm);
        } else {
          this.$message.error(responseBody.message);
          this.loadPictureList();
        }
      })
    },
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
    // 根据相册id查询图片列表
    loadPictureListByAlbum(){
      let url = 'http://localhost:9900/pictures/selectListToAlbumId?albumId='+this.album.id;
      this.axios.get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.tableData = responseBody.data;
          this.isDisplay = true;
        }else {
          this.$message.error(responseBody.message);
        }
      })
    },
    // 返回起始列表
    goBack(){
      this.loadPictureList();
      this.album.id = '';
      this.isDisplay = false;
    },
    // 加载相册的数据
    loadAlbumList(){
      let url = 'http://localhost:9900/albums';
      this.axios.get(url).then((response)=>{
        let  responseBody = response.data;
        if (responseBody.state == 20000){
          this.albumListOptions = responseBody.data;
        }else {
          this.$message.error(responseBody.message);
        }
      })
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
    this.loadAlbumList();
  }
}
</script>