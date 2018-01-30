import React, { Component } from 'react'
import { Grid, Dropdown, Checkbox, Container, Button } from 'semantic-ui-react'
import { mobOptions, floorOptions } from './utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, LabelList } from 'recharts'

const data = [
	{left: -60, right: 40}
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

	switchDoor = (e, data) => {
		this.setState({
			chosenDoor: data.className
		})
	}

	render() {
		return (
			<div>
				<Container>
					<Grid padded centered={true}> 
						<Grid.Column width={3}>
							<Dropdown placeholder='Select Floor' fluid selection options={floorOptions} onChange={this.changeFloor} />
						</Grid.Column>
						<Grid.Column width={3}>
							<Dropdown placeholder='Select Mob' fluid selection options={this.state.floorMobs} onChange={this.changeMob}/>
						</Grid.Column>
						<Grid.Column width={2}>
							<Checkbox label='Guest' onChange={this.toggleGuestVisit}/>
						</Grid.Column>
						<Grid.Column width={3}>
							{/* TODO Call fetch for floor data and dynamically change the bar chart */}
							<Button> Show Stats </Button>
						</Grid.Column>
						<Grid.Row centered column={4}>
							{/* BarChart here. Probably move into another component? */}
							<BarChart width={800} height={150} layout='vertical' data={data} stackOffset="sign">
								<YAxis dataKey="name" type="category" hide="true"/>
								<XAxis type="number" domain={[-100,100]} tickFormatter={(tick)=>{ return Math.abs(tick)+"%" }} padding={{ left: 20, right:20}}/>
								<Tooltip/>
								<Legend/>
								<ReferenceLine y={0} stroke='#000'/>
								<Bar dataKey="left" fill="#38D196" stackId="stack"/>
								<Bar dataKey="right" fill="#FF6F51" stackId="stack"/>
							</BarChart>
						</Grid.Row>
						<Grid.Row centered>
							<Button active={ this.state.chosenDoor == "leftDoor"} onClick={this.switchDoor} className="leftDoor"> Left </Button>
							<Button active={ this.state.chosenDoor == "rightDoor"} onClick={this.switchDoor} className="rightDoor"> Right</Button>
							{ /* TODO Submit the form to flask */ }
							<Button> Submit </Button>
						</Grid.Row>
					</Grid>
				</Container>
			</div>
		) 
	}
}
