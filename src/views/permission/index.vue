<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="clickAdd(1,'0')">添加权限</el-button>
        </div>
        <el-table border :data="permissionList" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button v-if="row.type===1" size="small" type="text" @cliack="cliackAdd(2,row.id)">添加权限点</el-button>
              <el-button size="small" type="text" @click="clickshowEdit(row.id)">查看</el-button>
              <el-button size="small" type="text" @click="clickDel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!--新增权限弹层-->
      <el-dialog :title="showTitle" :visible="showDialog" @close="handleClose">
        <!-- 表单内容 -->
        <el-form label-width="100px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="权限启用">
            <el-switch
              v-model="formData.enVisible"
              active-text="启用"
              active-value="1"
              inactive-text="不启用"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <div style="text-align: right;">
            <el-button @click="showDialog = false">取消</el-button>
            <el-button type="primary" @click="clickSubmit">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reqGetPermissionList, reqAddPermission, reqDelPermission, reqUpdatePermission } from '@/api/permission'
import { transListDataToTree } from '@/utils'
export default {
  name: 'Permission',
  data() {
    return {
      permissionList: [],
      showDialog: false,
      formData: {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    }
  },
  computed: {
    showTitle() {
      if (this.formData.id) {
        return '编辑权限'
      } else {
        return '添加权限'
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    handleClose() {
      this.showDialog = false
      this.formData = {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    },
    async getPermissionList() {
      const res = await reqGetPermissionList()
      this.permissionList = transListDataToTree(res.data, '0')
    },
    clickAdd(type, pid) {
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = pid
    },
    async clickSubmit() {
      if (this.formData.name === '' || this.formData.code === '') {
        this.$message.error('请填写完整的表单数据')
        return
      }
      if (this.formData.id) {
        await reqUpdatePermission(this.formData)
      } else {
        await reqAddPermission(this.formData)
      }
      this.$message.success('操作成功')
      this.getPermissionList()
      this.showDialog = false
    },
    clickDel(id) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await reqDelPermission(id)
          this.getPermissionList()
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    async clickshowEdit() {
      const { data } = await reqGetPermissionList()
      this.formData = data
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
      this.formData = {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    }
  }
}
</script>
