/* eslint-disable react/jsx-key */
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  ResponsiveContainer,
  Bar
} from 'recharts';

import { AnalyticsProps } from '../types';

function tickFormatter(value: string) {
  const limit = 10; // put your maximum character
  if (value.length < limit) return value;
  return `${value.substring(0, limit)}...`;
}

function BarGraph<T>(props: AnalyticsProps<T>) {
  return (
    <div>
      <ResponsiveContainer height={300} width='100%'>
        <BarChart data={props?.data} height={700} width={1020}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='title' stroke='#111' tickFormatter={tickFormatter} />
          <YAxis />
          <Tooltip />
          <Legend />
          {props?.graphs?.map(bar => {
            return <Bar dataKey={bar.name} fill={bar.color} />;
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraph;
