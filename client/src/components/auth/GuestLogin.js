import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const GuestLogin = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // email = "Guest@gmail.com";
    // password = "Guesto";
    login("Guest@gmail.com", "Guesto");
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user-secret" /> Sign In as Guest!
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="login-email-input"
            type="email"
            placeholder="Guest@gmail.com"
            name="email"
            value={"Guest@gmail.com"}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="login-password-input"
            type="password"
            placeholder="Guesto"
            name="password"
            value={"Guesto"}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

GuestLogin.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(GuestLogin);
