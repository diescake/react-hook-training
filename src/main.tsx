import Hook from '@/app/components/Hook'
import Todo from '@/app/components/Todo'
import { configureStore } from '@/app/store'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'

import '@/assets/css/reboot.css'

import '@/assets/css/common.scss'

if (process.env.NODE_ENV !== 'production') {
  console.info('Build with development mode')
}

const history = createBrowserHistory()
const store = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Todo} />
        <Route exact path="/hook" component={Hook} />
        <Redirect to="/" />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
