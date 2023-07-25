<template>
  <div>
    <!-- 工作日历, 年和月 -->
    <div class="select-box">
      <el-select v-model="currentYear" size="small" style="width: 120px; margin-right: 10px" @change="changDate">
        <!-- 年份取给定年份的, 前五年 + 后五年 -->
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px;">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <el-calender v-model="currentDate" />
  </div>
</template>

<script>
export default {
  name: 'WorkCalender',
  props: {
    startDate: {
      type: Date,
      // default: 默认值
      // 1. 如果是基本数据类型, 可以直接写默认值  0  ''  false/true
      // 2. 如果是复杂数据类型，不能写  [], {},要写成函数的形式
      default: () => {
        return new Date()
      }
    }
  },
  data() {
    return {
      currentYear: null, // 当前年份
      currentMonth: null, // 当前月份
      // yearList: [] // 要遍历的年的数组
      currentDate: null // 当前日期
    }
  },
  computed: {
    yearList() {
      return Array.from({ length: 10 }, (item, index) => {
        return this.currentYear - 5 + index
      })
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear() // 得到当前年份
    this.currentMonth = this.startDate.getMonth() + 1 // 当前月份
  },
  methods: {
    changDate() {
      this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  display: flex;
  justify-content: flex-end;
}

::v-deep .el-calendar-day {
  height:  auto;
 }
::v-deep .el-calendar-table__row td::v-deep .el-calendar-table tr td:first-child, ::v-deep .el-calendar-table__row td.prev{
  border: none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 16px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
::v-deep .el-calendar__header {
   display: none
}
</style>

