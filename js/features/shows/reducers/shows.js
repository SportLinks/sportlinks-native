import {getShows} from '../services/showsService'

const FETCH_SHOWS_REQUEST = 'FETCH_SHOWS_REQUEST'
const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS'
const SHOW_SELECTED = 'SHOW_SELECTED'
const APPLY_SPORTS_FILTER = 'APPLY_SPORTS_FILTER'

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
      receivedAt: receivedAt,
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

export const applySportsFilter = (filter) =>
  ({
    type: APPLY_SPORTS_FILTER,
    state: {
      filter: filter
    }
  })

const initialState = {
  loading: false,
  sourceId: '1',
  list: [],
  receivedAt: undefined,
  filter: {}
}

export default function shows(state = initialState, action) {
  switch (action.type) {
    case FETCH_SHOWS_REQUEST:
    case FETCH_SHOWS_SUCCESS:
    case SHOW_SELECTED:
    case APPLY_SPORTS_FILTER:
      return {
        ...state,
        ...action.state
      }
    default:
      return state
  }
}
