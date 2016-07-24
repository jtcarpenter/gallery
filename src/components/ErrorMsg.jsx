import React from 'react';
import ReactDOM from 'react-dom';

export class ErrorMsg extends React.Component {

    render() {
        const {error} = this.props;
        let classes = ['error-msg']
        if (error) {
            classes.push('error-msg--show');
        }

        return <div className={classes.join(' ')}>
            <div>{String(error)}</div>
        </div>
    }
}

export default ErrorMsg;
