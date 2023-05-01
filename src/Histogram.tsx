import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface HistogramProps {
  dataGraph: { [key: string]: number };
  heading: string;
}

function Histogram({ dataGraph, heading }: HistogramProps) {
  const data = Object.keys(dataGraph).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: dataGraph[key],
  }));
  return (
    <>
      <h3>{heading}</h3>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </>
  );
}

export default Histogram;
