import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './Navigation.styles.scss'
import { UserContext } from '../../context/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const signOutHandler = async () => {
    await signOutUser()
    setCurrentUser(null)
  }

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser
            ? <span className="nav-link" onClick={signOutHandler}>
                Sign Out
              </span>
            : <Link className="nav-link" to="/authentication">
                Sign In
              </Link>}
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
