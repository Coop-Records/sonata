import ApiPageHeader from './ApiPageHeader';
import Endpoint from './Endpoint';

const ApiPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-100">
    <ApiPageHeader />
    <Endpoint apiType="GET" route="/api/feed" />
    <Endpoint apiType="GET" route="/api/channel/stats" />
  </div>
);

export default ApiPage;
