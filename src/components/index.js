// vue的插件机制 Vue.use(插件)
// 插件参数有两种形式：1.对象 2.函数
// 如果是对象，对象必须提供install方法
// 如果是函数，这个函数相当于install方法

import PageTools from '../components/PageTools'
import UploadExcel from '../components/UploadExcel'
import UploadImage from '../components/UploadImage'
import ScreenFull from '../components/ScreenFull'
import Long from '../components/Long'
import TagsView from '../components/TagsView'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UplodadExcel', UploadExcel)
    Vue.component('UploadImage', UploadImage)
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('Long', Long)
    Vue.component('TagsView', TagsView)
  }
}
