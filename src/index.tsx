import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/index.scss';

import App from './App';

import { store } from './redux/store';

const root = document.getElementById('root');

ReactDOM.render(
	
	<BrowserRouter>
	<Provider store={store}>
		<App />
	</Provider>
	
	</BrowserRouter>
	, root);