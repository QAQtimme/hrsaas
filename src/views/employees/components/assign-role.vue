<template>
  <el-dialog class="assign-role" title="分配角色" :visible="showRoleDialog" @close="handleClose" @open="handleOpen">
    <!-- 这里准备复选框 -->
    <el-checkbox-group v-model="roleIds" v-loading="loading">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.id }}</el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <el-button type="primary" size="small" @click="clickSubmit">确定</el-button>
      <el-button size="small" @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { reqGetRoleList } from '@/api/setting'
import { reqGetUserDetailById, reqAssignRoles } from '@/api/user'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      roleIds: [],
      roleList: [],
      loading: false
    }
  },
  // watch: {
  // userId() {
  // this.getRoleList()
  // }
  // },
  created() {
    // this.getRoleList()
  },
  methods: {
    handleClose() {
      this.$emit('update:showRoleDialog', false)
      this.roleIds = []
    },
    async handleOpen() {
      this.loading = true
      // this.getRoleList()
      // this.getUserDetail()
      await Promise.all([this.getRoleList(), this.getUserDetail()])
      this.loading = false
    },
    async getRoleList() {
      const { data: { rows }} = await reqGetRoleList()
      // console.log(rows)
      this.roleList = rows
    },
    async getUserDetail() {
      const { data: { roleids }} = await reqGetUserDetailById(this.userId)
      // console.log(data)
      this.roleIds = roleids
    },
    async clickSubmit() {
      // console.log(this.roleIds)
      // console.log(this.userId)
      await reqAssignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$message.success('分配角色成功')
      this.handleClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.assign-role {
  ::v-deep {
    .el-checkbox {
      font-size: 30px;
    }
  }
}
</style>
