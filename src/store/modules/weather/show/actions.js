import SubmissionError from '../../../../error/SubmissionError'
import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const retrieve = ({ commit }, id) => {
  commit(types.WEATHER_SHOW_TOGGLE_LOADING)
  return fetch(id)
    .then(response => response.json())
    .then((data) => {
      commit(types.WEATHER_SHOW_TOGGLE_LOADING)
      commit(types.WEATHER_SHOW_SET_RETRIEVED, data)
    })
    .catch((e) => {
      commit(types.WEATHER_SHOW_TOGGLE_LOADING)
      commit(types.WEATHER_SHOW_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.WEATHER_SHOW_RESET)
}

export const getStats = ({ commit }) => {
  commit(types.WEATHER_SHOW_SET_ERROR, '')
  commit(types.WEATHER_SHOW_TOGGLE_LOADING)

  return fetch('weathers/get-stats', {
    method: 'GET',
    body: JSON.stringify()
  })
    .then(response => response.json())
    .then((data) => {
      commit(types.WEATHER_SHOW_TOGGLE_LOADING)
      commit(types.WEATHER_SHOW_SET_GET_STATS, data)
    })
    .catch((e) => {
      commit(types.WEATHER_SHOW_TOGGLE_LOADING)
      if (e instanceof SubmissionError) {
        commit(types.WEATHER_SHOW_SET_VIOLATIONS, e.errors)
        // eslint-disable-next-line
        commit(types.WEATHER_SHOW_SET_ERROR, e.errors._error)
        return
      }

      // eslint-disable-next-line
      commit(commit(types.WEATHER_SHOW_SET_ERROR, e._error ? e._error.error : 'Undefined error'))
    })
}
