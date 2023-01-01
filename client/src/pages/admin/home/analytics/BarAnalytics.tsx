import BarGraph from '@/components/graphs/barGraph/BarGraph';

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
      <BarGraph<{
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
