//import * as React from 'react';
import React, { lazy, Suspense } from 'react';
import * as echarts from 'echarts/lib/echarts';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';
import barOption from './Option';
import { Select } from '@alifd/next';
import { Grid } from '@alifd/next';
import { DatePicker2 } from '@alifd/next';
import { Typography } from '@alifd/next';


let active = [];
let inactive = [];
let dead = [];
let total = [];
const url = 'http://localhost:3001/api/observers';
let group = 'All';
let num = '7';

function fetchdata() {

  const request = axios.get(`${url}/${group}/${num}`);
  const dataPromise = request.then((response) => response.data);
  dataPromise.then(data => {
    for (let i = 0, len = data.results.length; i < len; i++) {
      active.push(Number(data.results[i].active));
      inactive.push(Number(data.results[i].inactive));
      dead.push(Number(data.results[i].dead));
      total.push(Number(data.results[i].total));
    }
    console.log(data.results);
  });
  return active;
}
let start;
let end;


class Chart01 extends React.Component {
  state = {
    mail02: fetchdata(),
    inactive: inactive,
    dead: dead,
    total: total,
    start: 30,
    end: 70,
  }
  initChart01() {
    let myChart = echarts.init(document.getElementById('main'));
    let barOption02 = {
      backgroundColor: 'transparent',
      title: {
        text: '折线图堆叠',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['活跃', '非活跃', '失效', '总量'],
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
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: this.state.start,
          end: this.state.end,
          xAxisIndex: [0, 1]
        },
        {
          type: 'inside',
          realtime: true,
          start: this.state.start,
          end: this.state.end,
          xAxisIndex: [0, 1]
        },
      ],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
        scale: true,
      },
      series: [
        {
          name: '活跃',
          type: 'line',
          //stack: '总量',
          data: this.state.mail02, /* (function () {
            fetchdata().then((data) => {
              console.log(data.results.length);
              console.log('0000');
              for (let i = 0, len = data.results.length; i < len; i++) {
                mail.push(Number(data.results[i].total));
              }
              //console.log(mail);
            });
            console.log('1111');
            console.log(mail);
            return mail;
          })(), */
        },
        {
          name: '非活跃',
          type: 'line',
          //stack: '总量',
          data: this.state.inactive,
        },
        {
          name: '失效',
          type: 'line',
          //stack: '总量',
          data: this.state.dead,
        },
        {
          name: '总量',
          type: 'line',
          //stack: '总量',
          data: this.state.total,
        },
      ],
    };
    myChart.setOption(barOption02);
    myChart.on('dataZoom', function (event) {
      if (event.batch) {
        start = event.batch[0].start;
        end = event.batch[0].end;
      } else {
        start = event.start;
        end = event.end;
      };
    });
    
  };
  componentDidMount() {
    /* barOption.series[0].data = fetchdata();
    console.log(barOption); */
    console.log(barOption);
    console.log('barOption');
    this.initChart01();
    console.log('initover');
    this.setState({
      mail02: fetchdata(),
      inactive: inactive,
      dead: dead,
      total: total,
      start: start,
      end: end,
    });
    this.initChart01();
    console.log('first');
    //clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState({
        mail02: fetchdata(),
        inactive: inactive,
        dead: dead,
        total: total,
        start: start,
        end: end,
      });
      console.log(this.state.mail02);
      console.log(this.state.inactive);
      this.initChart01();
      for(var i = 0; i< num; i++){
        inactive.shift();
        active.shift();
        dead.shift();
        total.shift();
      }
      console.log('follow');
    }, 10000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render() {
    return (
      <div id="main" style={{ width: 1000, height: 400 }}></div>
    )
  }
}


/* const barOption = {
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
      data: [], (function () {
        fetchdata().then((data) => {
          console.log(data.results.length);
          console.log('0000');
          for (let i = 0, len = data.results.length; i < len; i++) {
            mail.push(Number(data.results[i].total));
          }
          //console.log(mail);
        });
        console.log('1111');
        console.log(mail);
        return mail;
      })(),
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
}; */

/* function senddata() {
  fetchdata().then((data) => {
    console.log(data.results.length);
    for (let i = 0, len = data.results.length; i < len; i++) {
      mail.push(Number(data.results[i].total));
    }

    console.log(mail);
    barOption.series[0].data = mail;
    console.log(barOption);
    return mail;
  });
}

function x() {
  let y = [0, 10, 20];
  return y;
}
barOption.series[0].data = fetchdata(); */
const Option = Select.Option;
const { Row, Col } = Grid;
const { MonthPicker, YearPicker, WeekPicker, QuarterPicker } = DatePicker2;
const { H1, H2, Paragraph, Text } = Typography;

const onChange = function (value) {
  group = value;
  console.log(value);
};

const onToggleHighlightItem = function (item, type) {
  console.log(item, type);
};

const onFocus = () => {
  console.log('focus');
};

const onBlur = () => {
  console.log('blur');
};
const onChangenum = function (value) {
  num = Number(value);
};


const Guide01 = () => {
  return (
    <div>
      <Row>
        <Col><Chart01 /></Col>
        <Col fixedSpan="16">
          <div>
            <Typography>
              <H2>机型选择</H2>
            </Typography>
            <Select
              id="basic-demo"
              onChange={onChange}
              onToggleHighlightItem={onToggleHighlightItem}
              defaultValue="All"
              onFocus={onFocus}
              onBlur={onBlur}
              aria-label="name is"
              style={{ marginRight: 8 }}
            >
              <Option value="All">All</Option>
              <Option value="X5S">X5S</Option>
              <Option value="X5">X5</Option>
            </Select>
            <Typography>
              <H2>数据量选择</H2>
            </Typography>

            <Select onChange={onChangenum} defaultValue="7" hasClear style={{ marginRight: 8 }}>
              <Option value="7">7</Option>
              <Option value="3">3</Option>
              <Option value="1">1</Option>
            </Select>

            {/* <Select
              placeholder="show search"
              showSearch
              hasClear
              style={{ marginRight: 8 }}
            >
              <Option value="jack">Jack</Option>
              <Option value="frank">Frank</Option>
              <Option value="hugo">Hugo</Option>
            </Select>

            <Select disabled defaultValue="frank" style={{ marginRight: 8 }}>
              <Option value="jack">Jack</Option>
              <Option value="frank">Frank</Option>
              <Option value="hugo">Hugo</Option>
            </Select> */}

          </div>
        </Col>
        <Col fixedSpan="16">
          <div>
            <Typography>
              <H2>日期选择</H2>
            </Typography>

            <DatePicker2 />
          </div>
        </Col>
      </Row>


    </div>
  );
};

export default Guide01;