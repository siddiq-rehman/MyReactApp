import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App.jsx';
import { Provider } from 'react-redux';
import store from './Store/store.js';

ReactDOM.render(
<Provider store={store}>
<App></App>
</Provider>
,document.getElementById('app'));