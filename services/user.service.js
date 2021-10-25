import { BehaviorSubject } from 'rxjs'
import getConfig from 'next/config'
import Router from 'next/router'

import { fetchWrapper } from 'helpers'

const { publicRuntimeConfig } = getConfig()
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`
const userSubject = new BehaviorSubject(
  JSON.parse(
    typeof window !== 'undefined' ? localStorage.getItem('user') : null,
  ),
)

function login(username, password) {
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, { username, password })
    .then(user => {
      userSubject.next(user)
      localStorage.setItem('user', JSON.stringify(user))

      return user
    })
}

function logout() {
  localStorage.removeItem('user')
  userSubject.next(null)
  Router.push('/account/login')
}

function register(user) {
  return fetchWrapper.post(`${baseUrl}/register`, user)
}

function getAll() {
  return fetchWrapper.get(baseUrl)
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`)
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then(x => {
    if (id === userSubject.value.id) {
      const user = { ...userSubject.value, ...params }
      localStorage.setItem('user', JSON.stringify(user))
      userSubject.next(user)
    }
    return x
  })
}

function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`)
}

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value
  },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
}
