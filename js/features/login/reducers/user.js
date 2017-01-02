import {getUser, logout} from '../services/authService'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const receiveLoginAction = ({id=undefined, name='', email='', photo=''} = {}) =>
  ({
    type: LOGIN,
    state: {
      id: id,
      name: name,
      email: email,
      avatar: photo,
      isLogin: true,
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
      isLogin: false
    }
  })

export const userLogOutAction = () =>
  dispatch => {
    logout().then(() => {
        dispatch(receiveLogoutAction())
    })
  }

export default function user(state = {isLogin: false}, action) {
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
