
const OPEN_DRAWER = 'OPEN_DRAWER'
const CLOSE_DRAWER = 'CLOSE_DRAWER'

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
export type State = {
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

  return state
}
