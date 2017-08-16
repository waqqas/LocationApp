import {call, put, select} from 'redux-saga/effects'
import {Location, Permissions} from 'expo'
import _ from 'lodash'

import LocationActions from '../Redux/LocationRedux'
import AppConfig from "../Config/AppConfig";

export function* getLocationList(api) {
    const {status} = yield call(Permissions.getAsync, Permissions.LOCATION)

    let response = null

    switch (status) {
        case 'granted':
            const meta = yield select((state) => state.location.meta)

            const {coords} = yield call(Location.getCurrentPositionAsync, {enableHighAccuracy: true})
            AppConfig.currentCoord && _.merge(coords, AppConfig.currentCoord)

            const {latitude, longitude} = coords

            if (meta === null) {
                response = yield call(api.getLocationList, latitude, longitude, 1, AppConfig.defaultLimit, AppConfig.defaultRadius)
            }
            else if (meta.currentPage <= meta.totalPages) {
                response = yield call(api.getLocationList, latitude, longitude, meta.currentPage + 1, AppConfig.defaultLimit, AppConfig.defaultRadius)
            }

            break
        case 'undetermined':
            yield call(Permissions.askAsync, Permissions.LOCATION)
            yield put(LocationActions.getLocationList())
            break
    }

    if (response !== null && response.ok === true) {
        yield put(LocationActions.getLocationListSuccess(response))
    } else {
        yield put(LocationActions.getLocationListFailure(response))
    }
}