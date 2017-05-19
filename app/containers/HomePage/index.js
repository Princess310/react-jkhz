/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons/Button';
import BottomNavigation from 'react-md/lib/BottomNavigations';

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
  <div key="mine">个人中心</div>,
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

    this._handleNavChange = this._handleNavChange.bind(this);
  }

  _handleNavChange(activeIndex) {
    this.setState({ activeIndex, className: themeClassNames[activeIndex] });
  }

  render() {
    const { activeIndex, className, visible } = this.state;

    return (
      <div>
        <CSSTransitionGroup
          ref={this._setContent}
          component="main"
          className="toolbar-offset"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          {contents[activeIndex]}
        </CSSTransitionGroup>
        <BottomNavigation
          links={links}
          colored
          activeIndex={activeIndex}
          onNavChange={this._handleNavChange}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
};

export function mapDispatchToProps(dispatch) {
  return {}
}

const mapStateToProps = createStructuredSelector({
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
