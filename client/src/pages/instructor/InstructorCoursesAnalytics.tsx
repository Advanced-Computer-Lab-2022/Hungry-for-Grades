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

type AnalyticData = {
  title: string;
  Earnings: number;
  Trainees: number;
};

type CourseAnalyticsProps = {
  data: AnalyticData[];
};
function tickFormatter(value: string) {
  const limit = 10; // put your maximum character
  if (value.length < limit) return value;
  return `${value.substring(0, limit)}...`;
}

export default function InstructorCoursesAnalytics(
  props: CourseAnalyticsProps | undefined
) {
  console.log(props?.data);
  return (
    <div>
      <ResponsiveContainer height={300} width='100%'>
        <LineChart data={props?.data} height={700} width={1020}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='title' stroke='#111' tickFormatter={tickFormatter} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            activeDot={{ r: 8 }}
            dataKey='Earnings'
            stroke='#084f09'
            type='monotone'
          />
          <Line dataKey='Trainees' stroke='#a00407' />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer height={300} width='100%'>
        <LineChart data={props?.data} height={700} width={1020}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='title' stroke='#111' tickFormatter={tickFormatter} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            activeDot={{ r: 8 }}
            dataKey='Earnings'
            stroke='#084f09'
            type='monotone'
          />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer height={300} width='100%'>
        <LineChart data={props?.data} height={700} width={1020}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='title' stroke='#111' tickFormatter={tickFormatter} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey='Trainees' stroke='#a00407' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export type { CourseAnalyticsProps, AnalyticData };
