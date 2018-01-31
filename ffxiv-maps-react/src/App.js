import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
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

