import BarGraph from '@/components/graphs/barGraph/BarGraph';

type AnalyticData = {
  title: string;
  Earnings: number;
  Trainees: number;
};

type CourseAnalyticsProps = {
  data: AnalyticData[];
};

export default function LineAnalytics(props: CourseAnalyticsProps) {
  return (
    <>
      <BarGraph<{
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
      <BarGraph<{
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
      <BarGraph<{
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

export type { CourseAnalyticsProps, AnalyticData };
