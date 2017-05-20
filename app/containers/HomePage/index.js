/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CSSTransitionGroup from 'react-addons-css-transition-group';
import BottomNavigation from 'react-md/lib/BottomNavigations';

import { makeSelectCurrentUser } from './selectors';
import {
  fetchUser,
} from './actions';

import UserCenter from '../UserCenter';

const links = [{
  label: '动态',
  iconClassName: 'fa fa-life-bouy',
}, {
  label: '消息',
  iconClassName: 'fa fa-commenting-o',
}, {
  label: '人脉',
  iconClassName: 'fa fa-handshake-o',
}, {
  label: '我的',
  iconClassName: 'fa fa-user-circle-o',
}];

const themeClassNames = ['movies-and-tv', 'music', 'book', 'news-stand'];

const contents = [
  <div key="business">动态</div>,
  <div key="message">消息</div>,
  <div key="dashboard">人脉</div>,
  <UserCenter />,
];

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      className: themeClassNames[0],
      phone: null,
      visible: true,
    };

    this.handleNavChange = this.handleNavChange.bind(this);
  }

  componentWillMount() {
    const { currentUser, getUser } = this.props;

    if (!currentUser.id) {
      getUser();
    }
  }

  handleNavChange(activeIndex) {
    this.setState({ activeIndex, className: themeClassNames[activeIndex] });
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <div>
        {contents[activeIndex]}
        <BottomNavigation
          links={links}
          colored
          activeIndex={activeIndex}
          onNavChange={this.handleNavChange}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  getUser: PropTypes.func,
  currentUser: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(fetchUser()),
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
