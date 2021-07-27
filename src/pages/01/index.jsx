import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import Guide01 from './components/Guide01';
import Charts from '../02/components/Charts';

const { Cell } = ResponsiveGrid;

const newdash = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <Guide01 />
        <Charts />
      </Cell>
    </ResponsiveGrid>
  );
};

export default newdash;