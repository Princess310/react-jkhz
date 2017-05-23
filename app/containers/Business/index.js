/*
 *
 * Business
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import request from 'utils/request';

import { TabsContainer, Tabs, Tab } from 'react-md/lib/Tabs';
import Toolbar from 'react-md/lib/Toolbars';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons';

import MomentCard from 'components/MomentCard';
import { PullToRefresh, Loaders } from 'components/PullToRefresh';
import InfiniteScroll from 'react-infinite-scroller';

import { makeSelectRoleList, makeSelectMomentListMap, makeSelectMomentHasNextMap } from './selectors';
import { fetchMomentsList, loadMomentsList } from './actions';
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
    pageForRoleMap: {},
    firstLoadedRoleMap: {},
    startPage: 1,
    activeIndex: 0,
  }
  
  onTabChange = (activeIndex) => {
    const role = roleForRoleMap[activeIndex];
    const { momentListMap, getMomentList } = this.props;

    // record the active index
    this.setState({
      activeIndex,
    });
    // if the list for role not fetched, do the fetch action
    if(role && !momentListMap[role.id]) {
      getMomentList(role.id, this.state.startPage);

    }
  }

  handleRefresh = (resolve) => {
    const { activeIndex, pageForRoleMap, startPage } = this.state;
    const { setMomentList } = this.props;
    const currentRole = roleForRoleMap[activeIndex];

    request.doGet('moments/exhibition-moments', {
      role: currentRole.id,
      page: startPage,
    }).then((res) => {
      const { list, page } = res;
      setMomentList(currentRole.id, list, page);

      // record the page info for roles
      this.setState({
        pageForRoleMap: {
          ...pageForRoleMap,
          [currentRole.id]: startPage
        },
      });

      resolve();
    });
  }

  handleLoadMore = () => {
    const { activeIndex, pageForRoleMap, startPage } = this.state;
    const { getMomentList, hasNextMap } = this.props;
    const currentRole = roleForRoleMap[activeIndex];
    const page = (typeof pageForRoleMap[currentRole.id] === 'undefined' ? startPage : pageForRoleMap[currentRole.id]);

    if (!hasNextMap[currentRole.id]) {
      return;
    }

    getMomentList(currentRole.id, page + 1);
    this.setState({
      pageForRoleMap: {
        ...pageForRoleMap,
        [currentRole.id]: page + 1,
      },
    });
  }

  render() {
    const { roleList, momentListMap, hasNextMap } = this.props;

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
      const hasNext = hasNextMap[role.id];

      const listView =list.map((moment) => {
        return (
          <MomentCard key={moment.id} moment={moment} />
        );
      });

      return (
        <Tab key={role.id} label={role.name}>
          {listView}
          {hasNext && <Button flat label="加载更多..." style={{ width: '100%' }} onClick={this.handleLoadMore} />}
        </Tab>
      );
    }) : null;
      
    return (
      <div>
        <PullToRefresh loader={Loaders.Modern} onRefresh={this.handleRefresh}>
          {toolBar}
        </PullToRefresh>
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
    setMomentList: (role, list, page) => dispatch(loadMomentsList(role, list, page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Business);
