import React from 'react';
import {
    renderIntoDocument
} from 'react-addons-test-utils';
import {Swipeable} from '../src/components/Swipeable.jsx';
import {CarouselItem} from '../src/components/CarouselItem.jsx';

describe('Swipeable', () => {
    const handleRightSwiping = () => undefined;
    const handleLeftSwiping = () => undefined;
    const handleRightSwipe = () => undefined;
    const handleLeftSwipe = () => undefined;

    it('renders', () => {
        var swipeable = renderIntoDocument(
            <Swipeable
                onSwipingRight={handleRightSwiping}
                onSwipingLeft={handleLeftSwiping}
                onSwipedRight={handleRightSwipe}
                onSwipedLeft={handleLeftSwipe}>
                <div></div>
            </Swipeable>);
        expect(swipeable).to.exist;
    });
});