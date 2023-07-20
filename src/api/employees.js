import request from '@utils/request'

// 员工简单列表
export function reqEmployeeSimple() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}

// 获取员工列表
export function reqGetEmployeeList(page, size) {
  return request({
    url: '/sys/user',
    method: 'get',
    params: {
      page: page,
      size: size
    }
  })
}

// 删除员工
export function reqDelEmployee(id) {
  return request({
    url: '/sys/user/${id}',
    method: 'delete'
  })
}

// 新增员工
export function reqAddEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 批量添加员工
// 格式 ： 数组
export function reqAddEmployeeBatch(arr) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data: arr
  })
}
