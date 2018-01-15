import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import { HorizontalBar } from 'react-chartjs-2';

const data = {
	labels: ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4,', 'Floor 5', 'Floor 6'],
	datasets: [
		{
			label: 'Left',
			backgroundColor: '#36A2EB',
			data: [-40,-45,-80,-70,-50,-50]
		},
		{
			label: 'Right',
			backgroundColor: '#FF6384',
			data: [60,55,20,30,50,50]
		}
	]
}

export default class Main extends Component {
	displayName: 'Uznair Maps'

	render() {
		return (
			<div className="main">
				<Container>
					<Grid>
						<Header as='h2'> Bar Test </Header>
						<HorizontalBar
							data = {data}
							options = {{
								responsive: true,
								scales: {
									xAxes: [{
										stacked: true,
										ticks: {
											min: -100,
											max: 100,
											callback: (value, index, values) => {
												return value < 0 ? Math.abs(value)+'%' : value+'%';
											}
										}
									}],
									yAxes: [{
										stacked: true,
									}]
								},
								tooltips: {
									callbacks: {
										label: (tooltipItem, data) => {
											let datasetLabel = data.datasets[tooltipItem.datasetIndex].label;
											let xLabel = Math.abs(tooltipItem.xLabel);
											return datasetLabel + ': ' + xLabel + '%';
										}
									}
								}
							}}
						/>
					</Grid>
				</Container>
			</div>
		)
	}
}
