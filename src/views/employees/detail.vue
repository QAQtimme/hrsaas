<template>
  <div class="employees-detail-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账号设置">
            <!-- 放置表单 -->
            <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item prop="username" label="姓名:">
                <el-input v-model="userInfo.username" placeholder="请输入姓名" style="width:300px" />
              </el-form-item>
              <el-form-item prop="newPassword" label="新密码:">
                <el-input v-model="userInfo.newPassword" placeholder="请输入新密码" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <user-info />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <job-user />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { reqSaveUserDetailById, reqGetDetailById } from '@/api/employees'

export default {
  name: 'EmployeesDetail',
  data() {
    return {
      userInfo: {
        username: '',
        newPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: ['blur', 'change'] }
        ],
        newPassword: [
          { min: 6, max: 9, message: '密码必须是6-9位', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created() {
    this.getUserDetailById()
    this.getPersonalDetailById()
  },
  computer: {
    userId() {
      return this.$router.params.id
    }
  },
  methods: {
    async getUserDetailById() {
      const { data: res } = await reqGetDetailById(this.userId)
      if (res.meta.status !== 200) return this.$message.error('获取用户详情失败')
      this.userInfo = res.data
    },
    async getPersonalDetail() {
      const { data } = await reqGetDetailById(this.userId) // 获取员工详情
      this.userInfo = data
    },
    saveUser() {
      this.$refs.userForm.validate(async(valid) => {
        if (!valid) return
        await reqSaveUserDetailById
      })
    },
    async getPersonalDetailById() {
      const { data: res } = await reqGetDetailById(this.userId)
      if (res.meta.status !== 200) return this.$message.error('获取用户详情失败')
      this.userInfo = res.data
    }
  }
}
</script>
