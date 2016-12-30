import baseService from '../../../services/baseService'

let cancel

export function getShows() {
  let service = baseService('https://sportlinks.herokuapp.com/shows2', cancel)
  cancel = service.cancel
  return service.result
}
