/*
 *
 * Business
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { TabsContainer, Tabs, Tab } from 'react-md/lib/Tabs';
import Toolbar from 'react-md/lib/Toolbars';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons';

import MomentCard from 'components/MomentCard';

import { makeSelectRoleList, makeSelectMomentListMap, makeSelectMomentHasNextMap } from './selectors';
import { fetchMomentsList } from './actions';
import messages from './messages';

const tabsStyle = {
  position: 'absolute',
  top: '104px',
  left: 0,
  right: 0,
  bottom: 0,
  overflowY: 'scroll',
  WebkitOverflowScrolling: 'touch',
};

let roleForRoleMap = {};
export class Business extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    refreshForRoleMap: {},
    loadingForRoleMap: {},
    pageForRoleMap: {},
    firstLoadedRoleMap: {},
    startPage: 1,
  }
  
  onTabChange = (activeIndex) => {
    const role = roleForRoleMap[activeIndex];
    const { momentListMap, getMomentList } = this.props;

    // if the list for role not fetched, do the fetch action
    if(role && !momentListMap[role.id]) {
      getMomentList(role.id, this.state.startPage);
    }
  }

  render() {
    const { roleList, momentListMap } = this.props;
    const { refreshForRoleMap, loadingForRoleMap } = this.state;

    const toolBar = (
      <Toolbar
        nav={<Button icon iconClassName="fa fa-location-arrow" />}
        title="动态"
        colored
        actions={[
          <Button key="search" icon>search</Button>,
        ]}
      />
    );
    
    const tabsView = roleList ? roleList.map((role, i) => {
      // record the index to role map info
      roleForRoleMap[i] = role;

      const list = momentListMap[role.id] || [];
      const refreshing = (typeof refreshForRoleMap[role.id] === 'undefined' ? false : refreshForRoleMap[role.id]);
      const loading = (typeof loadingForRoleMap[role.id] === 'undefined' ? false : loadingForRoleMap[role.id]);

      const listView =list.map((moment) => {
        return (
          <MomentCard key={moment.id} moment={moment} />
        );
      });

      return (
        <Tab key={role.id} label={role.name}>
          {listView}
        </Tab>
      );
    }) : null;
      
    return (
      <div>
        {toolBar}
        {roleList && momentListMap ?
          <TabsContainer
            colored
            panelClassName="md-grid phone-tab-content"
            swipeableViewsStyle={tabsStyle}
            onTabChange={this.onTabChange}
          >
            <Tabs tabId="moment-tabs">
              {tabsView}
            </Tabs>
          </TabsContainer>
          : null
        }
      </div>
    );
  }
}

Business.propTypes = {
  roleList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  momentListMap: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  hasNextMap: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  getMomentList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  roleList: makeSelectRoleList(),
  momentListMap: makeSelectMomentListMap(),
  hasNextMap : makeSelectMomentHasNextMap(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMomentList: (role, page) => dispatch(fetchMomentsList(role, page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Business);
