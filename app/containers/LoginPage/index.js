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

import Button from 'react-md/lib/Buttons/Button';

import { makeSelectLoginError } from './selectors';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <Button raised primary iconBefore={false} label="Login page" iconClassName="fa fa-hand-paper-o" />
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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
