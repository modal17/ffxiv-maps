import React, { Component } from 'react'
import { Grid, Dropdown, Checkbox, Container, Button } from 'semantic-ui-react'
import { mobOptions, floorOptions } from './utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine, LabelList } from 'recharts'

const FloorStatChart = props => {
	return(
		<BarChart width={800} height={150} layout='vertical' data={props.data} stackOffset="sign">
			<YAxis dataKey="name" type="category" hide={true}/>
			<XAxis type="number" domain={[-100,100]} tickFormatter={(tick)=>{ return Math.abs(tick)+"%" }} padding={{ left: 20, right:20}}/>
			<Tooltip/>
			<Legend/>
			<ReferenceLine y={0} stroke='#000'/>
			<Bar dataKey="left" fill="#91c7b1" stackId="stack"/>
			<Bar dataKey="right" fill="#b33951" stackId="stack"/>
		</BarChart>
	)
}

export default class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			floorLevel: '',
			floorMobs: [],
			floorMob: '',
			guestVisited: false
		}
	}
	
	componentDidMount() {
	}

	componentWillUnmount() {

	}

	changeFloor = (e, data) => {
		this.setState({
			floorLevel: data.value,
			floorMobs: mobOptions[data.value],
			floorMob: ''
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

	onShowStats = () => {
		var url = 'http://localhost:5000/cnd_agg/' + this.state.floorLevel +'/'+ this.state.floorMob
		fetch(url)
			.then( (response) => {
				if (response.status >= 400) {
					throw new Error("Bad reponse from server")
				}
				return response.json()
			})
			.then( (d) => {
				var left_perc = Math.round(d.left/d.total*100)

				var data = [{
					left: -left_perc,
					right: 100 - left_perc
				}]

				this.setState({ data: data })
			})
	}

	onSubmit = () => {
		var data = {
			fl_num: this.state.floorLevel,
			mob: this.state.floorMob,
			visitor: this.state.guestVisited,
			door: this.state.chosenDoor
		}

		var url = 'http://localhost:5000/api/floor'
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(resp => resp.json())
			.catch(err => console.error('Error:', err))
			.then(resp => console.log('Success:', resp))
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
							<Button onClick={this.onShowStats}> Show Stats </Button>
						</Grid.Column>
						<Grid.Row centered column={4}>
							{/* BarChart here. Probably move into another component? */}
							<FloorStatChart data={this.state.data} />
						</Grid.Row>
						<Grid.Row centered>
							<Button active={ this.state.chosenDoor === "leftDoor"} onClick={this.switchDoor} className="leftDoor"> Left </Button>
							<Button active={ this.state.chosenDoor === "rightDoor"} onClick={this.switchDoor} className="rightDoor"> Right</Button>
							{ /* TODO Submit the form to flask */ }
							<Button onClick={this.onSubmit}> Submit </Button>
						</Grid.Row>
					</Grid>
				</Container>
			</div>
		) 
	}
}
