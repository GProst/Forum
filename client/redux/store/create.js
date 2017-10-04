import {createStore as _createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {routerMiddleware, routerReducer} from 'react-router-redux'

import history from '../../history'

export function createStore() {
  const middleware = [routerMiddleware(history)]

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(require('redux-logger').createLogger())
  }

  const toCompose = [applyMiddleware(...middleware)]

  let enchancer = compose(...toCompose)

  const store = _createStore(combineReducers({
    router: routerReducer
  }), {}, enchancer)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(combineReducers({
        router: routerReducer
      }))
    })
  }

  return store
}
