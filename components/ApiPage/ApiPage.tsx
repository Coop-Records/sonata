import { endpoints } from '@/lib/getEndpointsList';
import ApiPageHeader from './ApiPageHeader';
import Endpoint from './Endpoint';

const ApiPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-100">
    <ApiPageHeader />
    {endpoints.map((endpoint, index) => (
      <Endpoint key={index} apiType={endpoint.apiType} route={endpoint.route} />
    ))}
  </div>
);

export default ApiPage;
