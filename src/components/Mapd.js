import React, { Component } from 'react';
import { connect } from "react-redux"
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import HighChart from "react-highcharts";
import * as actions from "../store/actions";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleItem: [],
            pollData: []
        }
    }
    componentDidMount() {
        this.props.loadData()
    }

    showLbl = () => {
        this.setState({ pollData: this.props.data })
    }
    render() {
        let polled = this.props.data
        let singleItem = [polled.pop()]

        const GoogleMapDronePosition = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: 29.7604, lng: -95.3698 }}
                defaultZoom={5}
            >
                {
                    this.props.data.map((item) => {
                        return (<Marker
                            key={item.timestamp}
                            position={{ lat: item.latitude, lng: item.longitude }}
                        />)
                    })
                }

            </GoogleMap>

        ));
        const GoogleMapDronePolledPosition = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: 29.7604, lng: -95.3698 }}
                defaultZoom={5}
            >
                {
                    singleItem.map((item) => {
                        let tmpData = this.state.pollData.pop()
                        console.log(tmpData)
                        return (<Marker
                            key={item.timestamp}
                            position={{ lat: (this.state.pollData.length !== 0 ? this.state.pollData.pop().latitude : item.latitude), lng: (this.state.pollData.length !== 0 ? this.state.pollData.pop().longitude : item.longitude) }}
                        />)
                    })
                }

            </GoogleMap>

        ));
        if (this.props.loading) {
            return <div>Loading...</div>;
        }
        let arr = []

        this.props.data.map((elem) => {
            arr.push([elem.timestamp, elem.metric])
            return null
        })
        const config = {
            chart: {
                zoomType: "x"
            },

            title: {
                text: "Temperature in Houston Surrounding Area (F)"
            },

            tooltip: {
                valueDecimals: 2
            },

            xAxis: {
                type: "datetime"
            },

            series: [
                {
                    data: arr,
                    lineWidth: 0.5,
                    name: "F"
                }
            ]
        };
        let ChangingValue = this.state.pollData.pop()
        return (
            <Table>
                <TableBody>
                    <TableRow >
                        <TableCell><GoogleMapDronePosition
                            containerElement={<div style={{ height: `400px`, width: '400px' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        /></TableCell>
                        <TableCell><HighChart config={config} /></TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell>
                            <GoogleMapDronePolledPosition
                                containerElement={<div style={{ height: `400px`, width: '400px' }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={(this.state.pollData.length !== 0 ? ChangingValue.latitude : "")}
                                label="Latitude"
                            />
                            <br />
                            <TextField
                                value={(this.state.pollData.length !== 0 ? ChangingValue.longitude : "")}
                                label="Longitude"
                            />
                            <br />
                            <TextField
                                value={(this.state.pollData.length !== 0 ? ChangingValue.metric : "")}
                                label="Metric"
                            />
                            <br />
                            <br />
                            <Button style ={{backgroundColor:"skyblue"}} color="primary" onClick={this.showLbl}>
                                Poll Location and Show On Map (on the Left)
                            </Button>

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        data: state.droneData.data,
        loading: state.droneData.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: () => dispatch(actions.loadData()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)