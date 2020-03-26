<template>
  <div>
    <el-dialog
      :title="isEdit?'编辑企业':'新增企业'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
          <el-select class="long" v-model="form.role_id">
            <el-option label="所有" value></el-option>
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select class="long" v-model="form.status">
            <el-option label="启动" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="userBtn()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiUserEdit, apiUserAdd } from "../api/user";
export default {
  data() {
    //手机号码校核方法
    var checkPhone = (rule, value, callback) => {
      //定义手机号码的正则表达式
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      //判断参数是否与正则是否匹配
      if (reg.test(value)) {
        //匹配成功
        callback();
      } else {
        //匹配失败
        callback(new Error("请输入正确的手机号码"));
      }
    };
    //邮箱校核方法
    var checkMail = (rule, value, callback) => {
      //定义邮箱的正则表达式
      var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      //判断参数是否与正则是否匹配
      if (reg.test(value)) {
        //匹配成功
        callback();
      } else {
        //匹配失败
        callback(new Error("请输入正确的邮箱"));
      }
    };
    return {
      isEdit: true,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      //表单校验
      rules: {
        username: [
          //非空
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          //非空
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkMail, trigger: "blur" }
        ],
        phone: [
          //非空
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        role_id: [
          //非空
          { required: true, message: "请选择角色", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    userBtn() {
      if (this.isEdit) {
        this.$refs.form.validate(valid => {
          if (valid) {
            apiUserEdit(this.form).then(res => {
              if (res.data.code === 200) {
                this.$message.success("编辑成功");
                this.dialogFormVisible = false;
                //调用获取数据接口函数 刷新页面
                this.$parent.getUserData();
              } else if (res.data.code === 201) {
                this.$message.error(res.data.message);
              }
            });
          }
        });
      } else {
        // 调用 form 的验证方法
        this.$refs.form.validate(valid => {
          if (valid) {
            apiUserAdd(this.form).then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.$message.success("新增成功");
                this.dialogFormVisible = false;
                //重置表单数据(只能重置有表当验证的内容)
                this.$refs.form.resetFields();
                //手动重置数据
                this.form.remark = "";
                //调用获取数据接口函数 刷新页面
                this.$parent.getUserData();
              }
            });
          } else {
            console.log("校验失败");
          }
        });
      }
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
  text-align: right;
}
</style>