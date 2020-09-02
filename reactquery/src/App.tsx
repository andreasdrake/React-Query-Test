import React, { useState } from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import { useQuery } from "react-query";

export const App = () => {
  return (
    <>
      <Exchange />
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </>
  );
};

const fetchExchange = async (currency: string): Promise<any> => {
  const response = await fetch(
    `http://api.ratesapi.io/api/latest?base=${currency}`
  );
  const data = await response.json();
  return data;
};

export const Exchange = () => {
  const [currency, setCurrency] = useState<string>("USD");
  const { status, data, error } = useQuery(currency, fetchExchange, {
    cacheTime: 20000,
  });

  if (status === "loading") {
    return <div>loading...</div>;
  }
  if (status === "error") {
    return <div>error! {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <button onClick={() => setCurrency("CAD")}>CAD</button>
      <button onClick={() => setCurrency("EUR")}>EUR</button>
      <button onClick={() => setCurrency("USD")}>USD</button>
      <h1>Showing Currency: {currency}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
