import LineGraph from '@/components/graphs/lineGraph/LineGraph';

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
        data={props?.data.map((data, index) => {
          return {
            title: `Month ${index + 1}`,
            Earnings: data
          };
        })}
        graphs={[{ name: 'Earnings', color: '#084f09' }]}
      />
    </>
  );
}
