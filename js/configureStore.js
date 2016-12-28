import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import {fetchShowsAction} from './features/shows/reducers/shows'

export default function configureStore(onCompletion:()=>void):any {
  const logger = createLogger({
    collapsed: true,
    stateTransformer: state => state
  })

  const enhancer = compose(
      applyMiddleware(thunk, logger)
    )

  const store = createStore(reducer, enhancer)

  store.dispatch(fetchShowsAction('1'))

  return store
}
