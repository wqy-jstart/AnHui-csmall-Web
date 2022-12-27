<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户已退货订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table border
              :data="tableData"
              style="width: 100%">
      <el-table-column type="expand" align="center">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row>
              <el-form-item label="收货地址:">
                <span>{{ props.row.info }}</span>&nbsp<span>{{ props.row.detailInfo }}</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="备注:">
                <el-tag type="primary" size="medium" style="margin: 0 auto">
                  {{ props.row.tags }}
                </el-tag>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="订单号:">
                <span>{{ props.row.outTradeNo }}</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="流水号:">
                <span>{{ props.row.tradeNo }}</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="付款时间:">
                <span>{{ props.row.time }}</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="商品属性:">
                <el-tag type="success" size="medium" style="margin: 0 auto" v-for="p in props.row.attributeList">
                  {{ p.valueList }}{{ p.unit }}</el-tag>
              </el-form-item>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户 ID"
                       prop="userId">
      </el-table-column>
      <el-table-column label="商品 ID"
                       prop="spuId">
      </el-table-column>
      <el-table-column  label="商品 名称"
                        prop="spuName">
      </el-table-column>
      <el-table-column width="120px"
                       label="手机号码"
                       prop="pnumber">
      </el-table-column>
      <el-table-column label="商品 封面">
        <template slot-scope="scope">
          <img width="100" height="100" :src="scope.row.url" alt="">
        </template>
      </el-table-column>
      <el-table-column label="退货理由:"
                       prop="backText">
      </el-table-column>
      <el-table-column label="交易 金额"
                       prop="totalAmount">
      </el-table-column>
      <el-table-column label="数量"
                       prop="number">
      </el-table-column>
      <el-table-column label="是否支付" width="80" align="center">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.isPay"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" width="80" align="center">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              v-model="scope.row.isDistribute"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否收货" width="80" align="center">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.isTake"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否评价" width="80" align="center">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.isComment"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否退货" width="80" align="center">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.isBack"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"
                     @click="handleEdit(scope.row)">确定
          </el-button>
        </template>
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
    handleEdit(order){
      let message = '您确定要对id为[{'+order.spuId+'}]的商品进行退货处理吗?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormVisible = true;
        let url = this.GLOBAL.productUrl+'usl/' + order.userId + '/' + order.spuId + '/deleteToBack';
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwtToAdmin')
              }
            }).get(url).then((response) => {
          let responseBody = response.data;
          if (responseBody.state == 20000) {
            this.ruleForm = responseBody.data;
            this.$message.success("退货成功!")
            this.loadOrderList();
          } else {
            this.$message.error(responseBody.message);
            this.loadOrderList();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退货'
        });
      })
    },
    // 该方法用来请求订单的列表数据
    loadOrderList() {
      let url = this.GLOBAL.productUrl+'orders/selectListToBack' // 请求路径
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
        console.log(this.tableData)
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadOrderList();
  }
}
</script>