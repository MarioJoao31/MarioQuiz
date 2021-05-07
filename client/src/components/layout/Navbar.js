import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-users" /> Perfis
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-question" /> Perguntas
        </Link>
      </li>
      <li>
        <Link to="/quizes">
          <i className="fas fa-gamepad" /> Quizes
        </Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-home" />{" "}
          <span className="hide-sm">Menu principal</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="/">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Perfis</Link>
      </li>
      <li>
        <Link to="/register">Registar</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
        <i class="fas fa-heartbeat"></i> TinderQuiz
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
