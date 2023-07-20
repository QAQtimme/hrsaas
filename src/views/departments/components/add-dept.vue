<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="handleCloseDialog">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="from.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="from.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="from.name" style="width:80%" placeholder="请选择">
          <el-option />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="from.name" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <div slot="footer">
      <el-button type="primary" size="small" @clickSubmit>确定</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { reqGetEmployeeSimple } from '@/api/employees'
import { reqAddDepartment, reqGetDepartmentDetail, reqUpdateDepartment } from '@/api/departments'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false// true
    },
    deptsList: {
      type: Array,
      required: true
    },
    nodeData: {
      type: Object,
      required: true
    }
  },
  data() {
    // 例如：value是新增财务部的子部门名称，财务部的子部门不能与财务部门下子部门名字重复
    // 需要找到财务部门下的部门，然后进行对比
    // nodeData:财务部
    // depts：所有部门
    // 根据财务部的id找子部门，子部门的pid等于财务部的id
    const checkNameRepeat = (rule, value, callback) => {
      if (value === this.nodeData.name) {
        callback()
        return
      }
      const arr = this.deptsList.filter(item => item.id === this.nodeData.id)
      const flag = arr.some(item => item.name === value)
      flag ? callback() : callback(new Error('部门名称重复'))
    }
    // eslint-disable-next-line no-unused-vars
    const checkCodeRepeat = (rule, value, callback) => {
      if (this.form.id && value === this.nodeData.code) {
        callback()
        return
      }
    }
    // 例如：value是新增财务部的子部门编码，财务部的子部门编码不能与所有部门编码重复
    const cheskCodeRepeat = (rule, value, callback) => {
      const flag = this.deptsList.some(item => item.code === value)
      flag ? callback() : callback(new Error('公司部门已经有${value}名字了'))
    }
    return {
      from: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: cheskCodeRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    showTitle() {
      return this.form.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    handleClose() {
      this.$emit('close-dialog')
    }
  },
  async reqGetEmployeeSimple() {
    const { data } = await reqGetEmployeeSimple()
    return data
  },
  handleOpen() {
    this.reqGetEmployeeSimple()
  },
  clickSubmit() {
    this.$refs.form.validate(async valid => {
      if (!valid) return
      if (this.form.id) {
        await reqUpdateDepartment({ ...this.form, pid: this.nodeData.id })
      } else {
        await reqAddDepartment({ ...this.form, pid: this.nodeData.id })
      }
      this.handleClose()
      this.$emit('refresh-departments')
    })
  },
  // 根据id获取部门详情
  async getDepartDetail(id) {
    const res = await reqGetDepartmentDetail(this.nodeData.id)
    return res
  }
}
</script>
