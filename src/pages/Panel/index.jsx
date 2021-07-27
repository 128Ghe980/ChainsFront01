import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import AliveObserver from './componets/AliveObserver';
import MyTimer from './componets/Timer';
import CacheTimer from './componets/CacheTimer';

const { Cell } = ResponsiveGrid;


const Panel = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <h2 align="center">观察者活跃数据</h2>
        <br />
        <AliveObserver />
        {/* <MyTimer />
        <CacheTimer /> */}
      </Cell>
    </ResponsiveGrid>
  );
};

export default Panel;
