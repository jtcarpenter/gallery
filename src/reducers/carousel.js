import * as actionTypes from '../constants/actionTypes';
import {Router, Route, browserHistory, hashHistory, Link} from 'react-router';

const initialState = {
    maxLength: 10,
    carouselLength: null,
    offset: 1,
    selected: null,
    prev: null,
    next: null,
    items: []
};

function getItems(data, carouselLength, selectedIndex, offset = 0) {

    // index of datum which will be first in items
    const first = selectedIndex - offset;

    // index of datum to be first item if wrapping
    const wrappedFirst = data.length - offset + selectedIndex;

    // index of last datum
    const last = carouselLength === data.length ?
        first : carouselLength - (data.length - first);

    return data.filter((datum, index) => {

        // only used for offset greater than 1,
        // return last items of data when selecting at beginning
        // and wrapping to end
        return index >= wrappedFirst && selectedIndex < offset;
    }).concat(data.filter((datum, index) => {

        // items from selection (- offset)
        return index >= first && index < (first + carouselLength);
    })).concat(data.filter((datum, index) => {

        // items from start of data when wrapping to beginning
        return index < last;
    })).map((datum, index) => {

        // item object
        return {
            id: datum.id,
            title: datum.title,
            orientation: datum.orientation,
            media: datum.media,
            year: datum.year,
            size: datum.size,
            large: datum.large,
            thumb: datum.thumb
        }
    });
}

function getIndex(data, id, defaultId) {
    let index = typeof defaultId !== 'undefined' ? defaultId : null;
    if (!data) {
        return index;
    }
    data.forEach((item, _index) => {
        if (id && String(item.id) === String(id)) {
            index = _index;
            return;
        }
    });

    return index;
}

function getPrevId(data, id) {
    const index = getIndex(data, id, 0);
    if (index === 0) {
        return data[data.length - 1].id;
    }

    return data[index - 1].id;
}

function getNextId(data, id) {
    const index = getIndex(data, id, 0);
    if (index >= data.length - 1) {
        return data[0].id
    }

    return data[index + 1].id;
}

export default function CarouselReducer(state = initialState, action) {

    let items;

    switch (action.type) {
        case actionTypes.SELECT:
            if (!state.data) {
                return state;
            }
            const currentSelectedIndex = getIndex(
                state.data,
                state.selected,
                0);
            const selectedIndex = getIndex(state.data,  action.id);
            items = getItems(
                state.data,
                state.carouselLength,
                selectedIndex,
                state.offset);
            return Object.assign({}, state, {
                selected: action.id,
                prev: getPrevId(state.data, action.id),
                next: getNextId(state.data, action.id),
                items: items
            });
        case actionTypes.INIT:
            const carouselLength = (state.maxLength &&
                state.maxLength < action.data.length) ?
                    state.maxLength : action.data.length;
            const index = getIndex(action.data, action.id, 0);
            const selectedId = action.id ?
                action.id : action.data.length > 0 ?
                    action.data[0].id : null;
            items = getItems(
                action.data,
                carouselLength,
                index,
                state.offset);
            return Object.assign({}, state, {
                data: action.data,
                carouselLength: carouselLength,
                selected: selectedId,
                prev: getPrevId(action.data, action.id),
                next: getNextId(action.data, action.id),
                items: items
            });
        default:
            return state;
    }
};
