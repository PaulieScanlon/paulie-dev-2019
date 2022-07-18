import React, { Fragment, useState, useEffect } from 'react';
import { graphql } from 'gatsby';

import Seo from '../components/seo';
import SsrPageLayout from '../components/ssr-page-layout';
import AsideElement from '../components/aside-element';
import GenericAside from '../components/generic-aside';

import Loading from '../components/loading';

const Page = ({
  data,
  data: {
    allPagesJson: { nodes }
  },
  serverData: { serverResponse }
}) => {
  const [isPending, setIsPending] = useState(true);
  const [clientResponse, setClientResponse] = useState(null);

  useEffect(() => {
    const getAllReactions = async () => {
      try {
        const response = await (await fetch('/api/get-all-reactions')).json();
        setIsPending(false);
        setClientResponse(response);
      } catch (error) {
        console.error(error);
      }
    };

    getAllReactions();
  }, []);

  const { slug, title, body } = nodes[0];

  return (
    <Fragment>
      <Seo title={title} description={title} slug={slug} />
      <SsrPageLayout slug={slug} title={title} body={body} />

      {/* temp stuff start */}
      <h2 className="mb-1">SSR Data</h2>
      <div className="h-[400px] overflow-y-scroll">
        <div className="remark-highlight">
          <pre className="language-javascript !m-0">{JSON.stringify(serverResponse, null, 2)}</pre>
        </div>
      </div>

      <h2 className="mb-1">Serverless Function</h2>
      <div className="h-[400px] overflow-y-scroll">
        {isPending ? (
          <Loading />
        ) : (
          <div className="remark-highlight">
            <pre className="language-javascript !m-0">{JSON.stringify(clientResponse, null, 2)}</pre>
          </div>
        )}
      </div>

      <h2 className="mb-1">SSG Data</h2>
      <div className="h-[400px] overflow-y-scroll">
        <div className="remark-highlight">
          <pre className="language-javascript !m-0">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
      {/* temp stuff end */}
      <AsideElement>
        <GenericAside />
      </AsideElement>
    </Fragment>
  );
};

export const query = graphql`
  query {
    allPagesJson(filter: { slug: { eq: "dashboard" } }) {
      nodes {
        slug
        title
        body
      }
    }
  }
`;

export async function getServerData() {
  const allReactionsUtil = require('../utils/get-all-reactions-util');

  return {
    props: {
      serverResponse: await allReactionsUtil.get()
    }
  };
}

export default Page;
