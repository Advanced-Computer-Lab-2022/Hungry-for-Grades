/* eslint-disable sonarjs/no-duplicate-string */
import BarGraph from '@/components/graphs/barGraph/BarGraph';

type AnalyticData = {
  title: string;
  'Enrolled Trainees': number;
  'Average Rating': number;
};

type CourseAnalyticsProps = {
  data: AnalyticData[];
};

export default function LineAnalytics(props: CourseAnalyticsProps) {
  return (
    <>
      <BarGraph<{
        title: string;
        'Enrolled Trainees': number;
        'Average Rating': number;
      }>
        data={props?.data}
        graphs={[
          { name: 'Enrolled Trainees', color: '#084f09' },
          { name: 'Average Rating', color: '#a00407' }
        ]}
      />
      <BarGraph<{
        title: string;
        'Enrolled Trainees': number;
      }>
        data={props?.data.map(data => {
          return {
            title: data.title,
            'Enrolled Trainees': data['Enrolled Trainees']
          };
        })}
        graphs={[{ name:'Enrolled Trainees', color: '#084f09' }]}
      />
      <BarGraph<{
        title: string;
        'Average Rating': number;
      }>
        data={props?.data.map(data => {
          return {
            title: data.title,
            'Average Rating': data['Average Rating']
          };
        })}
        graphs={[{ name: 'Average Rating', color: '#a00407' }]}
      />
    </>
  );
}

export type { CourseAnalyticsProps, AnalyticData };
