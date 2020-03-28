<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="searchObj" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input class="short" v-model="searchObj.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input class="long" v-model="searchObj.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select class="long" v-model="searchObj.role_id">
            <el-option label="所有" value></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchBtn">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type @click="clearBtn">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openUserAdd">
            <i class="el-icon-circle-plus-outline"></i> 新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="cardBtm">
      <el-table :data="userList" style="width: 100%" :border="true">
        <el-table-column width="60px" type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column width="160px" prop="email" label="邮箱"></el-table-column>
        <el-table-column width="100px" prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column width="80px" label="状态">
          <template slot-scope="scope">{{scope.row.status===1?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180">
          <template slot-scope="scope">
            <el-link v-if="['超级管理员','管理员','老师'].includes($store.state.role)" class="myLink" type="primary" @click="openEditUser(scope.row)">编辑</el-link>&nbsp;
            <el-link
              class="myLink"
              type="primary"
              @click="disable(scope.row)"
              v-if="['管理员','老师'].includes($store.state.role)"
            >{{scope.row.status===0?"启用":"禁用"}}</el-link>&nbsp;
            <el-link v-if="['超级管理员','管理员'].includes($store.state.role)" class="myLink" type="primary" @click="userDel(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="userObj.page"
        :page-sizes="pageSizes"
        :page-size="userObj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
        class="pagination"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></el-pagination>
    </el-card>
    <userDialog ref="userDialog"></userDialog>
  </div>
</template>

<script>
import userDialog from "./userDialog";
import { apiUserList, apiUserStatus, apiUserDel } from "../api/user";
export default {
  data() {
    return {
      pageSizes: [2, 4, 8],
      //分页--信息总条数
      pageTotal: 0,
      //用户列表
      userList: [],
      //请求用户列表的参数对象
      userObj: {
        username: "", //用户名
        email: "", // 邮箱
        page: 1, //当前页
        limit: 2, //页容量
        role_id: "" //角色
      },
      searchObj: {
        username: "", //用户
        email: "", //学科编号
        role_id: "" // 角色
      }
    };
  },
  methods: {
    // 获取企业列表数据
    getUserData() {
      apiUserList(this.userObj).then(res => {
        // console.log(res);

        this.userList = res.data.data.items;
        // window.console.log(res);
        // 数据总条数
        this.pageTotal = res.data.data.pagination.total;
      });
    },
    // 切换页码
    currentChange(index) {
      this.userObj.page = index;
      this.getUserData();
    },
    // 切换页码容量
    sizeChange(index) {
      this.userObj.limit = index;
      this.getUserData();
    },

    // 搜索按钮
    searchBtn() {
      this.userObj.username = this.searchObj.username;
      this.userObj.email = this.searchObj.email;
      this.userObj.role_id = this.searchObj.role_id;
      this.getUserData();
    },
    // 清除按钮
    clearBtn() {
      this.userObj.username = this.searchObj.username = "";
      this.userObj.email = this.searchObj.email = "";
      this.userObj.role_id = this.searchObj.role_id = "";
      this.getUserData();
    },
    // 新增用户
    openUserAdd() {
      this.$refs.userDialog.dialogFormVisible = true;
      this.$refs.userDialog.isEdit = false;
      // 清空新增表单数据
      this.$refs.userDialog.form.username = "";
      this.$refs.userDialog.form.email = "";
      this.$refs.userDialog.form.phone = "";
      this.$refs.userDialog.form.role_id = "";
      this.$refs.userDialog.form.status = "";
      this.$refs.userDialog.form.remark = "";
      // this.$refs.userDialog.$refs.form.resetFields();
      // 无法重置没有表单校核的内容
    },
    // 切换状态
    disable(row) {
      // console.log(row);
      apiUserStatus(row.id).then(() => {
        this.getUserData();
        if (row.status === 0) {
          this.$message.success("启用成功");
        } else {
          this.$message.success("禁用成功");
        }
      });
    },
    // 编辑用户
    openEditUser(row) {
      // 显示编辑面板
      this.$refs.userDialog.dialogFormVisible = true;
      this.$refs.userDialog.isEdit = true;
      // 解决同步修改
      let str = JSON.stringify(row);
      let objStr = JSON.parse(str);
      this.$refs.userDialog.form = objStr;
      // this.$refs.userDialog.$nextTick(() => {
      //   // 将当前行的数据源添加到页面上
      //   this.$refs.userDialog.form = JSON.parse(JSON.stringify(row));
      // });
    },
    // 删除用户
    userDel(row) {
      this.$confirm("您确定要删除吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送请求到服务器
          apiUserDel(row.id).then(res => {
            if (res.data.code === 200) {
              if (this.userList.length === 1) {
                this.userObj.page--;
                // this. getSubjectData()
              }
              this.$message.success("删除成功");
              this.getUserData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    }
  },
  created() {
    this.getUserData();
  },
  components: {
    userDialog
  }
};
</script>


<style lang="less">
.demo-form-inline {
  .short {
    width: 90px;
  }
  .long {
    width: 140px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
.cardBtm {
  margin-top: 20px;
  .pagination {
    margin-top: 30px;
    text-align: center;
  }
}
</style>