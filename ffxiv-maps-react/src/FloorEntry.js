import React, { Component } from 'react'
import { Grid, Container, Button, Form, Header, Statistic, Transition, Divider, Segment } from 'semantic-ui-react'
import { mobOptions } from './utils'

const initState = { 
    floor: null,
    mob: null,
    door: null,
    mobOptions: [],
    visitor: false,
    leftStat: 0,
    rightStat: 0,
		betterDoor: null,
		total: 'N/A',
		display: ''
}

export default class FloorEntry extends Component {
    constructor(props) {
        super(props)
        this.state = initState
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    selectFloor = (e, data) => {
        this.setState({    
            floor: data.content,
						mobOptions: mobOptions[data.content],
						mob: null
         })
    }

    selectMob = (e, data) => {
        this.setState({
            mob: data.value
        })
    }

    toggleVisitor = () => {
        this.setState((prevState) => ({
            visitor: !prevState.visitor
        }))
    }

    getFloorStats = () => {
        var url = '/cnd_agg/' + this.state.floor +'/'+ this.state.mob +'/'+ (this.state.visitor ? "1" : "0")
		fetch(url)
		.then( (response) => {
            if (response.status >= 400) {
                //TODO Catch and handle error - notify user of problem.
                throw new Error("Bad reponse from server")
            }
            return response.json()
        })
				.then( (data) => {
						var left = 0
						var right = 0

						if (data.total > 0) {
            	left = Math.round(data.left/data.total*100)
							right = 100 - left
						}
						
						this.setState((prevState) => {
								return {
										leftStat: left,
										rightStat: right,
										betterDoor: left > right ? "left" : "right",
										total: data.total,
										display: 'floor ' + prevState.floor + ':' + prevState.mob + ', visitor: ' + (prevState.visitor ? 'yes' : 'no')
								}
            })
        })
    }

    selectDoor = (e, data) => {
        this.setState({
            door: data.content
        })
    }

    onSubmit = () => {
        var data = {
            fl_num: this.state.floor,
            mob: this.state.mob,
            visitor: this.state.visitor,
            door: this.state.door
        }

      var url = '/api/floor'
			fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
        }).then(resp => resp.json())
            // TODO: Maybe do more with the catch error?
			.catch(err => console.error('Error:', err))
            .then(resp => console.log('Success:', resp))

        this.setState(initState)
    }

    // TODO: Guarentee correct data submission
    // TODO: A message that notifies user that the data has been submitted with failure or success (ACID)
    
    render() {
        return(
            <Container> 
                <Header as="h3" dividing> Select a Floor </Header>
                <Grid>
                    <Grid.Row>
                        <Button.Group >
                            <Button content={1} active={this.state.floor === 1} onClick={this.selectFloor}/>
                            <Button content={2} active={this.state.floor === 2} onClick={this.selectFloor}/>
                            <Button content={3} active={this.state.floor === 3} onClick={this.selectFloor}/>
                            <Button content={4} active={this.state.floor === 4} onClick={this.selectFloor}/>
                            <Button content={5} active={this.state.floor === 5} onClick={this.selectFloor}/>
                            <Button content={6} active={this.state.floor === 6} onClick={this.selectFloor}/>
                        </Button.Group>
                    </Grid.Row>
                </Grid>
                <Header as="h3" dividing> Floor Options </Header>
                <Grid>
                    <Grid.Row>
                        <Form>
                            <Form.Dropdown placeholder='Select Floor Mob' fluid selection 
                                options={this.state.mobOptions} value={this.state.mob} onChange={this.selectMob}/>
                            <Form.Checkbox toggle checked={this.state.visitor} label="Was there a visitor?"
                                onClick={this.toggleVisitor}/>
                        </Form>
                    </Grid.Row>
                </Grid>
                <Header as="h3" dividing> Correct Door Percentages </Header>
                <Grid>
										<Grid.Row>  
												<Statistic.Group>
														<Statistic color={this.state.betterDoor === "left" ? "blue" : "black"}
																		size={this.state.betterDoor === "left" ? "large" : ""}>
																<Statistic.Value>{this.state.leftStat}</Statistic.Value>
																<Statistic.Label>% Left</Statistic.Label>
														</Statistic>
														<Statistic color={this.state.betterDoor === "right" ? "blue" : "black"}
																		size={this.state.betterDoor === "right" ? "large" : ""}>
																<Statistic.Value>{this.state.rightStat}</Statistic.Value>
																<Statistic.Label>% Right</Statistic.Label>
															</Statistic>
															<Statistic>
																<Statistic.Value>{this.state.total}</Statistic.Value>
																<Statistic.Label>Of Total</Statistic.Label>
															</Statistic>
												</Statistic.Group>
										</Grid.Row>
										<Grid.Row>
												Displaying: {this.state.display}
										</Grid.Row>
                    <Button disabled={this.state.floor == null || this.state.mob == null} content="Display Floor Statistics" primary onClick={this.getFloorStats}/>
								</Grid>
								<Divider hidden/>
                <Header as="h3" dividing> Select Correct Door </Header>
                <Grid verticalAlign="middle">
                    <Grid.Column width={4}>
                        <Button.Group>
                            <Button content="Left" disabled={this.state.floor == null || this.state.mob == null}
                                    active={this.state.door === "Left"} onClick={this.selectDoor}/>
                            <Button.Or />
                            <Button content="Right" disabled={this.state.floor == null || this.state.mob == null}
                                    active={this.state.door === "Right"} onClick={this.selectDoor}/>
                        </Button.Group>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button content="Record Floor" disabled={this.state.door !== "Left" && this.state.door !== "Right"} 
                                onClick={this.onSubmit} size="big" positive/>
                    </Grid.Column>
                    <Grid.Column>
                    
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}
