import * as actionTypes from '../constants/actionTypes';

const initialState = {
    loading: false,
    data: []
};

export default function PaintingsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_BEGIN:
            return Object.assign({}, state, {
                loading: true,
                maxLength: action.maxLength,
            });
        case actionTypes.FETCH_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.data
            });
        case actionTypes.FETCH_FAIL:
            return Object.assign({}, state, {
                loading: false,
                data: action.items
            });
        default:
            return state;
    }
};
