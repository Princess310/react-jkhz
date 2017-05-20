/*
 *
 * UserCenter
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import pgImg from 'assets/images/person-bg.png';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import FontIcon from 'react-md/lib/FontIcons';
import Divider from 'react-md/lib/Dividers';
import Paper from 'react-md/lib/Papers';

import ExpProgress from 'components/ExpProgress';
import FlexRow from 'components/FlexRow';
import FlexCenter from 'components/FlexCenter';
import styled from 'styled-components';
import pallete from 'styles/colors';

import makeSelectUserCenter from './selectors';
import messages from './messages';

import './styles.scss';

const SubInfoWrapper = styled(Paper)`
  display: flex;
  margin-bottom: 16px;
  background-color: ${pallete.white};
  height: 36px;
  color: ${pallete.text.subHelp};
`;

const SubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 50%;
`;

export class UserCenter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    imgHeight: 230,
  }

  render() {
    const { imgHeight } = this.state;
    const { currentUser } = this.props;

    return (
      <div>
        <Toolbar
          colored
          nav={<Button key="search" icon>search</Button>}
          actions={<Button icon key="search" iconClassName="fa fa-cog" />}
          fixed
          style={{ height: imgHeight }}
          zDepth={1}
          className="flexible-toolbar-user-center"
        >
          <div className="flexible-toolbar-img-container">
            <img
              key="img"
              className="flexible-toolbar-img"
              src={pgImg}
              alt={currentUser.nickname}
              style={{ height: imgHeight }}
            />
            <div className="user-center-wrapper">
              <img
                className="user-center-avatar"
                src={currentUser.avatar}
                alt="currentUser.nickname"
              />
              <div className="user-info-item">
                <span className="info-item">{currentUser.nickname}</span>
                {currentUser.position !== '' && <span className="info-item">{currentUser.position}</span>}
              </div>
              <div className="user-info-item">
                {currentUser.company !== '' && <span className="info-item">{currentUser.company}</span>}
                {currentUser.tag_identity_name !== '' && <span className="info-item">{currentUser.tag_identity_name}</span>}
              </div>
              <div className="user-info-item">{currentUser.intro}</div>
            </div>
          </div>
        </Toolbar>

        <div className="user-center-actions">
          <SubInfoWrapper zDepth={1}>
            <SubInfo className="user-sub-info-item">
              活跃度：<span style={{color: pallete.theme}}>{currentUser.influence}</span>
            </SubInfo>
            <SubInfo>
              影响力：<ExpProgress progress={currentUser.integrity_progress} />
              <span style={{ marginLeft: '4px', color: pallete.text.yellow }}>V{currentUser.integrity_level}</span>
            </SubInfo>
          </SubInfoWrapper>

          <List className="md-cell md-paper md-paper--1 user-ceter-list">
            <ListItem
              primaryText="访客"
              leftIcon={<FontIcon key="supervisor_account">supervisor_account</FontIcon>}
              rightIcon={<FontIcon key="chevron_right">chevron_right</FontIcon>}
            />
            <Divider inset />
            <ListItem
              primaryText="我的动态"
              leftIcon={<FontIcon iconClassName="fa fa-life-bouy" />}
              rightIcon={<FontIcon key="chevron_right">chevron_right</FontIcon>}
            />
            <Divider inset />
            <ListItem
              primaryText="我的需求"
              leftIcon={<FontIcon iconClassName="fa fa-handshake-o" forceSize={22} />}
              rightIcon={<FontIcon key="chevron_right">chevron_right</FontIcon>}
            />
            <Divider inset />
            <ListItem
              primaryText="我的邀约"
              leftIcon={<FontIcon key="data" iconClassName="fa fa-user-o" />}
              rightIcon={<FontIcon key="chevron_right">chevron_right</FontIcon>}
            />
            <Divider inset />
            <ListItem
              primaryText="我的收藏"
              leftIcon={<FontIcon key="star_border" forceSize={22}>star_border</FontIcon>}
              rightIcon={<FontIcon key="chevron_right">chevron_right</FontIcon>}
            />
          </List>
        </div>
      </div>
    );
  }
}

UserCenter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectUserCenter(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter);
