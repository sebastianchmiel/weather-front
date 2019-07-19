import * as types from './mutation_types'

export default {
  [types.WEATHER_GET_DATA_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      getData: null,
    })
  },

  [types.WEATHER_GET_DATA_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.WEATHER_GET_DATA_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  },

  [types.WEATHER_GET_DATA_SET_GET_DATA] (state, getData) {
    Object.assign(state, { getData })
  },
}
