import * as actionTypes from '../constants/actionTypes';

export function select(id) {
    return {
        type: actionTypes.SELECT,
        id: id
    };
}

export function init(data, id) {
    return {
        type: actionTypes.INIT,
        data: data,
        id: id
    }
}