import LineGraph from '@/components/graphs/lineGraph/LineGraph';

const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

type EarningsAnalytics = {
  data: number[];
};

export default function LineAnalytics(props: EarningsAnalytics) {
  return (
    <>
      <LineGraph<{
        title: string;
        Earnings: number;
      }>
        data={props?.data?.map((data, index) => {
          return {
            title: `${Months[index] || ''}`,
            Earnings: data
          };
        })}
        graphs={[{ name: 'Earnings', color: '#084f09' }]}
      />
    </>
  );
}
