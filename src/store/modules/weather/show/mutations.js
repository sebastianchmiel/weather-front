import * as types from './mutation_types'

export default {
  [types.WEATHER_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null,
      getStats: null,
    })
  },

  [types.WEATHER_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.WEATHER_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.WEATHER_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  },

  [types.WEATHER_SHOW_SET_GET_STATS] (state, getStats) {
    Object.assign(state, {getStats})
  }
}
