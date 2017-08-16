import {call, put, select} from 'redux-saga/effects'
import {Location, Permissions} from 'expo'
import _ from 'lodash'

import LocationActions from '../Redux/LocationRedux'
import AppConfig from "../Config/AppConfig";

export function* getLocationList(api) {
    const meta = yield select((state) => state.location.meta)

    const {status} = yield call(Permissions.getAsync, Permissions.LOCATION)

    let response = null

    switch (status) {
        case 'granted':

            const {coords} = yield call(Location.getCurrentPositionAsync, {enableHighAccuracy: true})
            const {latitude, longitude} = coords

            AppConfig.currentCoord && _.merge(coords, AppConfig.currentCoord)

            if (meta === null) {
                response = yield call(api.getLocationList, latitude, longitude, 1, AppConfig.defaultLimit)
            }
            else if (meta.currentPage <= meta.totalPages) {
                response = yield call(api.getLocationList, latitude, longitude, meta.currentPage + 1, AppConfig.defaultLimit)
            }

            break
        case 'undetermined':
            yield call(Permissions.askAsync, Permissions.LOCATION)
            yield put(LocationActions.getLocationList())
            break
    }

    if (response) {
        if (response.ok === true) {
            yield put(LocationActions.getLocationListSuccess(response))
        } else {
            yield put(LocationActions.getLocationListFailure(response))
        }
    }
}