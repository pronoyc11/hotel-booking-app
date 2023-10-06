import React from 'react'
import { Link } from 'react-router-dom'
import classes from "../css/Navgation.module.css";

const Navigation = () => {
  return (
    <div className={classes.navigation}>
             <Link to="/" className={classes.hotelName}>BookEnjoy</Link>
  
  <nav className='navabar'>
  <Link to="/profile" className={classes.navLink}>Profile</Link>
  <Link to="/auth" className={classes.navLink}>Sign up</Link>
  </nav>

    </div>
  )
}

export default Navigation