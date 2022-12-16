/* eslint-disable react/jsx-key */
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import { AnalyticsProps } from '../types';

function AreaGraph<T>({ data, graphs }: AnalyticsProps<T>) {
  return (
    <ResponsiveContainer height={300} width='100%'>
      <AreaChart
        data={data}
        height={400}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
        width={500}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='title' />
        <YAxis />
        <Tooltip />
        {graphs.map(area => {
          return (
            <Area
              dataKey={area.name}
              fill={area.color}
              stroke={area.color}
              type='monotone'
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaGraph;
