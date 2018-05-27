import { isPlainObject } from "./utils/is-plain-object";

/**
 * Implement a predictable state container (inspired by Redux):
 *
 * 1. The store should be created by a `createStore` factory (use Crockford's Object creation pattern: https://www.youtube.com/watch?v=PSGEjv3Tqo0)
 * 2. The store object returned should provide `dispatch`, `subscribe` and `getState` methods
 * 3. Reducers must always be functions!
 * 4. Actions must always be plain objects!
 * 5. A store can have more than one subscriber
 * 6. Ensures immutability of listeners is guaranteed during a dispatch cycle
 * 7. Allows nested dispatch
 * 8. Does not leak listeners
 * 9. Does not allow dispatch(), getState(), subscribe(), unsubscribe() from within a reducer
 * 13. Recovers from errors
 * 14. Throws if action type is missin or undefined and not if falsy
 */

 // https://github.com/reduxjs/redux/blob/master/src/createStore.js

export function createStore(reducer, initialState) {
    if (typeof reducer !== 'function') {
        throw new Error('Expected the reducer to be a function.')
    }
    
    const store = {};
    store.state = initialState;
    store.listeners = [];
    
    const getState = () => store.state;
    
    const subscribe = (listener) => {
      store.listeners.push(listener);
    };
    
    const  dispatch = (action) => {
        if (!isPlainObject(action)) {
            throw new Error(
                'Actions must be plain objects. ' +
                'Use custom middleware for async actions.'
            )
        } else if (typeof action.type === 'undefined') {
            throw new Error(
                'Actions may not have an undefined "type" property. ' +
                'Have you misspelled a constant?'
            )
        } else if (action.type === false || action.type === 0 || action.type === null || action.type === '') {
			return new Error('Action type is wrong');
        }
        
        store.state = reducer(store.state, action);
        store.listeners.forEach(listener => listener());
    };
    
    return { 
        dispatch, 
        subscribe, 
        getState }
}
