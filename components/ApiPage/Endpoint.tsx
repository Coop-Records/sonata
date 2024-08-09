import { Button } from '../ui/button';

const Endpoint = ({ endpoint }: any) => (
  <div className="flex w-3/4 flex-col items-start justify-start rounded-lg bg-gray-200 p-8 shadow md:w-1/2">
    <div className="flex flex-col">
      <div className="font-bold">{endpoint.apiType}</div>
      <div className="text-xs">{endpoint.route}</div>
    </div>
    <div className="flex items-center gap-3">
      <Button
        onClick={() => {
          console.log('SWEETS endpoint', endpoint);
          window.open(endpoint.demo || endpoint.route);
        }}
      >
        Try it
      </Button>
      {endpoint.score && <div className="text-xs">{endpoint.score} points</div>}
    </div>
  </div>
);

export default Endpoint;
