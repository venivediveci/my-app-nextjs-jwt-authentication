import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import 'styles/globals.css'

import { userService } from 'services'
import { Nav, Alert } from 'components'

export default MyApp

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    authCheck(router.asPath)

    const hideContent = () => {
      setAuthorized(false)
    }
    router.events.on('routeChangeStart', hideContent)
    router.events.on('routeChangeComplete', authCheck)

    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }
  }, [])

  function authCheck(url) {
    setUser(userService.userValue)
    const publicPaths = ['/account/login', '/account/register']
    const path = url.split('?')[0]
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false)
      router.push({
        pathname: '/account/login',
        query: { returnUrl: router.asPath },
      })
    } else {
      setAuthorized(true)
    }
  }
  return (
    <>
      <Head>
        <title>Next.js 11 - User Registration and Login Example</title>

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </Head>

      <div className={`app-container ${user ? 'bg-light' : ''}`}>
        <Nav />
        <Alert />
        {authorized && <Component {...pageProps} />}
      </div>
    </>
  )
}
