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
  height: 100%;
  width: 50%;
`;

const ActionWrapper = styled(Paper)`
  display: flex;
  margin-bottom: 16px;
  background-color: ${pallete.white};
  height: 40px;
`;

const actionBtnStyle = {
  margin: 0,
  height: '100%',
  width: '50%',
};

export class UserCenter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    imgHeight: 230,
  }

  render() {
    const { imgHeight } = this.state;
    const { currentUser } = this.props;

    return (
      <div className="user-center">
        <div className="user-info-bg">
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
          <Button icon key="cog" className="action-right-btn" iconClassName="fa fa-cog" />
        </div>

        <div className="user-center-actions">
          <SubInfoWrapper>
            <SubInfo className="user-sub-info-item">
              活跃度：<span style={{color: pallete.theme}}>{currentUser.influence}</span>
            </SubInfo>
            <SubInfo className="user-sub-info-item">
              影响力：<ExpProgress progress={currentUser.integrity_progress} />
              <span style={{ marginLeft: '4px', color: pallete.text.yellow }}>V{currentUser.integrity_level}</span>
            </SubInfo>
          </SubInfoWrapper>

          <ActionWrapper zDepth={1}>
            <Button flat label="编辑资料" style={actionBtnStyle} className="user-sub-info-item" />
            <Button flat label="业务介绍" style={actionBtnStyle} className="user-sub-info-item" />
          </ActionWrapper>

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

          <List className="md-cell md-paper md-paper--1 user-ceter-list" style={{ marginTop: '16px' }}>
            <ListItem
              primaryText="成为认证用户"
              leftIcon={<FontIcon key="supervisor_account">supervisor_account</FontIcon>}
              rightIcon={<FontIcon key="chevron_right">chevron_right</FontIcon>}
            />
          </List>

          <List className="md-cell md-paper md-paper--1 user-ceter-list" style={{ marginTop: '16px' }}>
            <ListItem
              primaryText="邀请好友帮您增加活跃度"
              tileStyle={{textAlign: 'center'}}
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
