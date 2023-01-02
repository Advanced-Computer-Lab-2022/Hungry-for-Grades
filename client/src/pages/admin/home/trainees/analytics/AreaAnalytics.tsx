/* eslint-disable sonarjs/no-duplicate-string */
import AreaGraph from '@/components/graphs/areaGraph/AreaGraph';

type AnalyticData = {
  title: string;
  'Enrolled Trainees': number;
  'Average Rating': number;
};

type CourseAnalyticsProps = {
  data: AnalyticData[];
};

function AreaAnalytics(props: CourseAnalyticsProps) {
  return (
    <>
      <AreaGraph<{
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
      <AreaGraph<{
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
      <AreaGraph<{
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

export default AreaAnalytics;
