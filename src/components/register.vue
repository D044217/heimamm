<template>
  <el-dialog
    class="regDialog"
    :close-on-click-modal="false"
    title="用户注册"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="头像" prop="icon" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :action="imgUpload"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="iconUrl" :src="iconUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName" :label-width="formLabelWidth">
        <el-input v-model="form.nickName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail" :label-width="formLabelWidth">
        <el-input v-model="form.mail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="imgCode" :label-width="formLabelWidth">
        <!-- 使用栅格系统来添加内容 -->
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.imgCode"></el-input>
          </el-col>
          <el-col class="imgBox" :span="6" :offset="1">
            <img class="imgCode" :src="imgUrl" @click="changeImg" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="loginCode" :label-width="formLabelWidth">
        <!-- 使用栅格系统来添加内容 -->
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.loginCode"></el-input>
          </el-col>
          <el-col class="imgBox" :span="6" :offset="1">
            <el-button :disabled="time !== 0" @click="getCode">{{time===0?"获取用户验证码":time}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="onSubmit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//
import { getCodeApi } from "../api/register";
import { registerApi } from "../api/register";

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
      iconUrl: "", //头像照片路径
      dialogFormVisible: false, //控制注册表单显示隐藏
      formLabelWidth: "67px", //说明文本宽度
      imgUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now(), //验证码图片路径
      // form数据源
      form: {
        nickName: "",
        mail: "",
        phone: "",
        password: "",
        imgCode: "",
        loginCode: "",
        icon: ""
      },
      //表单校验
      rules: {
        nickName: [
          //非空
          { required: true, message: "昵称不能为空", trigger: "blur" },
          //长度
          { min: 2, max: 6, message: "昵称最少2位,最多6位", trigger: "blur" }
        ],
        mail: [
          //非空
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          //长度
          { validator: checkMail, trigger: "blur" }
        ],
        phone: [
          //非空
          { required: true, message: "手机号不能为空", trigger: "blur" },

          { validator: checkPhone, trigger: "blur" }
        ],
        password: [
          //非空
          { required: true, message: "密码不能为空", trigger: "blur" },
          //长度
          {
            min: 8,
            max: 16,
            message: "密码为最少8位,最多16位",
            trigger: "blur"
          }
        ],
        imgCode: [
          //非空
          { required: true, message: "图形码不能为空", trigger: "blur" },
          //长度
          { min: 4, max: 4, message: "图形码为四位字符", trigger: "blur" }
        ],
        loginCode: [
          //非空
          { required: true, message: "验证码不能为空", trigger: "blur" },
          //长度
          { min: 4, max: 4, message: "验证码为四位字符", trigger: "blur" }
        ],
        icon: [
          //非空
          { required: true, message: "必须上传头像", trigger: "blur" }
        ]
      },
      //计时器
      timer: null,
      time: 0,
      // 上传的地址：
      imgUpload: process.env.VUE_APP_URL + `/uploads`,
      // 上传之后的图片内容
      imageUrl: null
    };
  },
  methods: {
    //取消按钮
    cancle() {
      //重置表单数据
      this.$refs.form.resetFields();
      //手动清除图片
      this.imgUrl = "";
      //关闭注册界面
      this.dialogFormVisible = false;
    },
    //注册按钮
    onSubmit() {
      // 调用 form 的验证方法
      this.$refs.form.validate(valid => {
        // valid 就是验证后返回的数据
        if (valid) {
          //注册接口函数调用
          registerApi(
            this.form.nickName,
            this.form.phone,
            this.form.mail,
            this.form.icon,
            this.form.password,
            this.form.loginCode
          ).then(res => {
            if (res.data.code == 200) {
              this.$message.success("注册成功");
              this.dialogFormVisible = false;
              //重置表单数据
              this.$refs.form.resetFields();
              //手动清除图片
              this.imgUrl = "";
            } else {
              this.$message.error("注册失败");
            }
          });
        } else {
          // 验证不通过的逻辑
          this.$message.error("注册不通过");
        }
      });
    },
    //刷新验证码
    changeImg() {
      this.imgUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    //获取短信验证码
    getCode() {
      //验证手机号码是否符合要求
      var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!phoneReg.test(this.form.phone)) {
        this.$message.error("手机号码格式不正确");
        return;
      }
      //验证图形验证是否符合要求
      if (this.form.imgCode.trim().length != 4) {
        this.$message.error("验证码不正确");
        return;
      }
      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        if (this.time === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
      //调用请求验证码api函数
      getCodeApi(this.form.imgCode, this.form.phone)
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success("手机验证码为" + res.data.data.captcha);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //头像上传成功回调函数
    handleAvatarSuccess(res, file) {
      this.iconUrl = URL.createObjectURL(file.raw);
      // 给 avator 赋值
      this.form.icon = res.data.file_path;
      // console.log(res.data.file_path) // 上传过来的图片的路径
      // 单独给 icon 参数进行验证
      this.$refs.form.validateField("icon");
    },
    //头像上传之前的回调函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
      //  return isJPG
    }
  }
};
</script>

<style lang="less">
.regDialog {
  // .el-dialog{
  //     width: 600px;
  // }
  .el-dialog__header {
    text-align: center;
    padding: 0px;
    height: 53px;
    line-height: 53px; // 设置背景为渐变色
    background: linear-gradient(to right, #0dc1ef, #1394fc);
    .el-dialog__title {
      color: #fff;
    }
  }
  .imgBox {
    height: 41px;
    text-align: right;
    .imgCode {
      width: 143px;
      height: 41px;
    }
  }
  .dialog-footer {
    text-align: center;
  }
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.el-icon-plus:before {
  content: "\e6d9";
  display: block;
  margin-top: 78px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>