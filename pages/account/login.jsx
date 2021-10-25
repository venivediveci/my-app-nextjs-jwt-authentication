import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { userService, alertService } from 'services/'
import { Layout } from 'components/account/Layout'
import { Link } from 'components/Link'

function Login() {
  const router = useRouter()

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  const onSubmit = ({ username, password }) => {
    return userService
      .login(username, password)
      .then(() => {
        const returnUrl = router.query.returnUrl || '/'
        router.push(returnUrl)
      })
      .catch(alertService.error)
  }

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                {...register('username')}
                className={`form-control ${
                  errors.username ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                {...register('password')}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary mt-2"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1" />
              )}
              Login
            </button>
            <Link href="/account/register" className="btn btn-link">
              Register
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login
