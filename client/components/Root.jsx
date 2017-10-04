import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import store from '../redux/store'
import history from '../history'
import {Routes} from '../routes'

import Messages from './pages/Messages'
import Message from './pages/Message'

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history} store={store}>
          <Switch>
            <Route exact path={Routes.messagesList} component={Messages} />
            <Route exact path={Routes.editMessage} component={Message} />
            <Route exact path={Routes.createMessage} component={Message} />
            <Redirect to={Routes.messagesList} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}
