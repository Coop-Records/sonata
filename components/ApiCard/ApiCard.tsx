'use client';

const ApiCard = ({ title, endpoints }: any) => (
  <div className="mx-auto bg-grey-light p-4 py-8 sm:p-8">
    <h1 className="font-display pb-4 text-2xl font-bold text-black">{title}</h1>
    <ul className="mt-4 min-h-max list-inside list-none space-y-6 overflow-x-auto whitespace-nowrap text-black">
      {endpoints.map((endpoint: any, index: any) => (
        <li className="min-w-full" key={index}>
          {endpoint.method && (
            <span className="mr-2 inline-flex justify-center bg-[#6b7280] px-4 py-2 text-base font-semibold text-slate-900">
              {endpoint.method}
            </span>
          )}
          <div className="inline-flex items-center">
            {endpoint.url && <p className="flex text-black">{endpoint.url}</p>}
            <p className="flex text-black">{endpoint.queryParams}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ApiCard;
