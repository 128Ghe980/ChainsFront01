import React, { lazy, Suspense } from 'react';
import * as echarts from 'echarts/lib/echarts';
import axios from 'axios';
import { Select } from '@alifd/next';
import { Grid } from '@alifd/next';
import { DatePicker2 } from '@alifd/next';
import { Typography } from '@alifd/next';


let realtime = [];
let average = [];
let barOption;
let group = 'All';
let num = '10';

const url = 'http://localhost:3001/api/computing';
function fetchdata() {
  const request = axios.get(`${url}/${group}/${num}`);
  const dataPromise = request.then((response) => response.data);
  dataPromise.then(data => {
    for (let i = 0, len = data.results.length; i < len; i++) {
      realtime.push(Number(data.results[i].total_15m.value));
      average.push(Number(data.results[i].total_1h.value));
    }
    console.log(data.results);
  });
  return realtime;
}

class ComputingChart extends React.Component {
  state = {
    realtime: fetchdata(),
    average: average,
  };

  initChart() {
    let myChart = echarts.init(document.getElementById('main01'));
    barOption = {
      title: {
        text: '动态数据',

      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            backgroundColor: '#283b56'
          },
        },
      },
      legend: {
        data: ['实时算力', '平均算力']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: (function () {
            var now = new Date();
            var res = [];
            var len = 10;
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
              now = new Date(now - 2000);
            }
            return res;
          })(),
        },

      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '实时算力',
          boundaryGap: [0.2, 0.2],
        },
        {
          type: 'value',
          scale: true,
          name: '平均算力',
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: '实时算力',
          type: 'bar',
          stack: 'realtime',
          barWidth: 15,
          data: realtime, /* (function () {
            var res = [];
            var len = 10;
            while (len--) {
              res.push(Math.round(Math.random() * 1000));
            }
            return res;
          })(), */
        },
        {
          name: '平均算力',
          type: 'bar',
          stack: 'average',
          barWidth: 15,
          data: average, /* (function () {
            var res = [];
            var len = 0;
            while (len < 10) {
              res.push((Math.random() * 10 + 5).toFixed(1) - 0);
              len++;
            }
            return res;
          })() */
        },
      ],
    };
    myChart.setOption(barOption);

  }
  componentDidMount() {
    var count = 11;
    this.timer = setInterval(() => {
      var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

      /* var data0 = barOption.series[0].data;
      var data1 = barOption.series[1].data;
      data0.shift();
      data0.push(Math.round(Math.random() * 1000));
      data1.shift();
      data1.push((Math.random() * 10 + 5).toFixed(1) - 0); */
      this.setState({
        realtime: fetchdata(),
        average: average,
      });

      barOption.xAxis[0].data.shift();
      barOption.xAxis[0].data.push(axisData);

      this.initChart();
      

      for (var i = 0; i < num; i++) {
        realtime.shift();
        average.shift();
      }

    }, 15000);

    this.initChart();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div id="main01" style={{ width: 1000, height: 400 }}></div>
    );
  }
}

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


function Charts() {
  return (
    <div>
      <Row>
        <Col><ComputingChart /></Col>
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

            <Select onChange={onChangenum} defaultValue="10" hasClear style={{ marginRight: 8 }}>
              <Option value="5">5</Option>
              <Option value="10">10</Option>
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
}

export default Charts;
