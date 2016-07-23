import React from 'react';
import {
    renderIntoDocument
} from 'react-addons-test-utils';
import {CarouselItem} from '../src/components/CarouselItem.jsx';

describe('CarouselItem', () => {
    const item = {id: 1, large: {}, thumb: {}};
    const index = 0;
    const selected = 1;
    const next = 2;

    it('renders', () => {
        var carouselItem = renderIntoDocument(
            <CarouselItem
                key={item.id}
                item={item}
                selected={selected}
                next={next}
                index={index}>
            </CarouselItem>);
        expect(carouselItem).to.exist;
    });
});