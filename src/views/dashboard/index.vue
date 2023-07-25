<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div>首页</div>
    <uploadimage />
  </div>
</template>

<!---->
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      value: ''
    }
  },
  methods: {
    beforeUpload() {
      // 判断文件大小是否下雨1M
      // 计算基础单位：字节byte 1kb=1024b 1M=1024kb 1G=1024mb
      // eslint-disable-next-line no-undef
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) return true
      this.$message.warning('上传的文件大于1M')
      return false
    },
    handleSuccess(header, result) {
      console.log(header)
      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
