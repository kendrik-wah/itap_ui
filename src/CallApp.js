import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import AMR from './AMR.js';
import WaypointGatherer from './WaypointGatherer.js';
import StationDropdown from './StationDropdown.js';

var instance = undefined;

export class CallApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      access_token: '',
      baseURL: '',
      amr_ids: undefined,
      active_graph_id: '',
      amrs: undefined,
      station_a: undefined,
      station_b: undefined,
      waypoints: undefined
    }

    this.getActiveGraph = this.getActiveGraph.bind(this);

    this.getAMR = this.getAMR.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.selectStationA = this.selectStationA.bind(this);
    this.selectStationB = this.selectStationB.bind(this);
  }

  getActiveGraph() {
    var self = this;

    instance.get('/graphs/active').then(function(value) {
      self.setState({active_graph_id: value.data.id});
    }).catch(function(error) {
      console.log(error);
      }
    )
  }

  getAMR() {
    var self = this;

    instance.get('/amrs/statuses').then(function(value) {
      self.setState({amrs: value.data});
      self.setState({amr_ids: self.state.amrs.map(a => a["amr_id"])});
    }).catch(function(error) {
      console.log("error: " + error);
    })
  }

  selectStationA(station) {
    this.setState({station_a: station});
  }

  selectStationB(station) {
    this.setState({station_b: station});
  }

  handleClick(event) {
    console.log(this.state.active_graph_id);
    console.log(this.state.amrs);
    // MAKE API CALL TO PYTHON SCRIPT HERE!
  }

  UNSAFE_componentWillMount() {
    this.setState({access_token: this.props.access_token});
    this.setState({baseURL: this.props.baseURL});

    instance = axios.create({baseURL: this.props.baseURL});
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;
    instance.defaults.headers.post['Content-Type'] = 'application/json';
    instance.defaults.headers.get['Content-Type'] = 'application/json';

    this.getActiveGraph();
  }

  render() {

    if (this.state.amrs === undefined) {
      this.getAMR();
    }

    return (
      <div className="CallApp">
        <Button value="Initiate"
                variant="contained"
                onClick={this.handleClick}>GO</Button>

        <StationDropdown className="selectStationA"
                         imprint="station"
                         access_token={this.state.access_token}
                         baseURL={this.state.baseURL}
                         onChange={this.selectStationA}
                         active_graph_id={this.state.active_graph_id}/>
      </div>
    )
  }
}

export default CallApp;
