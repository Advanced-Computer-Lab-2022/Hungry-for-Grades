import AreaGraph from '@/components/graphs/areaGraph/AreaGraph';

type AnalyticData = {
  title: string;
  Earnings: number;
  Trainees: number;
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
        Trainees: number;
      }>
        data={props?.data}
        graphs={[
          { name: 'Earnings', color: '#084f09' },
          { name: 'Trainees', color: '#a00407' }
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
        Trainees: number;
      }>
        data={props?.data.map(data => {
          return {
            title: data.title,
            Trainees: data.Trainees
          };
        })}
        graphs={[{ name: 'Trainees', color: '#a00407' }]}
      />
    </>
  );
}

export default AreaAnalytics;
