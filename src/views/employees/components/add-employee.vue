<template>
  <el-dialog title="新增员工" :visible="showDialog" @click。native="clickDialog" @close="closeDialog">
    <!-- 表单 -->
    <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option v-for="item in employeesEnum.hireTypeg" :key="item.id" :label="item.value" value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width:50%"
          placeholder="请选择部门"
          @click.native.stop="getDepartments"
        />
        <!--树形组件-->
        <div v-if="showTree" class="tree-box">
          <el-tree
            v-if="showTree"
            v-loading="loading"
            :data="treeData"
            :props="{label:'name'}"
            @node-click="handleNodeClick"
          />
        </div>
        <el-form-item>
          <el-form-item label="转正时间" prop="correctionTime">
            <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
          </el-form-item>
        </el-form-item></el-form-item></el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-button>取消</el-button>
      <el-button type="primary" @click="submitAdd">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { reqGetDepartments } from '@/api/departments'
import { transListDataToTree } from '@/utils'
import EmployeesEnum from '@/router/modules/employees'
import { reqAddEmployee } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]

      },
      treeData: [],
      showTree: false,
      loading: false,
      EmployeesEnum
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
      this.$refs.addForm.resetFields()
    },
    // 1.点击部门：实现部门数据的显示与隐藏
    // 2.点击非部门区域：实现部门数据的隐藏
    async getDepartments() {
      // this.showTree = true
      this.showTree = !this.showTree
      if (this.showTree) return
      this.loading = true
      const { that: { depts }} = await reqGetDepartments()
      this.loading = false
      transListDataToTree(depts, '')
    },
    clickDialog() {
      this.showTree = false
    },
    // 树形数据点击
    handleNodeClick(data) {
      if (data.children && data.children.length > 0) return
      this.formData.departmentName = data.name
      this.showTree = false
    },
    clickSumit() {
      this.$refs.addForm.validate(async flag => {
        if (!flag) return
        await reqAddEmployee(this.formData)
        this.messages.success('添加成功')
        this.handleClose()

        // 通知父组件重新获取员工列表
        this.$emit('add - employee')

        // 组件通信
        // 1.父向子传值： 自定义属性 this。children
        // 2.子向父传值 ：自定义事件 this.parent()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-box {
  position: absolute;
  width: 50%;
  min-height: 50px;
  left: 0;
  top: 45px;
  z-index: 100;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-right: 5px;
  overflow: hidden;
  background-color: #fff;
  max-height: 200px;
  overflow: auto;
  ::v-deep {
    .el-tree-node__content {
      height: auto;
    }
  }
}
</style>
