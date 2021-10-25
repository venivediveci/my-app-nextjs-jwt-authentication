import { useRouter } from 'next/router'

import { Link } from '.'

export { NavLink }

function NavLink({ children, href, exact, ...props }) {
  const { pathname } = useRouter()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  if (isActive) {
    props.className += ' active'
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
