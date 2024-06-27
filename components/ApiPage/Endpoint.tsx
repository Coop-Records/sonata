interface PropTypes {
  apiType: string;
  route: string;
  queryParams?: string[],
};

const Endpoint = ({ apiType, route, queryParams }: PropTypes) => (
  <div className="w-1/2 space-y-4 rounded-lg bg-gray-200 p-8 shadow">
    <div><b className="font-bold">{apiType}</b> - {route}</div>
    {queryParams?.map((query) => (
      <div key={route + query}>
        <b className="font-bold">{apiType}</b> - {route}?{query}
      </div>
    ))}
  </div>
);

export default Endpoint;
