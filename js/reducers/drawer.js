
const OPEN_DRAWER = 'OPEN_DRAWER'
const CLOSE_DRAWER = 'CLOSE_DRAWER'
const DISABLE_DRAWER = 'DISABLE_DRAWER'
const ENABLE_DRAWER = 'ENABLE_DRAWER'

export function openDrawer() {
  return {
    type: OPEN_DRAWER,
  }
}

export function closeDrawer() {
  return {
    type: CLOSE_DRAWER,
  }
}

export function disableDrawer() {
  return {
    type: DISABLE_DRAWER,
  }
}

export function enableDrawer() {
  return {
    type: ENABLE_DRAWER,
  }
}

type State = {
    drawerState: string,
    drawerDisabled: boolean
}

const initialState = {
  drawerState: 'closed',
  drawerDisabled: false,
}

export default function (state:State = initialState, action): State {
  if (action.type === OPEN_DRAWER) {
    return {
      ...state,
      drawerState: 'opened',
    }
  }

  if (action.type === CLOSE_DRAWER) {
    return {
      ...state,
      drawerState: 'closed',
    }
  }

  if (action.type === DISABLE_DRAWER) {
    return {
      ...state,
      drawerDisabled: true,
    }
  }

  if (action.type === ENABLE_DRAWER) {
    return {
      ...state,
      drawerDisabled: false,
    }
  }

  return state
}
