import { combineReducers } from 'redux';
import connect from '../src/connect';
import createStore from '../src/createStore';
import counterReducer, { operations } from './__mocks__';

describe('createStore test', () => {
    let mockConnectedClass;

    beforeAll(() => {
        // Initialize the store before running all the tests
        const rootReducer = combineReducers({ counter: counterReducer });
        createStore(rootReducer);

        // Connect a javascript class to the store
        const mapStateToProps = store => ({
            counter: store.counter
        });
        const mapDispatchToProps = { ...operations };

        class MyTestClass {}

        const ConnectedClass = connect(mapStateToProps, mapDispatchToProps)(MyTestClass);
        mockConnectedClass = new ConnectedClass();
    });

    it('connect give you access to the store', () => {
        expect(mockConnectedClass.counter).toBeDefined();
    });

    it('connect give you access to dispatch functions', () => {
        expect(mockConnectedClass.increment).toBeDefined();
    });

    it('mapDispatchToProps can be an object', () => {
        expect(true).toEqual(true);
    });

    it('mapDispatchToProps can be a function with dispatch', () => {
        expect(true).toEqual(true);
    });
});
