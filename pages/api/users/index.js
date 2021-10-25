import { apiHandler, usersRepo, omit } from 'helpers/api'

export default apiHandler({
  get: getUsers,
})

function getUsers(req, res) {
  const response = usersRepo.getAll().map(x => omit(x, 'hash'))
  return res.status(200).json(response)
}
