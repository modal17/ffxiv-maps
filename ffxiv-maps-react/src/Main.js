import React, { Component } from 'react'
import { Grid, Dropdown, Checkbox, Container } from 'semantic-ui-react'
import { mobOptions, floorOptions } from './utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts'

const data = [
	{name: 'visitor', left: -50, right: 50},
	{name: 'no visitor', left: -90, right: 10}
]

export default class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			floorLevel: '',
			floorMobs: [],
			floortMob: '',
			guestVisited: false
		}
	}
	
	componentDidMount() {
		
	}

	componentWillUnmount() {

	}

	changeFloor = (e, data) => {
		this.setState({
			floorLevel: data.text,
			floorMobs: mobOptions[data.value],
			floortMob: ''
		})
	}

	changeMob = (e, data) => {
		this.setState({
			floorMob: data.value
		})
	}

	toggleGuestVisit = (e, data) => {
		this.setState((prevState) => ({
			guestVisited: !prevState.guestVisited
		}))
	}

	render() {
		return (
			<Container>
				<Grid padded> 
					<Grid.Column width={4}>
					</Grid.Column>
					<Grid.Column width={3}>
						<Dropdown placeholder='Select Floor' fluid selection options={floorOptions} onChange={this.changeFloor} />
					</Grid.Column>
					<Grid.Column width={3}>
						<Dropdown placeholder='Select Mob' fluid selection options={this.state.floorMobs} onChange={this.changeMob}/>
					</Grid.Column>
					<Grid.Column width={2}>
						<Checkbox label='Guest' onChange={this.toggleGuestVisit}/>
					</Grid.Column>
				</Grid>
				<BarChart width={600} height={300} layout='vertical' data={data} stackOffset="sign">
					<YAxis dataKey="name" type="category"/>
					<XAxis type="number" domain={[-100,100]}/>
					<ReferenceLine y={0} stroke='#000'/>
					<Bar dataKey="left" fill="#8884d8" stackId="stack" />
					<Bar dataKey="right" fill="#82ca9d" stackId="stack"/>
				</BarChart>
			</Container>
		) 
	}
}
