import request from '../utils/request.js'
export function userList(params) {
  return request({
    url: '/api/private/v1/users',
    method: 'get',
    params
  })
}
export function editFun(pojo) {
  return request({
    url: `/api/private/v1/users/${pojo.id}`,
    method: 'put',
    data: pojo
  })
}
export function userState(pojo) {
  return request({
    url: `/api/private/v1/users/${pojo.id}/state/${pojo.mg_state}`,
    method: 'put',
    data: pojo
  })
}
