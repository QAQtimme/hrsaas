import request from '@/utils/request'

export function getCompany(id) {
  return request({
    url: '/company/${id}',
    method: 'get'
  })
}
