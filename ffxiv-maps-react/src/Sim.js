import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

// Return list of mobs depending on the floor.
function getMobGroups(floor) {

	let selection = null

	switch(floor) {
		case 1:
			return [{
				text: 'floor1',
				value: 'floor1'
			}]
		case 2:
			return [{
				text: 'floor2',
				value: 'floor2'
			}]
		case 3:
			return [{
				text: 'floor3',
				value: 'floor3'
			}]
		case 4:
			return [{
				text: 'floor4',
				value: 'floor4'
			}]
		case 5:
			return [{
				text: 'floor5',
				value: 'floor5'
			}]
		case 6:
			return [{
				text: 'floor6',
				value: 'floor6'
			}]
	}
}

// Selection drop down
const MobSelection = ({floor}) => (
	<Dropdown placeholder='Mob Appearance' fluid selection options={ getMobGroups(floor) } />
)
export default class Sim extends Component {

	render() {
		return (
			<div>
			</div>
		)
	}
}
