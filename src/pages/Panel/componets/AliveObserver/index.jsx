import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { List, message, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';
import axios from 'axios'

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import { Select } from '@alifd/next';
import { Grid } from '@alifd/next';
import { DatePicker2 } from '@alifd/next';
import { Typography } from '@alifd/next';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const fakeDataUrl02 = 'http://localhost:3001/api/observers/';
const fakeDataUrl03 = 'http://localhost:3001/api/counts';
const fakedata01 = [
  {
    name: {
      title: 'mr',
      finally: 'james',
      last: 'brown',
    },
    gender: 'male',
    email: 'aaa',
  },
  {
    name: {
      title: 'mr',
      finally: 'james2',
      last: 'brown',
    },
    gender: 'male',
    email: 'bbb',
  },
  {
    name: {
      title: 'mr',
      finally: 'james3',
      last: 'brown',
    },
    gender: 'female',
  },
];
const ii = 0;
let group = 'All';


class fetchCount {
  fetchData02() {
    console.log("lengthdata");
    /* reqwest({
      url:fakeDataUrl03,
      method: 'get',
      contentType: 'application/json',
      success:res02 => {
        console.log(res02.count);
        return res02.count;
      }
    }) */
    const request = axios.get(fakeDataUrl03);
    const dataPromise = (request.then(response => response.data));
    return dataPromise;

  }
}

// 此类应是从数据库中获取数据显示

class VirtualizedExample extends React.Component {
  state = {
    data: [],
    loading: false,
  };

  loadedRowsMap = {};

  componentDidMount() {
    console.log("DidMount");
    this.fetchData(res => {
      console.log(res);
      console.log("023");
      this.setState({
        //res.results
        data: res.results,
      });
      console.log(fakedata01);
      //console.log(data.length);
    });
  }

  num01 = 0;

  fetchData = callback => {
    console.log("04");
    //需要更换为axios
    reqwest({
      url: `${fakeDataUrl02}${this.num01}`,
      //type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        console.log("05");
        callback(res);
        console.log("01");
        //console.log(res);

      },
    });
    this.num01 = this.num01 + 5;
    /* axios.get({
        url:fakeDataUrl,
        success: res => {
          callback(res);
          console.log(res.results);
        },
    }) */
    /* const request = axios.get(fakeDataUrl02);
    console.log(request.result); */

  };

  /* fetchData02(){
    console.log("lengthdata");
    //reqwest 和上面的fetchdata有关联

    reqwest({
      url:fakeDataUrl03,
      method: 'get',
      contentType: 'application/json',
      success:res02 => {
        
        console.log(res02.count);
        return res02.count;
      }
    })
    ///
    const request = axios.get(fakeDataUrl03);
    console.log(request.then(response => response.data));
    return request.then(response => response.data);

  } */
  fetchcount = new fetchCount();
  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    console.log("pd");

    /* var i = 0;
    this.fetchcount.fetchData02()
      .then(data => {
        console.log(data.count);
        i = data.count;
      })
      .catch(err => console.log(err))

    console.log("pd2");
    if (data.length > Number(i)) {
      message.warning('Virtualized List loaded all');
      this.setState({
        loading: true,
      });
      return;
    } */

    this.fetchData(res => {
      //res.results
      console.log("03");
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  };

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}

          description={item.date}
          title={<a href="https://ant.design">{item.group}</a>}
        />

        <div>活跃:{item.active}  非活跃:{item.inactive}  失效:{item.dead}</div>
      </List.Item>
    );
  };

  render() {
    const { data } = this.state;
    const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
      <AutoSizer disableHeight>
        {({ width }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width,
          })
        }
      </AutoSizer>
    );
    const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={data.length}
      >
        {({ onRowsRendered }) =>
          autoSize({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
          })
        }
      </InfiniteLoader>
    );
    return (

      <List>
        {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
        {this.state.loading && <Spin className="demo-loading" />}
      </List>
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


const AliveObserver = () => {
  return (
    <Row>
      <Col><VirtualizedExample /></Col>
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
  );
};

export default AliveObserver;