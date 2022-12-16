<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户已发货订单列表</el-breadcrumb-item>
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
                  {{ p.valueList }}{{ p.unit }}
                </el-tag>
              </el-form-item>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户ID"
                       prop="userId">
      </el-table-column>
      <el-table-column label="商品ID"
                       prop="spuId">
      </el-table-column>
      <el-table-column label="商品名称"
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
      <el-table-column label="物流">
        暂未发货
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
                     @click="handleEdit(scope.row)">发货
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出的编辑订单的对话框 -->
    <el-dialog title="发货表单" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="收货地址:">
          <span>{{ ruleForm.info }}</span>
        </el-form-item>
        <el-form-item label="收货详细地址:">
          <span>{{ ruleForm.detailInfo }}</span>
        </el-form-item>
        <el-form-item label="订单号:">
          <span>{{ ruleForm.outTradeNo }}</span>
        </el-form-item>
        <el-form-item label="请选择快递类型:">
          <el-select v-model="ruleForm.logisticsId" placeholder="请选择">
            <el-option
                v-for="item in logisticsListOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="填写备注:" :label-width="formLabelWidth">
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容:"
              v-model="ruleForm.note">
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
      logisticsListOptions:[],
      tableData: [],
      ruleForm:{
        userId:'',
        spuId:'',
        logisticsId:'',
        note:'',
      },
      dialogFormVisible: false,
      formLabelWidth: '115px',
    }
  },
  methods: {
    // 处理提交修改
    submitEdit() {
      let url = 'http://localhost:9900/usl/insert';
      let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToAdmin')
            }
          }).post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '发货成功!'
          });
          this.dialogFormVisible = false;
          this.loadOrderList();
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisible = false;
          this.loadOrderList();
        }
      })
    },
    // 处理发货前的信息
    handleEdit(order) {
      this.loadLogisticsList();
      this.dialogFormVisible = true;
      // this.ruleForm = album;
      let url = 'http://localhost:9900/orders/' + order.userId + '/'+order.spuId+'/selectById';
      console.log(url);
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwtToAdmin')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.ruleForm = responseBody.data;
          this.dialogFormVisible = true;
        } else {
          this.$message.error(responseBody.message);
          this.loadOrderList();
        }
      })
    },
    // 该方法用来请求订单的列表数据
    loadOrderList() {
      let url = "http://localhost:9900/orders/selectToNotDistribute" // 请求路径
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
        console.log(this.tableData)
      })
    },
    loadLogisticsList(){
      let url = 'http://localhost:9900/logistics';
      this.axios
          .create({
        'headers': {
          'Authorization': localStorage.getItem('jwtToAdmin')
        }
      }).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.logisticsListOptions = responseBody.data;
        }else {
          this.$message.error(responseBody.message);
        }
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadOrderList();
  }
}
</script>