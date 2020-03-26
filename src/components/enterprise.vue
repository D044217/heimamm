<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="searchObj" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input class="short" v-model="searchObj.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input class="long" v-model="searchObj.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short" v-model="searchObj.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="long" v-model="searchObj.status">
            <el-option label="所有" value></el-option>
            <el-option label="启动" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchBtn">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type @click="clearBtn">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openEnterpiseAdd">
            <i class="el-icon-circle-plus-outline"></i> 新增企业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="cardBtm">
      <el-table :data="enterpriseList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column width="200px" prop="create_time" label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time | mytime}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status===1?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180">
          <template slot-scope="scope">
            <el-link class="myLink" type="primary" @click="openEditEnterprice(scope.row)">编辑</el-link>&nbsp;
            <el-link
              class="myLink"
              type="primary"
              @click="disable(scope.row)"
            >{{scope.row.status===0?"启用":"禁用"}}</el-link>&nbsp;
            <el-link class="myLink" type="primary" @click="enterpriseDel(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="enterpriseObj.page"
        :page-sizes="pageSizes"
        :page-size="enterpriseObj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
        class="pagination"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></el-pagination>
    </el-card>
    <enterpriseDialog ref="enterpriseDialog"></enterpriseDialog>
  </div>
</template>

<script>
import {
  apiEnterprise,
  apiEnterpriseStatus,
  apiEnterpriseDel
} from "../api/enterprise";
import enterpriseDialog from "./enterpriseDialog";
export default {
  data() {
    return {
      pageSizes: [2, 4, 8],
      //分页--信息总条数
      pageTotal: 0,
      //学科列表
      enterpriseList: [],
      //请求学科列表的参数对象
      enterpriseObj: {
        name: "", //学科名称
        page: 1, //当前页
        limit: 2, //页容量
        eid: "", //学科编号
        username: "", //创建者
        status: "" //状态
      },
      searchObj: {
        name: "", //学科名称
        eid: "", //学科编号
        username: "", //创建者
        status: "" //状态
      }
    };
  },
  methods: {
    // 获取企业列表数据
    getEnterpriseData() {
      apiEnterprise(this.enterpriseObj).then(res => {
        this.enterpriseList = res.data.data.items;
        // window.console.log(res);
        // 数据总条数
        this.pageTotal = res.data.data.pagination.total;
      });
    },
    // 切换页码
    currentChange(index) {
      this.enterpriseObj.page = index;
      this.getEnterpriseData();
    },
    // 切换页容量
    sizeChange(index) {
      this.enterpriseObj.limit = index;
      this.getEnterpriseData();
    },
    // 新增按钮
    openEnterpiseAdd() {
      this.$refs.enterpriseDialog.dialogFormVisible = true;
      this.$refs.enterpriseDialog.isEdit = false;
      // 清空新增表单数据
      this.$refs.enterpriseDialog.form.eid = "";
      this.$refs.enterpriseDialog.form.name = "";
      this.$refs.enterpriseDialog.form.short_name = "";
      this.$refs.enterpriseDialog.form.intro = "";
      this.$refs.enterpriseDialog.form.remark = "";
    },
    // 筛选
    searchBtn() {
      this.enterpriseObj.name = this.searchObj.name;
      this.enterpriseObj.eid = this.searchObj.eid;
      this.enterpriseObj.username = this.searchObj.username;
      this.enterpriseObj.status = this.searchObj.status;
      this.getEnterpriseData();
    },
    // 清除
    clearBtn() {
      this.enterpriseObj.name = this.searchObj.name = "";
      this.enterpriseObj.rid = this.searchObj.rid = "";
      this.enterpriseObj.username = this.searchObj.username = "";
      this.enterpriseObj.status = this.searchObj.status = "";
      this.getEnterpriseData();
    },
    // 状态切换
    disable(row) {
      // console.log(row);
      apiEnterpriseStatus(row.id).then(() => {
        this.getEnterpriseData();
        if (row.status === 0) {
          this.$message.success("启用成功");
        } else {
          this.$message.success("禁用成功");
        }
      });
    },
    // 编辑企业
    openEditEnterprice(row) {
      // 显示编辑面板
      this.$refs.enterpriseDialog.dialogFormVisible = true;
      this.$refs.enterpriseDialog.isEdit = true;
      // 解决同步修改
      let str = JSON.stringify(row);
      let objStr = JSON.parse(str);
      this.$refs.enterpriseDialog.form = objStr;
    },
    // 删除企业
    enterpriseDel(row) {
      this.$confirm("您确定要删除吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送请求到服务器
          apiEnterpriseDel(row.id).then(res => {
            if (res.data.code === 200) {
              if (this.enterpriseList.length === 1) {
                this.enterpriseObj.page--;
                // this. getSubjectData()
              }
              this.$message.success("删除成功");
              this.getEnterpriseData();
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
    this.getEnterpriseData();
  },
  components: {
    enterpriseDialog
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