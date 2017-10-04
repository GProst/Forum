import {createStore as _createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {routerMiddleware, routerReducer} from 'react-router-redux'

import history from '../../history'

export function createStore() {
  const middleware = [routerMiddleware(history)]
  const toCompose = [applyMiddleware(...middleware)]

  if (process.env.NODE_ENV !== 'production') {
    // TODO: redux logger
  }

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
