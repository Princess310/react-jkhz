/*
 *
 * Business actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_MOMENTS_ROLE_LIST,
  LOAD_MOMENTS_ROLE_LIST,
  FETCH_MOMENTS_LIST,
  LOAD_MOMENTS_LIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchMomemtsRoleList() {
  return {
    type: FETCH_MOMENTS_ROLE_LIST,
  };
}

export function loadMomemtsRoleList(list) {
  return {
    type: LOAD_MOMENTS_ROLE_LIST,
    payload: {
      list,
    },
  };
}

export function fetchMomentsList(role, page) {
  return {
    type: FETCH_MOMENTS_LIST,
    payload: {
      role,
      page,
    },
  };
}

export function loadMomentsList(role, list, page) {
  return {
    type: LOAD_MOMENTS_LIST,
    payload: {
      role,
      list,
      page,
    },
  };
}
