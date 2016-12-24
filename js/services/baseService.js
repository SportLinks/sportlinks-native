import axios from 'axios'

const CancelToken = axios.CancelToken

export default function(url, source) {
  if (source !== undefined) {
    source.cancel('currently operation canceled by the user.')
  }
  source = CancelToken.source()
  var _axios = axios.get(url, { cancelToken: source.token})
    .catch(function(error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      } else {
        console.log('Error: ' + error)
      }
    })
  return {
    result: _axios,
    cancel: source
  }
}
