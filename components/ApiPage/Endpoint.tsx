import { Button } from '../ui/button';

const Endpoint = ({ endpoint }: any) => (
  <div className="flex w-1/2 flex-col items-start justify-start rounded-lg bg-gray-200 p-8 shadow">
    <div className="flex">
      <div className="font-bold">{endpoint.apiType}</div>
      <div> - {endpoint.route}</div>
    </div>
    <div className="flex items-center gap-3">
      <div>score: {endpoint.score}</div>
      <Button onClick={() => window.open(endpoint.demo || endpoint.route)}>Try it</Button>
    </div>
  </div>
);

export default Endpoint;
