import React from 'react';
import axios from 'axios';


const schedule = require('node-schedule');

const token01 = 'Bearer wZGSpBiU3OjaiSYD5LTr2v06dozBAFZa';
const url = 'http://localhost:3001/api/pools/ltc/accounts/3832/miners/stats?group_id=';
const url02 = 'http://localhost:3001/api/observers';
//常态化，写到后端或者长期运行
const group_id = '';

function fetchdata(id) {
  const request = axios.get(`${url}${id}`, {
    headers: {
      'Accept': '*/*',
      'Content-Type': 'text/plain',
      'Authorization': token01,
    },
  });
  const dataPromise = (request.then((response) => response.data));
  return dataPromise;

}

const rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 30, 50];

const mytimer = () => {
  schedule.scheduleJob(rule, () => {
    fetchdata(group_id).then((data) => {
      console.log(data);
      console.log(data.total);
      let groupname = '';
      if (group_id === '') {
        groupname = 'All';
        console.log(groupname);
      }
      const observer = {
        group: groupname,
        active: data.active,
        dead: data.dead,
        inactive: data.inactive,
        total: data.total,
      };
      const request = axios.post(url02, observer);
      return request;
    });
  });
  return (
    <br />
  );
};

export default mytimer;
