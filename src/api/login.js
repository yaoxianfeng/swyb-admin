import request from '../utils/request.js'

export function login(data) {
  return request({
    url: '/api/private/v1/login',
    method: 'post',
    data
  })
}
