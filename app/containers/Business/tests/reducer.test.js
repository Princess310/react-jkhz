
import { fromJS } from 'immutable';
import businessReducer from '../reducer';

describe('businessReducer', () => {
  it('returns the initial state', () => {
    expect(businessReducer(undefined, {})).toEqual(fromJS({}));
  });
});
