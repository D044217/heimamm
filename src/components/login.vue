<template>
  <div class="login">
    <div class="leftBox">
      <div class="title">
        <img class="titleImg" src="../assets/title-login.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLine"></span>
        <span class="titleUse">用户登录</span>
      </div>
      <el-form class="loginform" :rules="rules" ref="form" :model="form" label-width="0px">
        <el-form-item prop="phone" >
          <el-input prefix-icon="el-icon-user"  placeholder="请输入手机号" v-model="form.phone"></el-input>
        </el-form-item >
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock"  type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="logincode">
          <!-- 使用栅格系统来添加内容 -->
          <el-row>
            <el-col :span="16">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="form.logincode"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="loginCode" src="../assets/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="checkboxheight" prop="isCheck">
          <el-checkbox-group v-model="form.isCheck">
            <el-checkbox name="type">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginbnt" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="loginbnt" >注册</el-button>
    </div>
    <div class="rightImg">
      <img src="../assets/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // 手机号
        phone: "",
        // 密码
        password: "",
        // 验证码
        logincode: "",
        // 是否阅读
        isCheck: []
      },
       rules: {
          phone: [
            //非空
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            //长度
            { min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          password: [
           // 非空：
          { required: true, message: '密码不能为空', trigger: 'blur' },
          // 长度
          { min: 6, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          logincode: [
           // 非空：
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          // 长度
          { min: 4, max: 4, message: '验证码为4个字符', trigger: 'blur' }
          ],
           isCheck: [
            { type: 'array', required: true, message: '请阅读并同意用户协议和隐私条款', trigger: 'change' }
          ],
         
        }
    };
  },
  methods: {
    onSubmit() {
        // 调用 form 的验证方法
      this.$refs.form.validate(valid => {
        // valid 就是验证后返回的数据
        if (valid) {
          // 验证通过的逻辑
          this.$message({
            message: '验证通过',
            type: 'success'
          })
        } else {
          // 验证不通过的逻辑
          this.$message.error('验证不通过')
        }
      })
    
      },
  }
};
</script>

<style lang='less'>
.login {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  /* 让两者左右间隔相等 */
  justify-content: space-around;
  /* 设置上下居中 */
  align-items: center;
  .leftBox {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    box-sizing: border-box;
    padding: 48px 42px 86px;
    .title {
      display: flex;
      /* 上下对齐 */
      align-items: center;
      .titleImg {
        width: 22px;
        height: 17px;
      }
      .titleName {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 16px;
        margin-right: 14px;
      }
      .titleLine {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
      .titleUse {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 12px;
      }
    }
    .loginform {
      margin-top: 29px;
    }
    .loginform {
      margin-top: 29px;
    }
    .loginCode {
      width: 100%;
      height: 40px;
    }
    .checkboxheight {
      .el-form-item__content {
        line-height: 20px;
      }
    }
    .loginbnt {
      width: 100%;
    }
  }
}
.rightImg {
  width: 633px;
  height: 435px;
}
</style>