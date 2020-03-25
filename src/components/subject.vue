<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="searchObj" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="short" v-model="searchObj.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
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
          <el-button type="primary" @click="searchBtn">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type @click="clearBtn">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openSubjectAdd">
            <i class="el-icon-circle-plus-outline"></i> 新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="cardBtm">
      <el-table :data="subjectList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column width="200px" prop="create_time" label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time | mytime}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status===1?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180">
          <template slot-scope="scope">
            <el-link class="myLink" type="primary" @click="openEditSuubject(scope.row)">编辑</el-link>&nbsp;
            <el-link
              class="myLink"
              type="primary"
              @click="disable(scope.row)"
            >{{scope.row.status===0?"启用":"禁用"}}</el-link>&nbsp;
            <el-link class="myLink" type="primary" @click="subjectDel(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="subjectObj.page"
        :page-sizes="pageSizes"
        :page-size="subjectObj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
        class="pagination"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></el-pagination>
    </el-card>
    <subjectAdd ref="subjectAdd"></subjectAdd>
    <subjectEdit ref="subjectEdit"></subjectEdit>
  </div>
</template>

<script>
//导入接口封装的方法
import { apiSubject, apiChangeStatus, apiSubjectDel } from "../api/subject.js";
//导入新增面板
import subjectAdd from "./subjectAdd";
import subjectEdit from "./subjectEdit";
export default {
  data() {
    return {
      pageSizes: [5, 10, 20],
      //分页--信息总条数
      pageTotal: 0,
      //学科列表
      subjectList: [],
      //请求学科列表的参数对象
      subjectObj: {
        name: "", //学科名称
        page: 1, //当前页
        limit: 5, //页容量
        rid: "", //学科编号
        username: "", //创建者
        status: "" //状态
      },
      searchObj: {
        name: "", //学科名称
        rid: "", //学科编号
        username: "", //创建者
        status: "" //状态
      }
    };
  },
  methods: {
    // 获取学科数据
    getSubjectData() {
      apiSubject(this.subjectObj).then(res => {
        this.subjectList = res.data.data.items;
        // window.console.log(res);
        // 数据总条数
        this.pageTotal = res.data.data.pagination.total;
      });
    },
    // 状态切换
    disable(row) {
      // console.log(row);
      apiChangeStatus(row.id).then(() => {
        this.getSubjectData();
        if (row.status === 0) {
          this.$message.success("启用成功");
        } else {
          this.$message.success("禁用成功");
        }
      });
    },
    // 新增学科
    openSubjectAdd() {
      this.$refs.subjectAdd.dialogFormVisible = true;
    },
    // 切换页码
    currentChange(index) {
      this.subjectObj.page = index;
      this.getSubjectData();
    },
    // 切换页容量
    sizeChange(index) {
      this.subjectObj.limit = index;
      this.getSubjectData();
    },
    // 筛选
    searchBtn() {
      this.subjectObj.name = this.searchObj.name;
      this.subjectObj.rid = this.searchObj.rid;
      this.subjectObj.username = this.searchObj.username;
      this.subjectObj.status = this.searchObj.status;
      this.getSubjectData();
    },
    // 清除
    clearBtn() {
      this.subjectObj.name = this.searchObj.name = "";
      this.subjectObj.rid = this.searchObj.rid = "";
      this.subjectObj.username = this.searchObj.username = "";
      this.subjectObj.status = this.searchObj.status = "";
      this.getSubjectData();
    },
    // 编辑学科
    openEditSuubject(row) {
      // 显示编辑面板
      this.$refs.subjectEdit.dialogFormVisible = true;
      // 解决同步修改
      let str = JSON.stringify(row);
      let objStr = JSON.parse(str);
      this.$refs.subjectEdit.form = objStr;
    },
    // 删除学科
    subjectDel(row) {
      this.$confirm("您确定要删除吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送请求到服务器
          apiSubjectDel(row.id).then(res => {
            if (res.data.code === 200) {
              if(this.subjectList.length===1){
                this.subjectObj.page--
                // this. getSubjectData()
              }
              this.$message.success("删除成功");
              this.getSubjectData();
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
    this.getSubjectData();
  },
  components: {
    subjectAdd,
    subjectEdit
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