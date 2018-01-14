import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'

export default class App extends Component {

	state = {}

	handleItemClick = (e, {name}) => this.setState({ activeItem: name})

	render() {

		const { activeItem } = this.state
		return (
			<div className="main">
				<Menu>
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
      </div>
    );
  }
}

