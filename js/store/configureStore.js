import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../reducers'
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

export default function configureStore() {
  const logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
    stateTransformer: state => JSON.stringify(state)
  })

  const enhancer = compose(
    applyMiddleware(thunk, logger)
  )

  const store = createStore(reducer, enhancer, autoRehydrate())

  return new Promise(function(resolve, reject) {
    persistStore(store, {blacklist: ['drawer'], storage: AsyncStorage}, () => {
      console.log('rehydration complete')
      resolve(store)
    })
  })

  if (isDebuggingInChrome) {
    window.store = store;
  }
}
