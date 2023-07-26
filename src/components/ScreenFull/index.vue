<template>
  <div>
    <!--全屏按钮-->
    <svg-icon
      :icon-class="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"
      class="fullscreen"
      @click="toggle"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'ScreenFull',
  data() {
    return {
      isFullscreen: false // 是否全屏
    }
  },
  methods: {
    toggle() {
      if (screenfull.isEnabled) { // 判断是否支持全屏
        screenfull.toggle() // 切换全屏
        this.isFullscreen = !this.isFullscreen // 改变全屏状态
      } else {
        this.$message.error('您的浏览器不支持全屏') // 提示信息
      }
    }
  }
}
</script>

<style>
.fullscreen {
  width: 20px;
  height: 20px;
  fill: #fff;
  cursor: pointer;
}
</style>
