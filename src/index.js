import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, hashHistory} from 'react-router';
import {Provider, connect} from 'react-redux';
import CarouselCtnr from './containers/CarouselCtnr.jsx';
import appStore from './store/appStore';

import appCss from './app.scss';

ReactDOM.render(
    <Provider store={appStore}>
        <Router history={hashHistory}>
            <Route path="/(:id)" component={CarouselCtnr}></Route>
        </Router>
    </Provider>,
    document.getElementById('app'));