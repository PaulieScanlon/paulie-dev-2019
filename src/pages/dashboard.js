import React, { Fragment, useState, useEffect } from 'react';
import { graphql } from 'gatsby';

import Loading from '../components/loading';
import AsideElement from '../components/aside-element';
import Seo from '../components/seo';
import GenericAside from '../components/generic-aside';

const Page = ({
  data,
  data: {
    pagesJson: {
      slug,
      excerpt,
      frontmatter: { type, title },
      body
    }
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

  return (
    <Fragment>
      <Seo title={title} description={excerpt} slug={slug} />
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">dashboard</small>
      <h1>{excerpt}</h1>
      <p>{body}</p>

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

      <AsideElement>
        <GenericAside />
      </AsideElement>
    </Fragment>
  );
};

export const query = graphql`
  query ($id: String) {
    pagesJson(id: { eq: $id }) {
      slug
      excerpt
      frontmatter {
        title
      }
      body
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
