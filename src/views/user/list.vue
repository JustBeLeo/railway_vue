<template>

  <div style="margin: 10px;">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <!--  v-model 双向绑定-->
        <el-input v-model="userQuery.username" placeholder="用户名"/>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="userQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="userQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="用户id"/>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="gmtCreate" label="添加时间"/>
      <el-table-column prop="gmtModify" label="修改时间"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/save/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      background
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>


</template>


<script>
// 引入api中定义的方法
import user from "@/api/user/user";
// 表示可以被其他模块调用
export default {
  name: "list",
  // 定义数据变量和初始值
  data() {
    return {
      // 当前页面
      page: 1,
      // 每页记录数
      limit: 10,
      // 总记录数
      total: 0,
      // 条件封装对象
      userQuery: {},
      list: []
    }
  },
  // 在页面渲染之前执行，调用methods里调用的方法
  created() {
    this.getList()
  },
  // 创建具体的方法，调用user.js里定义的方法
  methods: {
    getList(page = 1) {
      this.page = page
      user
        .getUserList(this.page, this.limit, this.userQuery)
        .then(response => {
          // 成功返回信息
          // console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list)
          console.log(this.total)
        })
        .catch(error => {
          // 返回错误信息
          console.log(error)
        })
    },
    resetData() {
      this.userQuery = {}
      this.getList()
    },
    removeDataById(id) {
      // debugger
      // console.log(memberId)
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return user.removeById(id)
      }).then(() => {
        this.getList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
