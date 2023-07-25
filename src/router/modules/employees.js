// 组织架构模块
import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/employees'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/id',
      name: 'detail',
      hidden: true,
      component: () => import('@/views/employees/detail')
    }
  ]
}

// detail?idxxx              this.$router.query.id   =>  xxx
// detaixxxx this.$router.query => xxx
