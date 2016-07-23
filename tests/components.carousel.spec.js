import React from 'react';
import {
    renderIntoDocument
} from 'react-addons-test-utils';
import {Carousel} from '../src/components/Carousel.jsx';

describe('Carousel', () => {
    const carouselData = {
        carouselLength: 0,
        items: []
    };
    const handlePrev = () => undefined;
    const handleNext = () => undefined;

    it('renders', () => {
        let carousel = renderIntoDocument(
            <Carousel
                carousel={carouselData}
                onPrev={handlePrev}
                onNext={handleNext}>
            </Carousel>);
        expect(carousel).to.exist;
    });
});
