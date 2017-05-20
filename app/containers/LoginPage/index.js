/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import request from 'utils/request';

import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';
import Snackbar from 'react-md/lib/Snackbars';

import { makeSelectLoginError } from './selectors';
import { doLogin, loadLoginError } from './actions';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    username: '',
    password: '',
  }

  handleUsername = (value) => {
    this.setState({
      username: value,
    });
  }

  handlePassword = (value) => {
    this.setState({
      password: value,
    });
  }

  removeToast = () => {
    this.props.setLoadingError(false, { message: '' });
  }

  handleLogin = () => {
    const { username, password } = this.state;

    return this.props.doLogin(username, password);
  }

  render() {
    const { username, password } = this.state;
    const { loginError: { error, msg } } = this.props;
    const disableBtn = (username === '' || password === '');
    const toasts = error ? [{
      text: msg
    }] : [];

    return (
      <div style={{ padding: '0 16px' }}>
        <TextField
          id="username"
          label="账号"
          value={username}
          onChange={this.handleUsername}
          required
          leftIcon={<FontIcon iconClassName="fa fa-user" />}
          className="md-cell md-cell--bottom"
          onKeyUp={(e) => {
            if (e.which === 13) {
              this.handleLogin(e);
            }
          }}
        />
        <TextField
          id="password"
          label="密码"
          type="password"
          value={password}
          onChange={this.handlePassword}
          required
          leftIcon={<FontIcon iconClassName="fa fa-lock" />}
          className="md-cell md-cell--bottom"
          onKeyUp={(e) => {
            if (e.which === 13) {
              this.handleLogin(e);
            }
          }}
        />

        <Button
          disabled={disableBtn}
          raised
          primary
          style={{width: '100%', marginTop: '24px'}}
          label="登录"
          onClick={this.handleLogin}
        />

        <Snackbar toasts={toasts} autohide={true} onDismiss={this.removeToast} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  doLogin: PropTypes.func,
  setLoadingError: PropTypes.func,
  loginError: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loginError: makeSelectLoginError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    doLogin: (u, p) => dispatch(doLogin(u, p)),
    setLoadingError: (b, d) => dispatch(loadLoginError(b, d)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
