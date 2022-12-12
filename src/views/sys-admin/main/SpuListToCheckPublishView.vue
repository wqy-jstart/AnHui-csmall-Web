<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>已上架Spu列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table border
              :data="tableData"
              style="width: 100%">
      <el-table-column type="expand" align="center">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="Spu标题:">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="计价单位:">
              <span>{{ props.row.unit }}</span>
            </el-form-item>
            <el-form-item label="品牌ID:">
              <span>{{ props.row.brandId }}</span>
            </el-form-item>
            <el-form-item label="品牌名称:">
              <span>{{ props.row.brandName }}</span>
            </el-form-item>
            <el-form-item label="分类ID:">
              <span>{{ props.row.categoryId }}</span>
            </el-form-item>
            <el-form-item label="分类名称:">
              <span>{{ props.row.categoryName }}</span>
            </el-form-item>
            <el-form-item label="属性模板ID:">
              <span>{{ props.row.attributeTemplateId }}</span>
            </el-form-item>
            <el-form-item label="相册ID:">
              <span>{{ props.row.albumId }}</span>
            </el-form-item>
            <el-form-item label="关键字列表:">
              <span>{{ props.row.keywords }}</span>
            </el-form-item>
            <el-form-item label="标签列表:">
              <span>{{ props.row.tags }}</span>
            </el-form-item>
            <el-form-item label="当前库存:">
              <span>{{ props.row.stock }}</span>
            </el-form-item>
            <el-form-item label="库存阈警值:">
              <span>{{ props.row.stockThreshold }}</span>
            </el-form-item>
            <el-form-item label="浏览量:">
              <span>{{ props.row.views }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center"
                       label="Spu ID"
                       prop="id">
      </el-table-column>
      <el-table-column width="120px"
                       label="Spu 编号"
                       prop="typeNumber">
      </el-table-column>
      <el-table-column width="120px"
                       label="Spu 名称"
                       prop="name">
      </el-table-column>
      <el-table-column
          label="Spu 描述"
          prop="description">
      </el-table-column>
      <el-table-column width="80px" align="center"
                       label="Spu 价格"
                       prop="listPrice">
      </el-table-column>
      <el-table-column width="80px" align="center"
                       label="Spu 销量"
                       prop="sales">
      </el-table-column>
      <el-table-column width="80px" align="center"
                       label="Spu 排序"
                       prop="sort">
      </el-table-column>
      <el-table-column label="是否上架" width="80" align="center">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              @change="changePublished(scope.row)"
              v-model="scope.row.isPublished"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#aaaaaa">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否推荐" width="80" align="center">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              @change="changeRecommend(scope.row)"
              v-model="scope.row.isRecommend"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#aaaaaa">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否审核" width="80" align="center">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              @change="changeChecked(scope.row)"
              v-model="scope.row.isChecked"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#aaaaaa">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"
                     @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini"
                     @click="openDeleteConfirm(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出的编辑相册的对话框 -->
    <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="Spu名称" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Spu标题" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Spu描述" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.listPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签列表" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.tags" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序序号" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Spu详情" :label-width="formLabelWidth">
          <el-input
              type="textarea"
              rows="2"
              placeholder="请输入Spu详情内容:"
              v-model="ruleForm.detail">
          </el-input>
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
      ruleForm: {},
      formLabelWidth: '120px'
    }
  },
  methods: {

    // 处理提交修改
    submitEdit() {
      let url = 'http://localhost:9900/spu/update';
      console.log('url:' + url);
      let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
      this.axios.post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '修改Spu成功!'
          });
          this.dialogFormVisible = false;
          this.loadSpuListToCheck();
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisible = false;
          this.loadSpuListToCheck();
        }
      })
    },
    // 处理修改前的数据
    handleEdit(spu) {
      let message = '您正在尝试编辑【' + spu.id + '-' + spu.name + '】的相册详情……';
      console.log(message);
      this.dialogFormVisible = true;
      // this.ruleForm = album;
      let url = 'http://localhost:9900/spu/' + spu.id + '/selectById';
      console.log(url);
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.ruleForm = responseBody.data;
          this.dialogFormVisible = true;
        } else {
          this.$message.error(responseBody.message);
          this.loadSpuListToCheck();
        }
      })
    },
    // 修改是否上架
    changePublished(spu){
      let enableText = ['下架', '上架'];
      let url = 'http://localhost:9900/spu/' + spu.id;
      if (spu.isPublished === 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        url += '/publish';
      } else {
        url += '/notPublish';
      }
      console.log('url=' + url)
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state === 20000) {
          let message = '将SPU[' + spu.name + ']的状态改为[' + enableText[spu.isPublished] + ']成功!';
          this.$message({
            message: message,
            type: 'success'
          });
        } else { // 否则输出错误信息
          this.loadSpuListToCheck();
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 40400) { // 数据不存在的时候才刷新
          this.loadSpuListToCheck();
        }
      })
    },
    // 修改是否推荐
    changeRecommend(spu){
      let enableText = ['推荐', '不推荐'];
      let url = 'http://localhost:9900/spu/' + spu.id;
      if (spu.isRecommend === 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        url += '/recommend';
      } else {
        url += '/notRecommend';
      }
      console.log('url=' + url)
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state === 20000) {
          let message = '将SPU[' + spu.name + ']的状态改为[' + enableText[spu.isRecommend] + ']成功!';
          this.$message({
            message: message,
            type: 'success'
          });
        } else { // 否则输出错误信息
          this.loadSpuListToCheck();
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 40400) { // 数据不存在的时候才刷新
          this.loadSpuListToCheck();
        }
      })
    },
    // 修改是否审核
    changeChecked(spu){
      let enableText = ['已审核', '未审核'];
      let url = 'http://localhost:9900/spu/' + spu.id;
      if (spu.isChecked === 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        url += '/check';
      } else {
        url += '/notCheck';
      }
      console.log('url=' + url)
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state === 20000) {
          let message = '将SPU[' + spu.name + ']的状态改为[' + enableText[spu.isChecked] + ']成功!';
          this.$message({
            message: message,
            type: 'success'
          });
        } else { // 否则输出错误信息
          this.loadSpuListToCheck();
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 40400) { // 数据不存在的时候才刷新
          this.loadSpuListToCheck();
        }
      })
    },
    handleDelete(spu) {
      let url = 'http://localhost:9900/spu/' + spu.id + '/deleteById';
      console.log('url=' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.$message.success("删除成功！")
          this.loadSpuListToCheck();
        }
      });
    },
    openDeleteConfirm(brand) {
      let message = '此操作将永久删除[' + brand.name + ']SPU, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(brand);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    loadSpuListToCheck(){
      let url = 'http://localhost:9900/spu/selectByPC';
      this.axios.get(url).then((response)=>{
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
    this.loadSpuListToCheck();
  }
}
</script>