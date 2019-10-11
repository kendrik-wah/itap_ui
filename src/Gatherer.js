import React from 'react';
import axios from 'axios';

export default function Gatherer(props) {

  var gatherer = {instance: undefined,
                  baseURL: '',
                  access_token: '',
                  active_graph_id: undefined}

  gatherer.access_token = props.access_token;
  gatherer.baseURL = props.baseURL;

  gatherer.instance = axios.create({baseURL: gatherer.baseURL});
  gatherer.instance.defaults.headers.common['Authorization'] = 'Bearer ' + gatherer.access_token;
  gatherer.instance.defaults.headers.post['Content-Type'] = 'application/json';
  gatherer.instance.defaults.headers.get['Content-Type'] = 'application/json';

  if (gatherer.instance !== null) {
    gatherer.instance.get('/graphs/active').then(function(value) {
      gatherer.active_graph_id = value.data.id;
  }).catch(function(error) {
      console.log(error);
      }
    )
  }

  return gatherer.active_graph_id;
}
