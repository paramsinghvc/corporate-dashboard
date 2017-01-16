import { applyMiddleware, Store, combineReducers, compose, createStore } from 'redux';
import { environment } from '../../environments/environment';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const applyReduxDevTools = !environment.production && (<any>window).devToolsExtension;
const composeArgs = [
	applyMiddleware(thunk)
];

applyReduxDevTools ? composeArgs.push((<any>window).devToolsExtension()) : function noop() { };

const enhancer = compose.apply(compose, composeArgs);

export const store: Store<any> = createStore(rootReducer, {}, enhancer); 
