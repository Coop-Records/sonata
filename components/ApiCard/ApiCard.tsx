'use client';

const ApiCard = ({ title, endpoints }: any) => (
  <div className="bg-grey-light p-4 py-8 sm:p-8 mx-auto">
    <h1 className="font-display text-2xl font-bold text-black pb-4">{title}</h1>
    <ul className="min-h-max mt-4 list-inside list-none text-black space-y-6 overflow-x-auto whitespace-nowrap">
      {endpoints.map((endpoint: any, index: any) => (
        <li className="min-w-full" key={index}>
          {endpoint.method && (
            <span className="inline-flex justify-center bg-[#6b7280] px-4 py-2 text-base font-semibold text-slate-900 mr-2">
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
