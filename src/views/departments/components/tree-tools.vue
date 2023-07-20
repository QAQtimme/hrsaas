<!-- eslint-disable no-undef -->
<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%;"
  >
    <el-col :span="20">
      <span>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ nodeData.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑子部分</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import reqDelDepartments from '@/api/reqDelDepartment.js'
export default {
  props: {
    // 定义传入的属性
    nodeData: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    async handleCommand(type) {
      if (type === 'del') {
        const result = await this.$confirm('是否删除该部门？').catch(error => error)
        if (result === 'cancel') return
        await reqDelDepartments(this.nodeData.id)
        this.message.success('删除部门成功')
        this.$emit('del-dept')
      }
      if (type === 'add') {
        // 通知父组件显示弹出框，带着节点数据（作为夫）
        this.$emit('add-dept', this.nodeData)
      }
      if (type === 'edit') {
        // 通知父组件显示弹出框，带着节点数据（自己用）
        this.$emit('edit-dept', this.nodeData)
      }
    }
  }
}
</script>
