import React from 'react';
import ReactDOM from 'react-dom';
import CarouselItem from '../components/CarouselItem.jsx';
import * as keyCodes from '../constants/keyCodes';
import {Provider, connect} from 'react-redux';
import {prev, next} from '../actions/carouselActions';
import {Link} from 'react-router';
import Swipeable from '../components/Swipeable.jsx';

const SWIPE_TOLERANCE = 400;
const defaultState = {
    styles: {
        marginLeft: 0
    }
};

export class Carousel extends React.Component {

    constructor(props) {
        super();
        this.state = defaultState;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleRightSwipe = this.handleRightSwipe.bind(this);
        this.handleLeftSwipe = this.handleLeftSwipe.bind(this);
        this.handleRightSwiping = this.handleRightSwiping.bind(this);
        this.handleLeftSwiping = this.handleLeftSwiping.bind(this);
    }

    componentDidUpdate(){
        ReactDOM.findDOMNode(this.refs.carousel).focus();
    }

    render() {
        const {carousel} = this.props;
        const {carouselLength} = carousel;
        const classNames = [
            'carousel',
            `carousel--length-${carouselLength}`
        ];

        return <Swipeable
                className="swipe-container"
                onSwipingRight={this.handleRightSwiping}
                onSwipingLeft={this.handleLeftSwiping}
                onSwipedRight={this.handleRightSwipe}
                onSwipedLeft={this.handleLeftSwipe}>
                <div
                style={this.state.styles}
                ref="carousel"
                className={classNames.join(' ')}
                tabIndex="0"
                onKeyDown={this.handleKeyDown}>
                {carousel.items.map((item, index) => {
                    return <CarouselItem
                        key={item.id}
                        item={item}
                        selected={carousel.selected}
                        next={carousel.next}
                        index={index}>
                    </CarouselItem>
                })}
                <Link to={'/' + carousel.prev}
                    className='btn btn--nav btn--prev'
                    title="prevous">
                </Link>
                <Link to={'/' + carousel.next}
                    className='btn btn--nav btn--next'
                    title="next">
                </Link>
            </div>
        </Swipeable>
    }

    handlePrev() {
        if (typeof this.props.onPrev === 'function') {
            this.props.onPrev();
        }
    }

    handleNext() {
        if (typeof this.props.onNext === 'function') {
            this.props.onNext();
        }
    }

    handleKeyDown(event) {
        switch(event.keyCode) {
            case keyCodes.LEFT:
                event.preventDefault();
                this.handlePrev();
                break;
            case keyCodes.RIGHT:
                event.preventDefault();
                this.handleNext();
                break;
            default:
                break;
        }
    }

    handleLeftSwipe(evt, args) {
        this.setState(defaultState);
        if (Math.abs(args.deltaX) > SWIPE_TOLERANCE || args.isFlick) {
            this.handleNext();
        }
    }

    handleRightSwipe(evt, args) {
        this.setState(defaultState);
        if (Math.abs(args.deltaX) > SWIPE_TOLERANCE || args.isFlick) {
            this.handlePrev();
        }
    }

    handleLeftSwiping(evt, args = {}) {
        if (typeof args.absX !== 'number') {
            return false;
        }
        this.setState({styles: {marginLeft: '-' + args.absX + 'px'}});
    }

    handleRightSwiping(evt, args = {}) {
        if (typeof args.absX !== 'number') {
            return false;
        }
        this.setState({styles: {marginLeft: args.absX + 'px'}});
    }
}

export default Carousel;
