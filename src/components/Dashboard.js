import React from 'react';
import { connect } from "react-redux"
import * as actions from "../store/actions";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "david",
        }
    }
    componentDidMount() {
        this.setState({ name: "Miguel" })
        this.props.loadData()
    }

    render() {
        if (this.props.loading) {
            return <div>Loading...</div>;
        }
        else {
            let dataArray = this.props.data
            console.log(Array.isArray(dataArray))
            return (
                <div>
                    <ul>
                        {
                            dataArray.map((item, ndx) => {
                                return (<li key={item.timestamp}>{ndx}.-{item.timestamp}</li>)
                            })
                        }
                    </ul>
                </div>
            )
        }
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)