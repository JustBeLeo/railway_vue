import request from '@/utils/request'

const api_name = '/service_user/user'

export default {
  getUserList(current, limit, userQuery) {
    return request({
      url: `${api_name}/pageConditionUser/${current}/${limit}`,
      method: 'post',
      data: userQuery
    })
  },
  removeById(userId) {
    return request({
      url: `${api_name}/deleteUser/${userId}`,
      method: 'delete'
    })
  },
  save(user) {
    return request({
      url: `${api_name}/addUser`,
      method: 'post',
      data: user
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/getUserInfo/${id}`,
      method: 'get'
    })
  }
}
