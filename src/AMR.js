import React from 'react';
import axios from 'axios';

export default function AMR(props) {

  var amr = {instance: null,
             baseURL: '',
             access_token: '',
             amrs: [],
             amr_ids: []}

  amr.access_token = props.access_token;
  amr.baseURL = props.baseURL;

  amr.instance = axios.create({baseURL: amr.baseURL});
  amr.instance.defaults.headers.common['Authorization'] = 'Bearer ' + amr.access_token;
  amr.instance.defaults.headers.post['Content-Type'] = 'application/json';
  amr.instance.defaults.headers.get['Content-Type'] = 'application/json';

  if (amr.instance !== null) {
    amr.instance.get('/amrs/statuses').then(function(value) {
      amr.amrs = value.data;
      amr.amr_ids = amr.amrs.map(a => a["amr_id"]);
    }).catch(function(error) {
      console.log("error: " + error);
    })
  }

  return amr;
}
