<template>
  <div>
    <el-dialog title="新增企业" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEnterprise()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {apiEnterpriseAdd} from '../api/enterprise'
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        //企业编号
        eid: "",
        //企业名称
        name: "",
        //企业简称
        short_name: "",
        //企业简介
        intro: "",
        //企业备注
        remark: ""
      },
      //表单校验
      rules: {
        eid: [
          //非空
          { required: true, message: "请输入企业编号", trigger: "blur" }
        ],
        name: [
          //非空
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        short_name: [
          //非空
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [
          //非空
          { required: true, message: "请输入企业简介", trigger: "blur" }
        ]
      }
    };
  },
  methods:{
      addEnterprise(){
      // 调用 form 的验证方法
      this.$refs.form.validate(valid => {
        if(valid){
          apiEnterpriseAdd(this.form).then(res=>{
            console.log(res);
            if(res.data.code===200){
              this.$message.success("新增成功");
              this.dialogFormVisible=false;
              //重置表单数据(只能重置有表当验证的内容)
              this.$refs.form.resetFields();
              //手动重置数据
              this.form.remark="";
              //调用获取数据接口函数 刷新页面
              this.$parent.getEnterpriseData()
            }
            
          })
        }else{
          console.log("校验失败");
        }
      })
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  text-align: center;
  padding: 0px;
  height: 53px;
  background: linear-gradient(to right, #0dc1ef, #1394fc);
  .el-dialog__title {
    color: #fff;
  }
}
.dialog-footer {
  text-align: center;
}
</style>