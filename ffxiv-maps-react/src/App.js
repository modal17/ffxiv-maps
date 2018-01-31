import React, { Component } from 'react';
import { Menu, Header, Divider } from 'semantic-ui-react'
import Main from './Main'
import FloorEntry from './FloorEntry'

export default class App extends Component {
	
	render() {
		return (
			<div className="App">
				<Header as='h1' dividing style={{padding:'15px'}}>FFXIV Maps</Header>
				<FloorEntry />
			</div>
    )
  }
}

