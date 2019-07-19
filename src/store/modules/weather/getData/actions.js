import SubmissionError from '../../../../error/SubmissionError'
import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const reset = ({ commit }) => {
  commit(types.WEATHER_GET_DATA_RESET)
}

export const getData = ({ commit }, getData) => {
  commit(types.WEATHER_GET_DATA_SET_ERROR, '')
  commit(types.WEATHER_GET_DATA_TOGGLE_LOADING)

  let endpoint = 'weathers/get-data'
  if (getData.save) {
    endpoint = 'weathers/get-data-and-save'
  } 
  return fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({lat: String(getData.point.lat), lng: String(getData.point.lng)})
  })
    .then(response => response.json())
    .then((data) => {
      commit(types.WEATHER_GET_DATA_TOGGLE_LOADING)
      commit(types.WEATHER_GET_DATA_SET_GET_DATA, data)
    })
    .catch((e) => {
      commit(types.WEATHER_GET_DATA_TOGGLE_LOADING)
      if (e instanceof SubmissionError) {
        commit(types.WEATHER_GET_DATA_SET_VIOLATIONS, e.errors)
        // eslint-disable-next-line
        commit(types.WEATHER_GET_DATA_SET_ERROR, e.errors._error)
        return
      }

      // eslint-disable-next-line
      commit(commit(types.WEATHER_GET_DATA_SET_ERROR, e._error ? e._error.error : 'Undefined error'))
    })
}
