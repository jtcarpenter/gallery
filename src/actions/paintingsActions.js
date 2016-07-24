import * as actionTypes from '../constants/actionTypes';
import * as paintingConfig from '../constants/paintingConfig';

export function request(maxLength) {
    return {
        type: actionTypes.FETCH_BEGIN,
        maxLength: maxLength
    }
}

export function response(json, carouselLength) {
    return {
        type: actionTypes.FETCH_SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
}

export function fail(err) {
    return {
        type: actionTypes.FETCH_FAIL,
        error: err
    }
}

export function fetchData(maxLength) {
    return dispatch => {
        dispatch(request(maxLength));
        return fetch(paintingConfig.URI)
            .then(response => response.json())
            .then(json => dispatch(response(json)))
            .catch((err) => {
                console.error(err);
                dispatch(fail(err))
            })

    }
}