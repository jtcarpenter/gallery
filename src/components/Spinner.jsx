import React from 'react';
import {Provider, connect} from 'react-redux';

export class Spinner extends React.Component {
    render() {
        const {loading} = this.props;
        const classNames = [
            'spinner',
            loading ? 'spinner--show' : 'spinner--hide'
        ];

        return <div className={classNames.join(' ')}>
            {loading ? 'loading...' : '(not loading)'}
        </div>
    }
}

export default Spinner;
