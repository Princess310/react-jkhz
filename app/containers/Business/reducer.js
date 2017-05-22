/*
 *
 * Business reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_MOMENTS_ROLE_LIST,
  LOAD_MOMENTS_LIST,
} from './constants';

const initialState = fromJS({
  roles: false,
  listMap: false,
  hasNextMap: false,
});

function businessReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_MOMENTS_ROLE_LIST: {
      const { list } = action.payload;

      return state.set('roles', list);
    }
    case LOAD_MOMENTS_LIST: {
      const { role, list, page } = action.payload;
      const listMap =  state.get('listMap');
      const hasNextMap =  state.get('hasNextMap');
      const oldList = listMap[role];
      let newList = oldList ? oldList : [];
      let hasNext = true;

      if (page) {
        if(page.current_page === 1){
          newList = list;
        }else if(page.current_page <= page.page_count){
          newList = [...newList, ...list];
        }

        if(page.current_page >= page.page_count){
          hasNext = false;
        }
      } else {
        hasNext = false;
      }

      // set list to map
      const newListMap = {
        ...listMap,
        [role]: newList
      };

      // set next flag to map
      const newHasNextMap = {
        ...hasNextMap,
        [role]: hasNext
      }

      return state.set('listMap', newListMap).set('hasNextMap', newHasNextMap);
    }
    default:
      return state;
  }
}

export default businessReducer;
