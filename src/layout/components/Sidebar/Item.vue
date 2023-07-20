<script>
// 组件中必须要有渲染的模板
// 方式一：组件中有template
// 方式二：函数式组件functional 函数式组件必须有一个render函数 render函数的返回值就是当前组件的值

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  // render函数中没有this，有context上下文变量
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      // 如果icon包含el-icon,代表使用的是elementui中的icon
      // 如果icon不包含el-icon,代表使用的是svg-icon组件
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }
    // jsx语法
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
