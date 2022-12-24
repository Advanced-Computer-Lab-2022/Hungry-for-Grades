import AreaGraph from '@/components/graphs/areaGraph/AreaGraph';

type EarningsAnalytics = {
  data: number[];
};

export function AreaAnalytics(props: EarningsAnalytics) {
  console.log(props.data);
  props?.data.map((data, index) => {
    console.log(`${data}, ${index}`);
  });
  return (
    <AreaGraph<{
      title: string;
      Earnings: number;
    }>
      data={props?.data.map((data, index) => {
        return {
          title: `Month ${index + 1}`,
          Earnings: data
        };
      })}
      graphs={[{ name: 'Earnings', color: '#084f09' }]}
    />
  );
}
