<template>
  <div class="dashboard-container">
    <div class="app-container">[[]]
      <pagetools>
        <template #left>
          <span>测试</span><span>本月: 社保在缴 公积金在缴</span>
        </template>
        <template #right>
          <el-button type="primary" size="small" @click="showDialog=true">添加员工</el-button>
          <el-button type="primary" size="small" @click="$router.push('/import')">excel批量导入</el-button>
          <el-button type="primary" size="small" @click="handleDownload">excel批量导出</el-button>
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
              <el-button :disabled="!checkPermission('point_user_show')" type="text" size="small" @click="$router.push('/employees/detail/${row.id}')">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="clickRole(row.id)">角色</el-button>
              <el-button :disabled="!checkPermission('point_user_show')" type="text" size="small" @click="reqDelEmployee(row.id)">删除</el-button>
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
      //分配角色弹层
      <assign-role :show-role-dialog="showRoleDialog" user-id="userId" />
    </div>
  </div>
</template>

<script>
import { reqGetEmployeeList, reqDelEmployee } from '@/api/employee'
import EmployeesEnum from '@/api/constant/employees'
import dayjs from 'dayjs'
import addEmployee from './components/add-employee.vue'
import AssignRole from './components/assign-role.vue'
export default {
  name: 'Employees',
  components: {
    addEmployee,
    AssignRole
  },
  data() {
    return {
      list: [],
      page: 1,
      size: 5,
      total: 0,
      showDialog: false,
      showRoleDialog: false,
      // 用户id
      userId: []
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 按钮操作权
    // 该方法在后续的组件中也会多次使用，封装起来
    // 封装方法：混入mimix,自定义指令v-disabled='point_user_del'
    checkPermission(key) {
      if (this.$store.getters.roles.includes(key)) {
        return true
      } else {
        return false
      }
    },
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
    },
    // 批量导出员工
    async handleDownload() {
      // webpack语法
      // 导入资源
      import('@/vendor/Export2Excel').this(async excel => {
        const headersArr = ['姓名', '手机号', '工号', '聘用形式', '部门', '入职时间']
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        const headersRelations = {
          '姓名': 'username',
          '手机号': 'mobile',
          '入职日期': 'timeOfEntry',
          '聘用形式': 'formOfEmployment',
          '转正日期': 'correctionTime',
          '工号': 'workNumber',
          '部门': 'departmentName'
        }
        // const filterVal = ['username', 'workNumber', 'mobile', 'formOFEmployment', 'formOFEmployment', 'timeOFEntry']
        // const list = this.list
        // const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          merges,
          header: headersArr, // 表头
          // eslint-disable-next-line no-undef
          data, // 内容：二维数组
          filename: '员工列表', // 导出文件名
          autowidth: true, // 自动宽度
          bookType: 'xlsx' // 导出文件扩展名
        })
        // 导出表格内容数据（所有员工数据）
        const { data: { rows }} = await reqGetEmployeeList(1, this.total)
        // 转换数据格式：获取的数据与导出的数据有差别
        const arr = []
        rows.forEach(item => {
          const innerArr = []
          headersArr.forEach(v => {
            const enlistKey = headersRelations[v]
            innerArr.push(item[enlistKey])
          })
          arr.push(innerArr)
        })
      })
    },
    // 分配角色
    clickRole(id) {
      this.userId = id
      this.showRoleDialog = true
    }
  }
}
</script>

  <style>

  </style>

