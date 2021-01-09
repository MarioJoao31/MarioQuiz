import React from 'react'
import {Link, link } from 'react-router-dom';
export const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link>
        <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li><Link to ="#### tenho de meter a route ainda">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
    )
}

export default Navbar