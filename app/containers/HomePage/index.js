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
import styled from 'styled-components';

import { makeSelectCurrentUser } from './selectors';
import {
  fetchUser,
} from './actions';
// business actions
import { fetchMomemtsRoleList } from 'containers/Business/actions';

import Business from '../Business';
import UserCenter from '../UserCenter';

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 56px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

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
  <Business />,
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
    const { currentUser, getUser, getRoleList } = this.props;

    if (!currentUser.id) {
      getUser();
      getRoleList();
    }
  }

  handleNavChange(activeIndex) {
    this.setState({ activeIndex, className: themeClassNames[activeIndex] });
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <div>
        <ContentWrapper>
          {contents[activeIndex]}
        </ContentWrapper>
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
  getRoleList: PropTypes.func,
  currentUser: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(fetchUser()),
    getRoleList: () => dispatch(fetchMomemtsRoleList()),
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
