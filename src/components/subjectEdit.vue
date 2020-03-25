<template>
  <div>
    <el-dialog title="编辑学科" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubject()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiSubjectEdit } from "../api/subject";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        //学科编号
        rid: "",
        //学科名称
        name: "",
        //学科简称
        short_name: "",
        //学科简介
        intro: "",
        //学科备注
        remark: "",
        id:"",
      },
      //表单校验
      rules: {
        rid: [
          //非空
          { required: true, message: "请输入学科编号", trigger: "blur" }
        ],
        name: [
          //非空
          { required: true, message: "请输入学科名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    editSubject() {
      this.$refs.form.validate(valid => {
        if (valid) {
          apiSubjectEdit(this.form).then(res => {
            // console.log(res);
            if (res.data.code === 200) {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
              //调用获取数据接口函数 刷新页面
              this.$parent.getSubjectData();
            } else if(res.data.code === 201){
              this.$message.error(res.data.message);
            }
          });
        }
      });
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