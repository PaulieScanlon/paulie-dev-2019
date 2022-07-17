import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import MdxParser from '../components/mdx-parser';
import AsideElement from '../components/aside-element';
import DateTimeToRead from '../components/date-time-to-read';
import GenericAside from '../components/generic-aside';

import Seo from '../components/seo';

const Page = ({
  data: {
    mdx: {
      slug,
      excerpt,
      timeToRead,
      frontmatter: { type, title, date, publication },
      body
    }
  }
}) => {
  return (
    <Fragment>
      <Seo title={title} description={excerpt} slug={slug} />
      <div className="grid lg:grid-cols-1fr-auto">
        <DateTimeToRead date={date} />
        <small className="leading-6 font-semibold text-secondary">Publication &bull; {publication}</small>
      </div>
      <h1 className="my-12">{title}</h1>
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
      timeToRead
      frontmatter {
        type
        title
        date
        publication
      }
      body
    }
  }
`;

export default Page;
