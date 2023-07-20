// 组织架构模块
import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employments/employees/'),
      meta: { title: '员工', icon: 'people' }
    }
  ]
}