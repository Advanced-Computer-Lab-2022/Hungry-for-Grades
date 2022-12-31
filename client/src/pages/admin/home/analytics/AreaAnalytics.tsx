import AreaGraph from '@/components/graphs/areaGraph/AreaGraph';

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

function AreaAnalytics(props: EarningsAnalytics) {
  console.log(props.data);
  props?.data?.map((data, index) => {
    console.log(`${data}, ${index}`);
  });
  return (
    <AreaGraph<{
      title: string;
      Earnings: number;
    }>
      data={props?.data.map((data, index) => {
        return {
          title: `${Months[index] || ''}`,
          Earnings: data
        };
      })}
      graphs={[{ name: 'Earnings', color: '#084f09' }]}
    />
  );
}
export default AreaAnalytics;
