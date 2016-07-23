import React from 'react';
import {Provider, connect} from 'react-redux';
import {select} from '../actions/carouselActions';
import {Link} from 'react-router';

export class CarouselItem extends React.Component {

    render() {
        const {item, index, selected, next} = this.props;
        let classNames = ['carousel-item'];
        let innerClassNames = ['carousel-item__inner'];
        let imgClasses = ['carousel-item__img'];
        let headingClasses = ['carousel-item__h2'];
        if (String(item.id) == String(selected)) {
            classNames.push('carousel-item--selected');
            classNames.push(item.orientation === 'portrait' ?
                'carousel-item--portrait' : 'carousel-item--landscape');
            innerClassNames.push('carousel-item__inner--selected');
            imgClasses.push('carousel-item__img--selected');
            headingClasses.push('carousel-item__h2--selected');
        }

        const toId = String(item.id) === String(selected) ?
            next : item.id;

        return <Link to={'/' + toId} className="carousel-item__link">
            <div className={classNames.join(' ')}>
                <div className={innerClassNames.join(' ')}>
                    <img className={imgClasses.join(' ')} src={item.large.src}/>
                    <h2 className={headingClasses.join(' ')}>
                        {item.title} {item.year}<br/>
                        {item.media}<br/>
                        {item.size}
                    </h2>
                </div>
            </div>
        </Link>
    }
}

export default CarouselItem;
