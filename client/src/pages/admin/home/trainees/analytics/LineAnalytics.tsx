/* eslint-disable sonarjs/no-duplicate-string */
import LineGraph from '@/components/graphs/lineGraph/LineGraph';

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
      <LineGraph<{
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
      <LineGraph<{
        title: string;
        'Enrolled Trainees': number;
      }>
        data={props?.data.map(data => {
          return {
            title: data.title,
            'Enrolled Trainees': data['Enrolled Trainees']
          };
        })}
        graphs={[{ name: 'Enrolled Trainees', color: '#084f09' }]}
      />
      <LineGraph<{
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
