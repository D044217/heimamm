<template>
  <el-container class="containerBox">
    <el-header class="header">
      <div class="leftBox">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
        <img src="../assets/index_login.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="rightBox">
        <img :src="$store.state.usericon" alt />
        <span class="word">{{$store.state.username}},您好!</span>
        <el-button type="primary" size="mini" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
        <!-- <el-menu default-active="2" class="el-menu-vertical-demo"> -->
        <el-menu
          :router="true"
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <template v-for="(item, index) in child">
            <el-menu-item
              :index="item.meta.pullpath"
              :key="index"
              v-if="item.meta.roles.includes($store.state.role)"
            >
              <i v-if="item.meta.title==='数据概览'" class="el-icon-pie-chart"></i>
              <i v-if="item.meta.title==='用户列表'" class="el-icon-user"></i>
              <i v-if="item.meta.title==='题库列表'" class="el-icon-edit-outline"></i>
              <i v-if="item.meta.title==='企业列表'" class="el-icon-office-building"></i>
              <i v-if="item.meta.title==='学科列表'" class="el-icon-notebook-2"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>
          <!-- <el-menu-item index="/index/chart" v-if="['管理员','老师'].includes($store.state.role)">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user" v-if="['管理员','老师'].includes($store.state.role)">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question" v-if="['管理员','老师','学生'].includes($store.state.role)">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise" v-if="['管理员'].includes($store.state.role)">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject" v-if="['管理员'].includes($store.state.role)">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//导入首页接口的js
import { logoutApi } from "../api/index";
import child from "../router/routerChild";
export default {
  data() {
    return {
      userInfo: "", //用户信息
      imgUrl: "", //用户头像
      isCollapse: false,
      child: child
    };
  },
  created() {
    //判断是否存在token
    if (!window.localStorage.getItem("heimamm")) {
      this.$message.error("您还没有登录,请登录");
      this.$router.push("/login");
      return;
    }
    // 得到用户信息
    // apiInfo().then(res => {
    //token判断前置
    // 判断token的真假
    // if (res.data.code === 206) {
    //   //token错误
    //   this.$message.error("您还没有登录,请登录");
    //   this.$router.push("/login");
    //   return;
    // }
    // console.log(res);

    //   this.userInfo = res.data.data;
    //   this.imgUrl = process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
    // });
  },
  methods: {
    //退出按钮点击事件函数
    logout() {
      // 弹出提示框
      this.$confirm("您确定要退出吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送请求到服务器
          logoutApi().then(res => {
            //退出成功
            if (res.data.code === 200) {
              // 清除用户的 token
              window.localStorage.removeItem("heimamm");
              // 跳转到登录页面
              this.$router.push("/login");
              // 提示用户退出成功
              this.$message({
                type: "success",
                message: "退出成功"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less">
// 头部布局
.containerBox {
  height: 100%;
  .header {
    line-height: 60px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leftBox {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
      }
      img {
        margin-left: 22px;
        margin-right: 11px;
      }
      span {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .rightBox {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .word {
        font-size: 16px;
        margin-right: 38px;
      }
      // button{
      //     color: #fff;
      // }
    }
  }
  .aside {
    background-color: #fff;
  }
  .main {
    background: rgba(232, 233, 236, 1);
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>