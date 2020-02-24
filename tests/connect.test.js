import { combineReducers } from 'redux'

import connect from '../src/connect';
import createStore from '../src/createStore';
import counterReducer, { operations } from './__mocks__';

describe("createStore test", () => {

  // Mock element connected to redux using an object as mapDispatchToProps
  let ConnectedClassObject;
  let mockConnectedClassObject;
  // Mock element connected to redux using a function as mapDispatchToProps
  let ConnectedClassFunction;
  let mockConnectedClassFunction;

  beforeAll(() => {
    // Initialize the store before running all the tests
    const rootReducer = combineReducers({ counter: counterReducer });
    createStore(rootReducer);

    // Connect a javascript class to the store
    const mapStateToProps = store => ({
      counter: store.counter,
    });
    const mapDispatchToProps = { ...operations };
    const mapDispatchToPropsFunction = dispatch => ({
      increment: () => dispatch(operations.increment()),
      decrement: () => dispatch(operations.decrement())
    });

    class MyTestClass { }

    ConnectedClassObject = connect(mapStateToProps, mapDispatchToProps)(MyTestClass);
    mockConnectedClassObject = new ConnectedClassObject();

    ConnectedClassFunction = connect(mapStateToProps, mapDispatchToPropsFunction)(MyTestClass);
    mockConnectedClassFunction = new ConnectedClassFunction();
  });

  it('connect give you access to the store', () => {
    expect(mockConnectedClassObject.counter).toBeDefined();
  });

  it('connect give you access to dispatch functions', () => {
    mockConnectedClassObject.increment();
    expect(mockConnectedClassObject.increment).toBeDefined();
  });

  it('mapDispatchToProps can be an object', () => {
    mockConnectedClassObject.decrement();
    expect(mockConnectedClassObject.decrement).toBeDefined();
  });

  it('mapDispatchToProps can be a function', () => {
    mockConnectedClassFunction.decrement();
    expect(mockConnectedClassFunction.decrement).toBeDefined();
  });

  it('properties to be defined', () => {
    expect(ConnectedClassObject.properties.counter).toBeDefined();
  });

  it('connected callback subscribes to store changes when called', () => {
    mockConnectedClassObject.connectedCallback();

    expect(mockConnectedClassObject._storeUnsubscribe).toBeDefined();
  });
});
