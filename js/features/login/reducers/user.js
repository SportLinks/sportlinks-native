import {getUser, logout} from '../services/authService'
import {closeDrawer} from '../../../reducers/drawer'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const receiveLoginAction = ({id=undefined, name='', email='', photo=''} = {}) =>
  ({
    type: LOGIN,
    state: {
      id: id,
      name: name,
      email: email,
      avatar: photo
    }
  })

export const userAuthAction = () =>
  dispatch => {
    getUser().then((user) => {
      if (user) {
        dispatch(receiveLoginAction(user))
      }
    })
  }

const receiveLogoutAction = () =>
  ({
    type: LOGOUT,
    state: {
      id:  undefined,
      name: undefined,
      email: undefined,
      avatar: undefined
    }
  })

export const userLogOutAction = () =>
  dispatch => {
    logout().then(() => {
        dispatch(receiveLogoutAction())
    })
  }

export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return {
        ...state,
        ...action.state
      }
    default:
      return state
  }
}