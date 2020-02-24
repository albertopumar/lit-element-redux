import actions from './actions.js';

const { decrement } = actions;

const increment = () => dispatch => {
  dispatch(actions.increment());
}

export default { increment, decrement };
