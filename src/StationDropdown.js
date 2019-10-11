import React from 'react';
import SimpleMenu from './StationMenu.js';
import axios from 'axios';

var instance;
var arbiter;
var pts;

export class StationDropdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imprint: '',
      active_graph_id: '',
      waypoints: [],
      selectedPoint: ''
    }

    this.getWaypoints = this.getWaypoints.bind(this);
    this.handleChange = this.handleChange.bind(this);
   }

  getWaypoints() {
    var self = this;

    const url = '/graphs?ids=' + self.state.active_graph_id;

    if (self.state.waypoints === undefined && self.state.active_graph_id !== '') {
      instance.get(url).then(function(value) {
        self.state.waypoints = value.data[0].waypoints.filter(waypoint => waypoint.type === self.state.imprint);
      }).catch(function(error) {
        console.log(error);
      })
    }
  }

  handleChange(event) {
    this.setState({selectedPoint: event.value});
    arbiter.onChange(this.state.selectedPoint);
  }

  UNSAFE_componentWillMount() {

    instance = axios.create({baseURL: this.props.baseURL});
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;
    instance.defaults.headers.post['Content-Type'] = 'application/json';
    instance.defaults.headers.get['Content-Type'] = 'application/json';

    if (this.state.imprint === '') {
      this.state.imprint = this.props.imprint;
    }

    if (this.state.active_graph_id === '') {
      this.state.active_graph_id = this.props.active_graph_id;
    }
  }

  render() {

    this.state.access_token = this.props.access_token;
    this.state.baseURL = this.props.baseURL;
    this.state.imprint = this.props.imprint;
    this.state.active_graph_id = this.props.active_graph_id;

    this.getWaypoints();

    if (this.state.waypoints !== undefined) {
      return (
        SimpleMenu()
      )
    }
    else {
      return (
        <p>HaaaaaaaaRAMMMMBEEEEEEEE</p>
      )
    }
  }
}

export default StationDropdown;
