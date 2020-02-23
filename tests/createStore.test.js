import { combineReducers } from 'redux';
import createStore, { getStore } from '../src/createStore';
import counterReducer from './__mocks__';

describe('createStore test', () => {
  beforeAll(() => {
    // Initialize the store before running all the tests
    const rootReducer = combineReducers({ counter: counterReducer });

    createStore(rootReducer);
  });

  it('expose the store after created with "createStore"', () => {
    // Retrieve the store and check if it was initialized
    const store = getStore();
    expect(store).toBeDefined();
  });

  it('initial store structure is defined', () => {
    // Retrieve the store and check if it has proper structure
    const store = getStore();

    const expectedStore = { counter: 0 };
    expect(store.getState()).toMatchObject(expectedStore);
  });
});
