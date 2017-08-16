import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    getLocationList: null,
    resetLocationList: null,
    getLocationListSuccess: ['response'],
    getLocationListFailure: ['response'],
    selectLocation: ['location']
})

export const LocationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    error: null,
    list: [],
    meta: null,
    selected: null,
})

/* ------------- Reducers ------------- */

export const getLocationList = (state) => state.merge({fetching: true})

export const resetLocationList = (state) => state.merge({list: [], meta: null})

export const getLocationListSuccess = (state, {response}) => {
    const {data, pageMetaData} = response.data
    return state.merge({fetching: false, error: null, list: state.list.concat(data), meta: pageMetaData})
}

export const getLocationListFailure = (state, {response}) => state.merge({fetching: false, error: response})

export const selectLocation = (state, {location}) => state.merge({selected: location})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_LOCATION_LIST]: getLocationList,
    [Types.RESET_LOCATION_LIST]: resetLocationList,
    [Types.GET_LOCATION_LIST_SUCCESS]: getLocationListSuccess,
    [Types.GET_LOCATION_LIST_FAILURE]: getLocationListFailure,
    [Types.SELECT_LOCATION]: selectLocation
})
