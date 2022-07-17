import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import MdxParser from '../components/mdx-parser';
import AsideElement from '../components/aside-element';
import Seo from '../components/seo';
import GenericAside from '../components/generic-aside';

const Page = ({
  data: {
    mdx: {
      slug,
      excerpt,
      frontmatter: { type, title },
      body
    }
  }
}) => {
  return (
    <Fragment>
      <Seo title={title} description={excerpt} slug={slug} />
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">{title}</small>
      <MdxParser>{body}</MdxParser>
      <AsideElement>
        <GenericAside />
      </AsideElement>
    </Fragment>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      slug
      excerpt
      frontmatter {
        type
        title
      }
      body
    }
  }
`;

export default Page;
