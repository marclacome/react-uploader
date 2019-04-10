import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Store } from './store';

import AdminUpload from './components/upload';

class App extends Component {
	render(){
		return( 
			<Provider store={Store}>
			<AdminUpload filetype='image' />
			</Provider>
		);
  	}
}

export default App;
