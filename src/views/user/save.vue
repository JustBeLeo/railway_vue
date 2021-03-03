<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="邮箱">
        <el-input v-model="user.email"/>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="user.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password"/>
      </el-form-item>


      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from "@/api/user/user";

export default {
  name: "save",
  data() {
    return {
      user: {},
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.fetchDataById(id)
    }
  },
  methods: {
    saveOrUpdate() {
      this.saveBtnDisabled = true
      this.saveData()
    },

    // 保存
    saveData() {
      user.save(this.user).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({path: '/user'})
      }).catch((response) => {
        // console.log(response)
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    },
    fetchDataById(id) {
      user.getById(id).then(response => {
        this.user = response.data.user
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '获取数据失败'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
