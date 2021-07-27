import React from 'react';
import axios from 'axios';
const schedule = require('node-schedule');
const Dataurl = 'http://localhost:3001/api/observers';

function fetchdata() {
  const request = axios.get(Dataurl);
  const dataPromise = (request.then(response => response.data));
  return dataPromise;

}

const rule = new schedule.RecurrenceRule();
rule.second = [30];

const CacheTimer = () => {
  schedule.scheduleJob(rule, () => {
    fetchdata().then((data) => {
      console.log(data);
    });
  });
  return (
    <br />
  );
};

export default CacheTimer;
