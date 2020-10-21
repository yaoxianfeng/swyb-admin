import request from '../utils/request.js'
export function rolseList(data) {
  return request({
    url: '/api/private/v1/roles',
    method: 'get',
    data
  })
}


export function addInface(data) {
  return request({
    url: '/api/private/v1/roles',
    method: 'post',
    data
  })
}

export function editFun(pojo) {
  debugger
  return request({
    url: `/api/private/v1/roles/${pojo.id}`,
    method: 'put',
    data: pojo
  })
}
