import * as React from 'react';
import { Route } from 'react-router';
import MainPage from './components/MainPage';
import Details from './components/Details';

import './custom.css'

export default () => (
    <>
        <Route exact path="/" component={MainPage} />
        <Route path="/details" component={Details} />
    </>
);
