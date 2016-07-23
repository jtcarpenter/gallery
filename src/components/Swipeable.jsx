const React = require('react');

const FLICK_THRESHOLD = 0.6;
const MIN_DELTA = 10;
const defaultState = {
    x: null,
    swiping: false,
    start: 0
};

export class Swipeable extends React.Component {

    constructor(props) {
        super();
        this.state = defaultState;
        this.setState = this.setState.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    calculatePos(evt) {
        const x = evt.changedTouches[0].clientX
        const deltaX = this.state.x - x
        const absDeltaX = Math.abs(deltaX)
        const time = Date.now() - this.state.start
        const velocity = Math.sqrt(absDeltaX * absDeltaX) / time

        return {
            deltaX: deltaX,
            absX: absDeltaX,
            velocity: velocity
        }
    }

    touchStart(evt) {
        if (evt.touches.length > 1) {
            return
        }

        this.setState({
            start: Date.now(),
            x: evt.touches[0].clientX,
            swiping: false
        });
    }

    touchMove(evt) {
        let cancelPageSwipe = false;
        const pos = this.calculatePos(evt);

        if (!this.state.x || evt.touches.length > 1) {
            return
        }

        if (pos.absX < this.props.delta) {
            return
        }

        if (this.props.onSwiping) {
            this.props.onSwiping(
                evt,
                {
                    deltaX: pos.deltaX,
                    absX: pos.absX,
                    velocity: pos.velocity
                }
            );
        }

        if (pos.deltaX > 0) {
            if (this.props.onSwipingLeft) {
                this.props.onSwipingLeft(evt, {absX: pos.absX})
                cancelPageSwipe = true
            }
        } else {
            if (this.props.onSwipingRight) {
                this.props.onSwipingRight(evt, {absX: pos.absX})
                cancelPageSwipe = true
            }
        }

        this.setState({swiping: true})

        if (cancelPageSwipe && this.props.preventDefaultTouchmoveEvent) {
            evt.preventDefault()
        }
    }

    touchEnd(evt) {
        if (this.state.swiping) {
            const pos = this.calculatePos(evt)
            const isFlick = pos.velocity > this.props.flickThreshold

            if (pos.deltaX > 0) {
                this.props.onSwipedLeft &&
                this.props.onSwipedLeft(
                    evt,
                    {deltaX: pos.deltaX, isFlick: isFlick}
                );
            } else {
                this.props.onSwipedRight &&
                this.props.onSwipedRight(
                    evt,
                    {deltaX: pos.deltaX, isFlick: isFlick}
                );
            }
        }

        this.setState(defaultState)
    }

    render() {
        return <div {...this.props}
            onTouchStart={this.touchStart}
            onTouchMove={this.touchMove}
            onTouchEnd={this.touchEnd} >
            {this.props.children}
          </div>
    }
};

Swipeable.defaultProps = {
    flickThreshold: FLICK_THRESHOLD,
    delta: MIN_DELTA,
    preventDefaultTouchmoveEvent: true
};

export default Swipeable;
