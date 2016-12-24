import baseService from '../../../services/baseService'

const sources = [
  {
    id: '0',
    url: 'https://sportlinks.herokuapp.com/shows',
    name: 'All'
  },
  {
    id: '1',
    url: 'https://sportlinks.herokuapp.com/shows?type=p2p',
    name: 'P2P'
  }
]

let cancel

export function getShows(sourceId) {
  let service = baseService(sources[sourceId].url, cancel)
  cancel = service.cancel
  return service.result
}

export function getNameSource(sourceId) {
  return sources[sourceId].name
}

export function getSourceList() {
  return sources
}
