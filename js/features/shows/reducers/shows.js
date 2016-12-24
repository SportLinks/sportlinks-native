import {getShows} from '../services/showsService'

export const FETCH_SHOWS_REQUEST = 'FETCH_SHOWS_REQUEST'
export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS'
export const SHOW_SELECTED = 'SHOW_SELECTED'

export const requestShowsAction = (sourceId) =>
  ({
    type: FETCH_SHOWS_REQUEST,
    state: {
      loading: true,
      sourceId: sourceId,
      list: [],
      receivedAt: undefined
    }
  })

export const receiveShowsAction = ({sourceId, shows, receivedAt} = {}) =>
  ({
    type: FETCH_SHOWS_SUCCESS,
    state: {
      loading: false,
      sourceId: sourceId,
      list: shows,
      receivedAt: receivedAt
    }
  })

export const fetchShowsAction = (sourceId) =>
  dispatch => {
    dispatch(requestShowsAction(sourceId))
    return getShows(sourceId)
    .then(response => {
      dispatch(receiveShowsAction({
        sourceId: sourceId,
        shows: response.data.shows,
        receivedAt: response.data.date
      }))}
    ).catch((err) => console.log(err))
  }

export const showSelectedAction = (show) =>
  ({
    type: SHOW_SELECTED,
    state: {
      seletetedShow: show
    }
  })

const initialState = {
  loading: false,
  sourceId: '1',
  list: [],
  receivedAt: undefined
}

export default function shows(state = initialState, action) {
  switch (action.type) {
    case FETCH_SHOWS_REQUEST:
    case FETCH_SHOWS_SUCCESS:
    case SHOW_SELECTED:
      return {
        ...state,
        ...action.state
      }
    default:
      return state
  }
}
