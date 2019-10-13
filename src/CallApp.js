import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Split from 'react-split';
import AMR from './AMR.js';
import WaypointGatherer from './WaypointGatherer.js';
import StationDropdown from './StationDropdown.js';
import StationMenu from './StationMenu.js';
import elem_test from './elem_test.mp4';

var instance = undefined;

var split = {
  "display": "flex"
}

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
    this.handleGo = this.handleGo.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStop = this.handleStop.bind(this);
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

  handleGo(event) {
    console.log(this.state.active_graph_id);
    console.log(this.state.amrs);
    // MAKE API CALL TO PYTHON SCRIPT HERE!
  }

  handleReset(event) {
    console.log(this.state.active_graph_id);
    console.log(this.state.amrs);
    // MAKE API CALL TO PYTHON SCRIPT HERE!
  }

  handleStop(event) {
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
      return (
        <div className="CallApp_no_AMR_div">

          <video autoPlay loop muted>
               <source src={elem_test} type="video/mp4" />
          </video>

          <div className="CallApp_no_AMR_loading_text">
            <h1>Loading!</h1>
          </div>
        </div>
     )
    }
    else {
      return (
        <div className="CallApp_has_AMR_div">

          <div className="CallApp_Split_div">
            <Split sizes={[50, 50]} className="CallApp_Split" style={split}>
              <StationDropdown className="CallApp_selectStationA"
                               imprint="station"
                               access_token={this.state.access_token}
                               baseURL={this.state.baseURL}
                               onChange={this.selectStationA}
                               active_graph_id={this.state.active_graph_id}/>

             <StationDropdown className="CallApp_selectStationB"
                              imprint="station"
                              access_token={this.state.access_token}
                              baseURL={this.state.baseURL}
                              onChange={this.selectStationB}
                              active_graph_id={this.state.active_graph_id}/>
            </Split>
          </div>

          <div className="CallApp_buttons_div">
            <Button className="CallApp_go_button"
                    value="Initiate"
                    variant="contained"
                    onClick={this.handleGo}>GO</Button>

            <Button className="CallApp_reset_button"
                    value="Initiate"
                    variant="contained"
                    onClick={this.handleReset}>RESET</Button>

            <Button className="CallApp_stop_button"
                    value="Initiate"
                    variant="contained"
                    onClick={this.handleStop}>STOP</Button>
         </div>

       </div>
       )
     }
  }
}

export default CallApp;
