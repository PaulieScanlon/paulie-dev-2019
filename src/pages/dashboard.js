import React, { Fragment } from 'react';

const Page = ({ serverData: { response } }) => {
  return (
    <Fragment>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">dashboard</small>
      <h1>SSR Data Driven Dashboard</h1>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </Fragment>
  );
};

export async function getServerData() {
  const response = await (
    await fetch(
      `${
        process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : 'https://paulie.dev/'
      }/api/get-all-reactions`
    )
  ).json();

  return {
    props: {
      response
    }
  };
}

export default Page;
