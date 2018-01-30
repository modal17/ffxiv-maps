import React, { Component } from 'react';
import { Menu, Header, Divider } from 'semantic-ui-react'
import Main from './Main';

export default class App extends Component {
	
	render() {
		return (
			<div className="App">
				<Header as='h1' style={{paddingTop: '15px'}}>FFXIV Maps</Header>
				<Divider />
				<Main />
			</div>
    )
  }
}

