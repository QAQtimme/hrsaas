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

// 根据id获取员工基本信息 (包含头像)
export function reqGetUserDetailById(id) {
  return request({
    method: 'get',
    url: `/sys/user/${id}`
  })
}

/** *
 * 保存员工的基本信息
 * **/
export function reqSaveUserDetailById(data) {
  return request({
    method: 'put',
    url: `/sys/user/${data.id}`,
    data
  })
}

/** *
 *  读取用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function reqGetPersonalDetail(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function reqUpdatePersonal(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/personalInfo`,
    data
  })
}

/** **
 * 获取用户的岗位信息  (岗位信息)
 * ****/
export function reqGetJobDetail(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息  (岗位信息)
 * ****/
export function reqUpdateJob(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/jobs`,
    data
  })
}

// 员工分配角色
export function reqAssignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}
