<template>
  <upload-excel :on-success="handleSuccess" />
  <!--
    before upload :上传前校验
    on-success：上传excel成功
    -->
</template>

<script>
import { reqAddEmployyeeBatch } from '@/api/employeelist'
// import employees from '@/router/modules/employees'
// import { format } from 'echarts/core'
export default {
  name: 'Import',
  methods: {
    async handleSuccess({ header, results }) {
      // this.$router 路由对象
      // this.$route 路由参数对象
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
          // obj[englistkey] = item[k]
          if (['timeOfEntry', 'correctionTime'].includes(englistkey)) {
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

      // js时间戳： 以1970-1-1开始计算 ，并且得到的结果是"毫秒数
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
