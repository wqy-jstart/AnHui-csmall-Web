<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table border
              :data="tableData"
              style="width: 100%">
      <el-table-column type="expand" align="center">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单号:">
              <span>{{ props.row.outTradeNo }}</span>
            </el-form-item>
            <el-form-item label="流水号:">
              <span>{{ props.row.tradeNo }}</span>
            </el-form-item>
            <el-form-item label="付款时间:">
              <span>{{ props.row.time }}</span>
            </el-form-item>
            <el-form-item label="商品属性:">
              <el-row>
                <el-col span="3" style="font-size: 15px;color: #666" v-for="p in tableData.attributeList">
                  <el-tag type="success">{{p.valueList }}{{ p.row.unit }}</el-tag>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center"
                       label="用户 ID"
                       prop="userId">
      </el-table-column>
      <el-table-column width="120px"
                       label="商品 ID"
                       prop="spuId">
      </el-table-column>
      <el-table-column width="120px"
                       label="商品 名称"
                       prop="spuName">
      </el-table-column>
      <el-table-column width="120px"
                       label="商品 封面"
                       prop="url">
      </el-table-column>
      <el-table-column width="120px"
                       label="物流"
                       prop="logisticsName">
      </el-table-column>
      <el-table-column width="120px"
                       label="交易 金额"
                       prop="totalAmount">
      </el-table-column>
      <el-table-column width="120px"
                       label="数量"
                       prop="number">
      </el-table-column>
      <el-table-column label="是否支付" width="80" align="center">
        <el-switch
            v-model="isPay"
            disabled>
        </el-switch>
      </el-table-column>
      <el-table-column label="是否发货" width="80" align="center">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              @change="changeDistribute(scope.row)"
              v-model="scope.row.isDistribute"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#aaaaaa">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否收货" width="80" align="center">
        <el-switch
            v-model="isTake"
            disabled>
        </el-switch>
      </el-table-column>
      <el-table-column label="是否评价" width="80" align="center">
        <el-switch
            v-model="isComment"
            disabled>
        </el-switch>
      </el-table-column>
      <el-table-column label="是否退货" width="80" align="center">
        <el-switch
            v-model="isBack"
            disabled>
        </el-switch>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [

      ],
    }
  },
  methods: {
    // 改变管理员状态
    changeEnable(admin) {
      console.log('admin id=' + admin.id);
      //点击后获取的enable值
      console.log('admin enable=' + admin.enable);
      let enableText = ['禁用', '启用'];
      let url = 'http://localhost:9081/admins/' + admin.id;
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
            'headers':{
              'Authorization':localStorage.getItem('jwtToAdmin')
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
    // 该方法用来请求订单的列表数据
    loadAdminList() {
      console.log('loadAdminList');
      console.log('在localStorage中的JWT数据:' + localStorage.getItem('jwt'))
      let url = "http://localhost:9081/admins" // 请求路径
      console.log('url=' + url);
      // .create方法会返回一个axios对象,可在其中配置请求头
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToAdmin')
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