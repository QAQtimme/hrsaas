import request from '@/utils/request'

// 获取部门列表
export function reqGetDepartments() {
  return request({
    url: '/company/departments',
    method: 'get'
  })
}

// 根据id删除部门
export function reqDelDepartment(id) {
  return request({
    url: `/company/departments/${id}`,
    method: 'delete'
  })
}

// 新增部门
export function reqAddDepartment(data) {
  return request({
    url: '/company/departments',
    method: 'post',
    data
  })
}

// 根据id获取部门详情
export function reqGetDepartDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'get'
  })
}

// 更新部门信息
export function reqUpdateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
