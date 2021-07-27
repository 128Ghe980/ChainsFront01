import axios from 'axios';
const schedule = require('node-schedule');

const url = 'http://localhost:3001/api/observers/5';
function fetchdata() {
  const request = axios.get(url);
  const dataPromise = request.then((response) => response.data);
  return dataPromise;
}

let mail = [];
const rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 30, 50];

function tabledata() {
  fetchdata().then((data) => {
    console.log(data.results.length);
    for (let i = 0, len = data.results.length; i < len; i++) {
      mail.push(Number(data.results[i].total));
    }

    console.log(mail);
    return mail;
  });
}

export default tabledata;
