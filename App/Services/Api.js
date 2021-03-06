// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'

const create = (baseURL = AppConfig.baseApiUrl) => {
    const api = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache'
        },
        timeout: 10000
    })

    const getLocationList = (latitude, longitude, page, limit, radius) => api.get('/location_service', {
        search: 1,
        latitude,
        longitude,
        page,
        limit,
        radius
    })

    const verifyLocation = (id, latitude, longitude) => api.get('/location_service', {
        verify: 1,
        id,
        latitude,
        longitude
    })

    return {
        getLocationList,
        verifyLocation
    }
}

// let's return back our create method as the default.
export default {
    create
}
