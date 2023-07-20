<template>
  <div class="dashboard-container">
    <div class="app-container">[[]]
      <pagetools>
        <template #left>
          <span>测试</span><span>本月: 社保在缴 公积金在缴</span>
        </template>
        <template #right>
          <el-button type="primary" size="small" @click="showDialog=true">添加员工</el-button>
          <el-button type="primary" size="small">excel批量导入</el-button>
          <el-button type="primary" size="small">导出</el-button>
        </template>
      </pagetools>

      <el-card style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column prop="mobile" label="手机号" sortable="" />
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOFEmployment" :formatter="formatEmployment" label="聘用形式" sortable="" />
          <el-table-column prop="formOFEmployment" label="部门" sortable="" />
          <el-table-column prop="timeOFEntry" label="入职时间" sortable="">
            <template #default="{row}">
              {{ formatEntry(row.timeOfEntry) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="reqDelEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            :total="total"
            :current-page="page"
            :page-size="size"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
      <add-employee :show-dialog="showDialog" />
    </div>
  </div>
</template>

<script>
import { reqGetEmployeeList, reqDelEmployee } from '@/api/employee'
import EmployeesEnum from '@/api/constant/employees'
import dayjs from 'dayjs'
import addEmployee from './components/add-employee.vue'
export default {
  name: 'Employees',
  components: {
    addEmployee
  },
  data() {
    return {
      list: [],
      page: 1,
      size: 5,
      total: 0,
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { data } = await reqGetEmployeeList(this.page, this.size)
      const { total, rows } = data
      this.total = total
      this.list = rows
      this.loading = false
    },
    // 分页
    handleCurrentChange(newPage) {
      this.page = newPage
      this.getEmployeeList()
    },
    // 格式化员工的聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeesEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 格式化入职时间
    formatEntry(time) {
      return dayjs(time).format('YYYY年MM月DD日')
    },
    delEmployee(id) {
      this.$confirm('确定要删除该员工?', '温馨提示').then(async() => {
        await reqDelEmployee(id)
        if (this.list.length === 1 && this.page > 1) {
          this.page--
        }
        this.$message.success('删除成功')
        this.getEmployeeList()
      }).catch(() => {
        console.log('取消')
      })
    }
  }
}
</script>

  <style>

  </style>

