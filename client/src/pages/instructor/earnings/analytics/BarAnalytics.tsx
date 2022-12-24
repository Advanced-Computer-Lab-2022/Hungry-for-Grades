import BarGraph from '@/components/graphs/barGraph/BarGraph';

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
