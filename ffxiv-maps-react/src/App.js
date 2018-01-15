import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react'
import Main from './Main';

export default class App extends Component {

	state = {}

	handleItemClick = (e, {name}) => this.setState({ activeItem: name})

	render() {

		const { activeItem } = this.state
		return (
			<div className="App">
				<Menu>
					<Header size="large">FFXIV-Maps</Header>
					<Menu.Item
						name='main'
						active={activeItem === 'main'}
						onClick={this.handleItemClick}
					>
						Main
					</Menu.Item>
					<Menu.Item
						name='stats'
						active={activeItem === 'stats'}
						onClick={this.handleItemClick}
					>
						Stats
					</Menu.Item>
					<Menu.Item
						name='sim'
						active={activeItem === 'sim'}
						onClick={this.handleItemClick}
					>
						Sim
					</Menu.Item>
				</Menu>
				<Main />
			</div>
    )
  }
}

