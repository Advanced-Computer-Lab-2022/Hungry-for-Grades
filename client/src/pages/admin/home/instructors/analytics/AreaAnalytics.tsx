import AreaGraph from '@/components/graphs/areaGraph/AreaGraph';

type AnalyticData = {
  title: string;
  Earnings: number;
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
        Earnings: number;
        'Average Rating': number;
      }>
        data={props?.data}
        graphs={[
          { name: 'Earnings', color: '#084f09' },
          { name: 'Average Rating', color: '#a00407' }
        ]}
      />
      <AreaGraph<{
        title: string;
        Earnings: number;
      }>
        data={props?.data.map(data => {
          return {
            title: data.title,
            Earnings: data.Earnings
          };
        })}
        graphs={[{ name: 'Earnings', color: '#084f09' }]}
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
