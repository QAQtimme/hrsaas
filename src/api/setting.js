import request from '@/utils/request'

// 函数的默认参数
export function reqGetRoleList(page, pageSize) {
  return request({
    url: '/sys/role',
    method: 'get',
    params: {
      page,
      pageSize
    }
  })
}

// 根据id删除角色
export function reqDelRole(id) {
  return request({
    url: '/sys/role/${id}',
    method: 'delete'
  })
}

// 添加角色
export function reqAddRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

// 编辑角色
export function reqGetRoleDetail(id) {
  return request({
    url: '/sys/role/${id}',
    method: 'get'
  })
}

// 更新角色
export function reqUpdateRole(data) {
  return request({
    url: '/sys/role/${data.id}',
    method: 'put',
    data
  })
}
