import {applyMiddleware, createStore} from 'redux'

import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducers from '../Reducers/index'

const middlewares = applyMiddleware(promise, thunk, createLogger());

export default createStore(reducers, middlewares);





