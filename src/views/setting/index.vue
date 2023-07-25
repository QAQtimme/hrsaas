<template>
  <div class="setting-container">
    <class class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 左侧 -->
          <el-tab-pane label="角色管理" name="role">
            <!-- 按钮 -->
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="addRole"
            >新增角色</el-button>
            <!-- 表格 -->
            <el-table v-loading="loading" :data="list">
              <el-table-column type="index" :index="indexMethod" label="序号" width="100" />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template #default="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="clickSubmit">编辑</el-button>
                  <el-button size="small" type="danger" @click="del(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <!--
              属性:
                1. current-page 标记当前页 (谁高亮)
                2. page-sizes 可供选择的每页条数列表
                3. page-size 起作用的每页条数
                4. layout 布局, 控制是展示的控件列表布局
                5. total 总条数
              方法:
                @size-change="handleSizeChange" 每页条数变化
                @current-change="handleCurrentChange" 当前页变化
            -->
            <el-pagination
              :current-page="page"
              :page-sizes="[1, 2, 3, 4, 5]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>

          <el-tab-pane label="公司信息">
          <!-- 公司信息 -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!--新增编辑角色弹出框-->
      <el-dialog title="弹层标题" :visible="showDialog" @close="handlecloseDialog">
        <el-form ref="roleForm" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="form.description" placeholder="请输入角色描述" />
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="handleDialogClose">取消</el-button>
          <el-button type="primary">确认</el-button>
        </template>
      </el-dialog>
      <!-- 分配权限的弹层 -->
      <el-dialog title="分配权限" :visible="showPermissionDialog" @close="handlePermissionDialogClose">
        <el-tree
          ref="tree"
          v-loading="loading"
          :data="PermissionData"
          :props="{ label: 'name' }"
          :default-expand-all="true"
          :show-checkbox="true"
          :check-strictly="true"
          node-key="id"
        />
        <el-button size="small" type="success" @click="clickShowAssignDialog(row.id)">分配权限</el-button>
        <template #footer>
          <div style="text-align: right;">
            <el-button @click="closeAssignDialog">取消</el-button>
            <el-button type="primary">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </class>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reqGetRoleList, reqDelRole, reqAddRole, reqGetRoleDetail, reqUpdateRole } from '@/api/setting'
import { reqGetCompany } from '@/api/company'
import { reqGetPermissionList } from '@/api/permission'
import { transListDataToTree } from '@/utils'
import { reqAssignPerm } from '@/api/role'
export default {
  name: 'Setting',
  data() {
    return {
      activeName: 'role',
      list: [],
      page: 1,
      pageSize: 2,
      total: 0,
      loading: false,
      showDialog: false,
      roleId: '', // 记录正在操作的角色id
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      },
      showPermissionDialog: false,
      PermissionData: [],

      // 权限列表loading
      treeLoading: false

    }
  },
  computed: {
    showTitle() {
      return this.from.id === 'role' ? '编辑角色' : '添加角色'
    }
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.getCompany() // 获取公司信息
  },
  methods: {
    async getRoleList() {
      this.loading = true
      const { data } = await reqGetRoleList(this.page, this.pageSize)
      const { total, rows } = data
      this.total = total
      this.list = rows
    },
    handleSizeChange(newsize) {
      this.pageSize = newsize
      this.page = 1
      this.getRoleList()
    },
    handleCurrentChange(newpage) {
      this.page = newpage
      this.getRoleList()
    },
    indexMethod(index) {
      // index是从0开始的
      // 1页 index = 1 2
      // 2页 index = 3 4
      return (this.page - 1) * this.pageSize + index + 1
    },
    // 删除角色
    async del(id) {
      const result = await this.$confirm('确定删除该角色吗?').catch(error => error)
      if (result === 'cancel') return

      if (this.list.length === 1 && this.page > 1) {
        this.page--
      }

      this.$message.success('删除成功')
      this.getRoleList()
    },
    handleDialogClose() {
      this.showDialog = false
      this.$refs.roleForm.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    clickSubmit() {
      this.$refs.roleForm.validate(async valid => {
        if (!valid) return
        if (this.form.id) {
          await reqAddRole(this.form)
          this.$message.success('添加成功')
        }

        await reqAddRole(this.form)
        this.$message.success('添加成功')
        this.handleDialogClose()
        this.getRoleList()
      })
    },
    async edit(id) {
      this.showDialog = true
      const { data } = await reqGetRoleDetail(id)
      this.form = data
    },
    async reqGetCompany(id) {
      const { data } = await reqGetCompany(id)
      this.form = data
    },
    async clickShowAssignDialog(id) {
      this.showAssignDialog = true
      const res = await reqGetPermissionList()
      this.PermissionData = transListDataToTree(res.data, '0')

      const { data: { permIds }} = await reqGetRoleDetail(id)
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(permIds)
      })
    },
    handlePermissionDialogClose() {
      this.showPermissionDialog = false
      this.$refs.tree.setCheckedKeys([])
      this.treeLoading = false
    },
    async clickPermissionSubmit() {
      await reqAssignPerm({
        id: this.roleId,
        permIds: this.$refs.tree.getCheckedKeys()
      })
      this.$message.success('分配权限成功')
      this.handlePermissionDialogClose()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
