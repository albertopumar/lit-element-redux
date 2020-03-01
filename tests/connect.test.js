import { combineReducers } from 'redux';
import connect from '../src/connect';
import createStore from '../src/createStore';
import counterReducer, { operations } from './__mocks__';
import MockComponent from './__mocks__/MockComponent';

describe("createStore test", () => {

  // Mock element connected to redux using an object as mapDispatchToProps
  let mockConnectedObject;
  let ConnectedObjectComponent;
  // Mock element connected to redux using a function as mapDispatchToProps
  let mockConnectedFunction;
  let ConnectedFunctionComponent;

  beforeAll(() => {
    // Initialize the store before running all the tests
    const rootReducer = combineReducers({ counter: counterReducer });
    createStore(rootReducer);

    // Connect a javascript class to the store
    const mapStateToProps = store => ({
      counter: store.counter
    });
    const mapDispatchToProps = { ...operations };
    const mapDispatchToPropsFunction = dispatch => ({
      increment: () => dispatch(operations.increment()),
      decrement: () => dispatch(operations.decrement())
    });

    // Define components describing all options
    ConnectedObjectComponent = connect(mapStateToProps, mapDispatchToProps)(MockComponent);
    window.customElements.define('mock-connected-object', ConnectedObjectComponent);
    mockConnectedObject = document.createElement('mock-connected-object');

    ConnectedFunctionComponent = connect(mapStateToProps, mapDispatchToPropsFunction)(MockComponent);
    window.customElements.define('mock-connected-function', ConnectedFunctionComponent);
    mockConnectedFunction = document.createElement('mock-connected-function');
  });

  it('connect give you access to the store', () => {
    expect(mockConnectedObject.counter).toBeDefined();
  });

  it('connect give you access to dispatch functions', () => {
    mockConnectedObject.increment();
    expect(mockConnectedObject.increment).toBeDefined();
  });

  it('mapDispatchToProps can be an object', () => {
    mockConnectedObject.decrement();
    expect(mockConnectedObject.decrement).toBeDefined();
  });

  it('mapDispatchToProps can be a function', () => {
    mockConnectedFunction.decrement();
    expect(mockConnectedFunction.decrement).toBeDefined();
  });

  it('properties to be defined', () => {
    expect(ConnectedObjectComponent.properties.counter).toBeDefined();
  });

  it('connected callback subscribes to store changes when called', () => {
    document.body.append(mockConnectedObject);

    expect(mockConnectedObject._storeUnsubscribe).toBeDefined();
  });

  it('disconnected callback clear the subscription', () => {
    document.body.removeChild(mockConnectedObject);
    const previousCounter = mockConnectedObject.counter;
    mockConnectedObject.increment();
    expect(mockConnectedObject.counter).toBe(previousCounter);
  });
});
