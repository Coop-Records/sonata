'use client';

import ApiPageHeader from './ApiPageHeader';
import Endpoint from './Endpoint';
import useEndpointScores from '@/hooks/useEndpointScores';

const ApiPage = () => {
  const { endpoints } = useEndpointScores();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-100">
      <ApiPageHeader />
      {endpoints.map((endpoint, index) => (
        <Endpoint key={index} endpoint={endpoint} />
      ))}
    </div>
  );
};

export default ApiPage;
