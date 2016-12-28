//import {combineReducers} from 'redux-immutable'
import {combineReducers} from 'redux'
import shows from '../features/shows/reducers/shows'
import user from '../features/login/reducers/user'
import drawer from './drawer'
import cardNavigation from './navigation'

export default combineReducers({
  shows,
  user,
  drawer,
  cardNavigation,
})
