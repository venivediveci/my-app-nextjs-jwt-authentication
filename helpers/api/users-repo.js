const fs = require('fs')

let users = require('data/users.json')

export const usersRepo = {
  getAll: () => users,
  getById: id => users.find(x => x.id.toString() === id.toString()),
  find: x => users.find(x),
  create,
  update,
  delete: _delete,
}

function create(user) {
  user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1

  user.dateCreated = new Date().toISOString()
  user.dateUpdated = new Date().toISOString()

  users.push(user)
  saveData()
}

function update(id, params) {
  const user = users.find(x => x.id.toString() === id.toString())

  user.dateUpdated = new Date().toISOString()

  Object.assign(user, params)
  saveData()
}

function _delete(id) {
  users = users.filter(x => x.id.toString() !== id.toString())
  saveData()
}

function saveData() {
  fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2))
}
