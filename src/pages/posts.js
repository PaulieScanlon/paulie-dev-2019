import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import Seo from '../components/seo';
import SsrPageLayout from '../components/ssr-page-layout';
import PostCard from '../components/post-card';
import AsideElement from '../components/aside-element';
import GenericAside from '../components/generic-aside';

const Page = ({
  data: {
    allPagesJson: { nodes },
    allMdx: { nodes: posts }
  }
}) => {
  const { slug, title, body } = nodes[0];

  return (
    <Fragment>
      <Seo title={title} description={title} slug={slug} />
      <SsrPageLayout slug={slug} title={title} body={body} />
      <ul className="mt-16 grid gap-8 list-none m-0 mb-8 p-0">
        {posts.map((post, index) => {
          const {
            slug,
            excerpt,
            timeToRead,
            frontmatter: { title, date, dateModified },
            featuredImage: {
              childImageSharp: { thumbnail }
            }
          } = post;

          return (
            <PostCard
              key={index}
              link={slug}
              title={title}
              thumbnail={thumbnail}
              timeToRead={timeToRead}
              date={date}
              dateModified={dateModified}
              excerpt={excerpt}
            />
          );
        })}
      </ul>
      <AsideElement>
        <GenericAside />
      </AsideElement>
    </Fragment>
  );
};

export const query = graphql`
  query {
    allPagesJson(filter: { slug: { eq: "posts" } }) {
      nodes {
        slug
        title
        body
      }
    }
    allMdx(filter: { frontmatter: { type: { eq: "post" } } }, sort: { order: DESC, fields: slug }) {
      nodes {
        slug
        excerpt(pruneLength: 100)
        timeToRead
        frontmatter {
          title
          date
          dateModified
        }
        featuredImage {
          childImageSharp {
            thumbnail: gatsbyImageData(width: 180)
          }
        }
      }
    }
  }
`;

export default Page;
