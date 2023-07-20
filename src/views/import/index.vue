<template>
  <upload-excel :on-success="handleSuccess" />
</template>

<script>
import { reqAddEmployyeeBatch } from '@/api/employeelist'
import employees from '@/router/modules/employees'
export default {
  name: 'Import',
  methods: {
    async handleSuccess({ header, results }) {
        //this.$router 路由对象
        //this.$route 路由参数对象
        // 地址？abc=xxx           this.$router.query.abc
        // 地址/1   (路由  地址/id) this.$route.params.id

      // header中, results中的数据是中文的, 但是提交给后台的要是英文的
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const obj = {}
        for (var k in item) {
          const englistkey = userRelations[k]
          //obj[englistkey] = item[k]
          if(['timeOfEntry', 'correctionTime'].includes(englistkey)){
            obj[englistkey] = this.formatExcelDate(item[k])
          } else {
            obj[englistkey] = item[k]
          }
        }
        arr.push(obj)
      })
      await reqAddEmployyeeBatch(arr)
      this.$message.success('导入成功')
      // this.$router.push('/employees')
      this.$router.back()

      // js读取excel文件时间是以1900-1-1开始计算的，并且得到的结果是"天数"
      //js时间戳： 以1970-1-1开始计算 ，并且得到的结果是"毫秒数"
      formatExcelDate(numb, format) {
      const time = new Date(numb * 24 * 3600000 + 1)  // 毫秒
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = (time.getMonth() + 1) + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
