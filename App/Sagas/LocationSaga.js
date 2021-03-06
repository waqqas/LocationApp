import {call, put, select} from 'redux-saga/effects'
import {Alert} from 'react-native'
import {Location, Permissions} from 'expo'
import _ from 'lodash'

import LocationActions from '../Redux/LocationRedux'
import AppConfig from "../Config/AppConfig";

export function* getLocationList(api) {
    const {status} = yield call(Permissions.getAsync, Permissions.LOCATION)

    console.log('status:', status)

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
        case 'denied':
            Alert.alert(
                'Location Permission Denied',
                'Please turn on the GPS and refresh',
                [
                    {text: 'OK'}
                ],
                {cancelable: false}
            )
    }

    if (response !== null && response.ok === true) {
        yield put(LocationActions.getLocationListSuccess(response))
    } else {
        yield put(LocationActions.getLocationListFailure(response))
    }
}

export function* verifyLocation(api, {location}) {
    const {status} = yield call(Permissions.getAsync, Permissions.LOCATION)

    console.log('status:', status)

    let response = null

    switch (status) {
        case 'granted':
            const {coords} = yield call(Location.getCurrentPositionAsync, {enableHighAccuracy: true})
            AppConfig.currentCoord && _.merge(coords, AppConfig.currentCoord)

            const {latitude, longitude} = coords

            response = yield call(api.verifyLocation, location.id, latitude, longitude)

            break
        case 'undetermined':
            yield call(Permissions.askAsync, Permissions.LOCATION)
            yield put(LocationActions.getLocationList())
            break
        case 'denied':
            Alert.alert(
                'Location Permission Denied',
                'Please turn on the GPS and refresh',
                [
                    {text: 'OK'}
                ],
                {cancelable: false}
            )

    }

    if (response !== null && response.ok === true) {
        yield put(LocationActions.verifyLocationSuccess(response))
    } else {
        yield put(LocationActions.verifyLocationFailure(response))
    }
}

export function* verifyLocationSuccess(api, {response}) {
    Alert.alert(
        'In Radius',
        response.data.inRadius.toString(),
        [
            {text: 'OK'},
        ],
        {cancelable: false}
    )

}