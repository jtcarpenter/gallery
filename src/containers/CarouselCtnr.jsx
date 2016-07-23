import React, {PropTypes, Component} from 'react';
import {Provider, connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';
import Carousel from '../components/Carousel.jsx';
import Spinner from '../components/Spinner.jsx';
import {init, select} from '../actions/carouselActions';
import {fetchData} from '../actions/paintingsActions';
import Swipeable from '../components/Swipeable.jsx';

export class CarouselCtnr extends React.Component {
    constructor(props) {
        super();
        this.load = this.load.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.props = props;
        this.load();

        hashHistory.listen(location =>
            props.dispatch(select(location.pathname.replace('/', ''))));
    }

    render() {
        const {carousel, paintings} = this.props;
        return <div className="carousel-ctnr" onTouchMove={this.touchMove}>
            <Carousel
                carousel={carousel}
                onPrev={this.handlePrev}
                onNext={this.handleNext}>
            </Carousel>
            <Spinner loading={paintings.loading}></Spinner>
        </div>
    }

    touchMove(evt) {
        evt.preventDefault();
    }

    load() {
        const id = this.props.params.id;
        this.props.dispatch(fetchData()).then((res) => {
            this.props.dispatch(init(res.data, id));
        });
    }

    handlePrev() {
        hashHistory.push('/' + this.props.carousel.prev);
    }

    handleNext() {
        hashHistory.push('/' + this.props.carousel.next);
    }
}

export default connect((state) =>({
    carousel: state.carousel,
    paintings: state.paintings
}))(CarouselCtnr);
