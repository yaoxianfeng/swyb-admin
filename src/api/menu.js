import request from '../utils/request.js'

export function menus(parmas) {
  return request({
    url: '/api/private/v1/menus',
    method: 'get',
    parmas
  })
}
