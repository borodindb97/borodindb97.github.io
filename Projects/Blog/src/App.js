import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './Store/Store'

import Layout from './Layout/Layout'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    </Provider>,

    document.querySelector('.blog')
);

