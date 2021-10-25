import { useState, useEffect } from 'react'

import { Layout, AddEdit } from 'components/users'
import { Spinner } from 'components/Spinner'
import { userService, alertService } from 'services/user.service'

export default Edit

function Edit({ id }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService
      .getById(id)
      .then(x => setUser(x))
      .catch(alertService.error)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout>
      <h1>Edit User</h1>
      {user ? <AddEdit user={user} /> : <Spinner />}
    </Layout>
  )
}

export async function getServiceSideProps({ params }) {
  return {
    props: {
      id: { id: params.id },
    },
  }
}
