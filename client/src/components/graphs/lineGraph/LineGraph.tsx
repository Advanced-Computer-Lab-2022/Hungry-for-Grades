/* eslint-disable react/jsx-key */
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';

import { AnalyticsProps } from '../types';

function tickFormatter(value: string) {
  const limit = 10; // put your maximum character
  if (value.length < limit) return value;
  return `${value.substring(0, limit)}...`;
}

function LineGraph<T>(props: AnalyticsProps<T>) {
  return (
    <div>
      <ResponsiveContainer height={300} width='100%'>
        <LineChart data={props?.data} height={700} width={1020}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='title' stroke='#111' tickFormatter={tickFormatter} />
          <YAxis />
          <Tooltip />
          <Legend />
          {props?.graphs.map(line => {
            return <Line dataKey={line.name} stroke={line.color} />;
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineGraph;
