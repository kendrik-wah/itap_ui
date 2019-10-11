import React from 'react';
import axios from 'axios';

export default function WaypointGatherer(props, active_graph_id) {

  var waypoint_gatherer = {instance: '',
                           waypoints: '',
                           recovery_points: '',
                           parking_points: '',
                           acs_points: '',
                           station_points: '',
                           simple_points: ''}

  console.log(props.access_token);
  console.log(props.baseURL);
  console.log(active_graph_id);

 waypoint_gatherer.access_token = props.access_token;
 waypoint_gatherer.baseURL = props.baseURL;

 waypoint_gatherer.instance = axios.create({baseURL: waypoint_gatherer.baseURL});
 waypoint_gatherer.instance.defaults.headers.common['Authorization'] = 'Bearer ' + waypoint_gatherer.access_token;
 waypoint_gatherer.instance.defaults.headers.post['Content-Type'] = 'application/json';
 waypoint_gatherer.instance.defaults.headers.get['Content-Type'] = 'application/json';

 const url = '/graphs?ids=' + active_graph_id;
 waypoint_gatherer.instance.get(url).then(function(value) {
   waypoint_gatherer.waypoints = value.data[0].waypoints;
   console.log(waypoint_gatherer.waypoints)
   waypoint_gatherer.recovery_points = waypoint_gatherer.waypoints.filter(waypoint => waypoint.type === "recovery");
   waypoint_gatherer.parking_points = waypoint_gatherer.waypoints.filter(waypoint => waypoint.type === "parking");
   waypoint_gatherer.acs_points = waypoint_gatherer.waypoints.filter(waypoint => waypoint.type === "acs");
   waypoint_gatherer.station_points = waypoint_gatherer.waypoints.filter(waypoint => waypoint.type === "station");
   waypoint_gatherer.simple_points = waypoint_gatherer.waypoints.filter(waypoint => waypoint.type === "simple");
 }).catch(function(error) {
   console.log(error);
 })

 return waypoint_gatherer;
}
