import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react'
import Main from './Main';
import Sim from './Sim';
import Stats from './Stats';

export default class App extends Component {

	state = { activeItem: 'main'}
	
	handleItemClick = (e, {name}) => this.setState({ activeItem: name})
	
	render() {
		
		let page = null;
		const { activeItem } = this.state;

		switch ( activeItem ) {
			case 'main':
				page = <Main />
				break
			case 'stats':
				page = <Stats />
				break
			case 'sim':
				page = <Sim />
				break
		}

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
				{ page }
			</div>
    )
  }
}

