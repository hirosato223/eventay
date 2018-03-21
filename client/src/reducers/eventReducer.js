// reducer for all things related to event data.
// TODO
import initialState from './initialState';
import { FETCH_EVENT, RECEIVE_EVENT } from '../actions/actionTypes.js';

export default function event(state = initialState.event, action) {
  let newState;

  if (action.type === FETCH_EVENT) {
    console.log(`FETCH_EVENT action`);
    return action;
  } else if (action.type === RECEIVE_EVENT) {
    console.log(`RECEIVE_EVENT action`);
    newState = action.event;
    return newState;
  }
  
  console.log('eventReducer default...');
  return state;
}