<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i>  后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增SPU</el-breadcrumb-item>
      <el-steps style="width: 1000px;height: 60px;margin-left: 30px" process-status="wait" :active="active" align-center finish-status="success">
        <el-step title="1.选择类别"></el-step>
        <el-step title="2.填写基本信息"></el-step>
        <el-step title="3.选择相册"></el-step>
        <el-step title="4.确认商品详情"></el-step>
        <el-step title="5.等待审核..."></el-step>
      </el-steps>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="品牌:" prop="brandId">
            <el-select v-model="ruleForm.brandId" placeholder="请选择">
              <el-option
                  v-for="item in brandListOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="属性模板:" prop="attributeTemplateId">
            <el-select v-model="ruleForm.attributeTemplateId" placeholder="请选择">
              <el-option
                  v-for="item in attributeTemplateListOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="商品名称:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="标题:" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="简介:" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="货号:" prop="typeNumber">
            <el-input v-model="ruleForm.typeNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计件单位:" prop="unit">
            <el-input v-model="ruleForm.unit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品原价:" prop="listPrice">
            <el-input v-model="ruleForm.listPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品现价:" prop="unit">
            <el-input v-model="ruleForm.indexPrice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="库存:" prop="stock">
            <el-input v-model="ruleForm.stock"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="库存阈警值:" prop="stockThreshold">
            <el-input v-model="ruleForm.stockThreshold"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="关键词:" prop="keywords">
        <el-input v-model="ruleForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="标签:" prop="tags">
        <el-input v-model="ruleForm.tags"></el-input>
      </el-form-item>
      <el-form-item label="排序序号:" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="backToPreStep()">上一步</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active:2,
      brandListOptions: [],
      attributeTemplateListOptions:[],
      ruleForm: {
        categoryId: '',
        categoryName: '',
        brandId: null,
        brandName: '',
        attributeTemplateId:'',
        attributeTemplateName:'',
        name: '阜阳格拉条',
        title: '安徽名吃,阜阳市正宗格拉条,精选面料,弹性十足,口味极佳!',
        description: '【品质美食】珠穆朗玛峰特产小麦制造【No.1火热抢购中】',
        typeNumber: '',
        unit: '份',
        listPrice: '40',
        indexPrice: '10',
        stock: '5000',
        stockThreshold: '200',
        keywords: '美食,面条,格拉条',
        tags: '安徽名吃,阜阳名牌,正宗美味!',
        sort: '95'
      },
      rules: {
        brandId: [
          {type: 'number', required: true, message: '请选择品牌', trigger: 'blur'},
        ],
        attributeTemplateId: [
          {type: 'number', required: true, message: '请选择品牌', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
        ],
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
        ],
        description: [
          {required: true, message: '请输入简介', trigger: 'blur'},
        ],
        unit: [
          {required: true, message: '请输入计件单位', trigger: 'blur'},
        ],
        listPrice: [
          {required: true, message: '请输入售价', trigger: 'blur'},
        ],
        indexPrice: [
          {required: true, message: '请输入售价', trigger: 'blur'},
        ],
        typeNumber: [
          {required: true, message: '请输入货号', trigger: 'blur'},
        ],
        stock: [
          {required: true, message: '请输入库存', trigger: 'blur'},
        ],
        stockThreshold: [
          {required: true, message: '请输入库存阈警值', trigger: 'blur'},
        ],
        keywords: [
          {required: true, message: '请输入关键词', trigger: 'blur'},
        ],
        tags: [
          {required: true, message: '请输入标签', trigger: 'blur'},
        ],
        sort: [
          {required: true, message: '请输入排序序号', trigger: 'blur'},
        ],
      }
    };
  },
  methods: {
    // 加载本地的表单中的数据,存放到roleForm中去
    loadLocalRuleForm(){
      let localRuleFormString = localStorage.getItem('ruleForm');
      if (localRuleFormString){
        let localRuleForm = JSON.parse(localRuleFormString);
        if (localRuleForm.brandId){// 如果有品牌id说明从第三个页面过来的
          this.ruleForm = localRuleForm;
        }else {
          this.ruleForm.categoryId = localRuleForm.categoryId;
          this.ruleForm.categoryName = localRuleForm.categoryName;
        }
      }
    },
    backToPreStep() {
      this.$router.push('spu-add-new');
    },
    // 加载品牌列表
    loadBrandList(){
      let url ='http://localhost:9900/brands';
      this.axios.get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.brandListOptions = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    // 加载属性模板列表
    loadAttributeTemplateList(){
      let url = 'http://localhost:9900/attributeTemplates';
      this.axios.get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.attributeTemplateListOptions = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let urlToBrand = 'http://localhost:9900/brands/'+this.ruleForm.brandId+'/selectById';
          console.log('urlToBrand = ' + urlToBrand);
          this.axios.get(urlToBrand).then((response) => {
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              this.ruleForm.brandName = responseBody.data.name;
            } else {
              this.$message.error(responseBody.message);
            }
          });
          let urlToAT = 'http://localhost:9900/attributeTemplates/'+this.ruleForm.attributeTemplateId+'/selectById';
          console.log('urlToAT = ' + urlToAT);
          this.axios.get(urlToAT).then((response) => {
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              this.ruleForm.attributeTemplateName = responseBody.data.name;
              let ruleFormString = JSON.stringify(this.ruleForm);
              console.log('ruleFormString >>> ' + ruleFormString);
              localStorage.setItem('ruleForm', ruleFormString);
              this.$router.push('spu-add-new3');
            } else {
              this.$message.error(responseBody.message);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    randomToTypeNumber(){
      this.ruleForm.typeNumber = "2022"+parseInt(Math.random()*100000000+1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.loadBrandList();
    this.loadLocalRuleForm();
    this.loadAttributeTemplateList();
    this.randomToTypeNumber();
  }
}
</script>