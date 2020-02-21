# Lit Element Redux
Redux connector for lit-element components. Create the store and connect your lit-element components using Redux standards.


[![npm version](https://img.shields.io/npm/v/lit-element-redux?style=flat-square)](https://www.npmjs.com/package/lit-element-redux)
[![npm downloads](https://img.shields.io/npm/dm/lit-element-redux?style=flat-square)](https://www.npmjs.com/package/lit-element-redux)
[![npm license](https://img.shields.io/npm/l/lit-element-redux?style=flat-square)](https://www.npmjs.com/package/lit-element-redux)


# Overview
Create the store using the connector's function ``createStore`` in order to make Redux ``store`` available for all the connected components:

```js
import { createStore } from 'lit-element-redux';

createStore(reducer, initialState, enhancers);
```


Connect your component to Redux ``store`` providing a way to access and modify it:

```js
import { LitElement, html } from 'lit-element';
import { connect } from 'lit-element-redux';

export class MyComponent extends LitElement { ... }

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyComponent);
customElements.define('my-connected-component', ConnectedComponent);

```

# Installation
Download the package using npm:
```bash
$ npm install lit-element-redux
```

# Usage

## createStore
This function wraps the Redux ``createStore`` and provides access to the Redux ``store`` for all the connected components.

## connect
``Connect`` accepts two parameters and return a function:

#### mapStateToProps: (store) => Object
It is a function that receive the store and determine which part of it will be injected to the connected component.

```js
const mapStateToProps = store => ({
  counter: store.counter,
  todos: store.todos
});
```

#### mapDispatchToProps: Object | (dispatch) => Object
It is an object or a function that will determine which actions can be dispatched by your connected component. Those dispatch of the actions will be wrapped and injected in your connected component.

```js
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' })
  }
}
```

```js
import { increment, decrement } from './actionCreators'

const mapDispatchToProps = {
  increment,
  decrement
}
```

#### Return 
The ``connect`` function return another function that receive your component as the only parameter and return a wrapped component with the additional properties and functions that you have defined with ``mapStateToProps`` and ``mapDispatchToProps``.

# Related projects
[lit-element-boilerplate](https://github.com/albertopumar/lit-element-boilerplate): Boilerplate to implement a lit-element application using this redux connector.

# License
[MIT](LICENSE.md)