import {takeLatest} from 'redux-saga/effects'
import API from '../Services/Api'
import {StartupTypes} from '../Redux/StartupRedux'
import {startup} from './StartupSagas'
import {LocationTypes} from "../Redux/LocationRedux";
import {getLocationList, verifyLocation, verifyLocationSuccess} from "./LocationSaga";


const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
    yield [
        // some sagas only receive an action
        takeLatest(StartupTypes.STARTUP, startup),
        takeLatest(LocationTypes.GET_LOCATION_LIST, getLocationList, api),
        takeLatest(LocationTypes.VERIFY_LOCATION, verifyLocation, api),
        takeLatest(LocationTypes.VERIFY_LOCATION_SUCCESS, verifyLocationSuccess, api)
    ]
}
