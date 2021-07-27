import axios from 'axios';
const schedule = require('node-schedule');
//import mail from './tabledata';

const url = 'http://localhost:3001/api/observers/5';
function fetchdata() {
  const request = axios.get(url);
  const dataPromise = request.then((response) => response.data);
  return dataPromise;
}

//let mail2 = [];
let mail = [];
const rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 30, 50];

function senddata() {
  fetchdata().then((data) => {
    console.log(data.results.length);
    for (let i = 0, len = data.results.length; i < len; i++) {
      mail.push(Number(data.results[i].total));
    }

    console.log(mail);
    barOption.series[0].data = mail;
    return barOption;
  });
}
function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    // 使用  continue 实现；
    continue;
  }
}

const barOption = {
  backgroundColor: 'transparent',
  title: {
    text: '折线图堆叠',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '邮件营销',
      type: 'line',
      stack: '总量',
      data: [], /* (function () {
        fetchdata().then((data) => {
          console.log(data.results.length);
          console.log('0000');
          for (let i = 0, len = data.results.length; i < len; i++) {
            mail.push(Number(data.results[i].total));
          }
          //console.log(mail);
        });
        sleep(5000);
        console.log('1111');
        console.log(mail);
        return mail;
      })(), */
    },
    {
      name: '联盟广告',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'line',
      stack: '总量',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: '直接访问',
      type: 'line',
      stack: '总量',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: '搜索引擎',
      type: 'line',
      stack: '总量',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

/* const barOption02 = senddata();
console.log(barOption02);
 */
/* export default function () {
  var barOption02 = senddata();
  console.log(barOption02);
  return barOption02;
} */
/* export default x = senddata(); */

//const barOption02 = senddata();
export default barOption;