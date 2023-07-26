import vue from 'vue'
import VueI18n from 'vue-i18n' // 引入vue-i18n插件
import enLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import customEn from './en'
import customZh from './zh'
vue.use(VueI18n) // 使用vue-i18n插件

const i18n = new VueI18n({
  locale: 'en', // 语言标识
  messages: {
    en: {
      ...enLocale, // 引入element英文语言包
      ...customEn // 引入自定义英文语言包
    },
    zh: {
      ...zhLocale, // 引入element中文语言包
      ...customZh // 引入自定义中文语言包
    }
  }
}) // 创建vue-i18n实例

export default i18n // 导出实例
