import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import MdxParser from '../components/mdx-parser';

import AsideElement from '../components/aside-element';
import DateStamp from '../components/date-stamp';
import GenericAside from '../components/generic-aside';
import AddReaction from '../components/add-reaction';
import Tag from '../components/tag';
import Seo from '../components/seo';

const Page = ({
  data: {
    mdx: {
      fields: { slug },
      excerpt,
      frontmatter: { type, title, date, publication, tags }
    }
  },
  children
}) => {
  return (
    <Fragment>
      <div className="grid lg:grid-cols-1fr-auto">
        <DateStamp date={date} />
        <small className="leading-6 font-semibold text-secondary">Publication &bull; {publication}</small>
      </div>
      <h1 className="my-12 text-3xl sm:text-5xl">{title}</h1>
      <ul className="list-none m-0 p-0 flex flex-wrap gap-2 mb-12">
        {tags
          ? tags.map((tag, index) => {
              return (
                <li key={index} className="m-0 p-0">
                  <Tag tag={tag} />
                </li>
              );
            })
          : null}
      </ul>
      <MdxParser>{children}</MdxParser>
      <AddReaction title={title} slug={slug} />
      <AsideElement>
        <GenericAside />
      </AsideElement>
    </Fragment>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      fields {
        slug
      }
      excerpt
      frontmatter {
        type
        title
        date(formatString: "MMMM DD, YYYY")
        publication
        tags
      }
    }
  }
`;

export default Page;

export const Head = ({
  data: {
    mdx: {
      fields: { slug },
      excerpt,
      frontmatter: { type, title, tags, featuredImage }
    }
  }
}) => {
  return <Seo type="article" title={title} description={excerpt} slug={slug} image={featuredImage} tags={tags} />;
};
