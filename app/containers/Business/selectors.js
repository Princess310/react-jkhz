import { createSelector } from 'reselect';

/**
 * Direct selector to the business state domain
 */
const selectBusinessDomain = () => (state) => state.get('business');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Business
 */

const makeSelectRoleList = () => createSelector(
  selectBusinessDomain(),
  (substate) => substate.get('roles')
);

const makeSelectMomentListMap = () => createSelector(
  selectBusinessDomain(),
  (substate) => substate.get('listMap')
);

const makeSelectMomentHasNextMap = () => createSelector(
  selectBusinessDomain(),
  (substate) => substate.get('hasNextMap')
);

export {
  makeSelectRoleList,
  makeSelectMomentListMap,
  makeSelectMomentHasNextMap,
};
