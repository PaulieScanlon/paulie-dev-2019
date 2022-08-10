import React, { Fragment } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import PostCard from '../components/post-card';
import SiteSearch from './site-search';

const AllPosts = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { status: { ne: "draft" }, type: { eq: "post" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        nodes {
          fields {
            slug
          }
          excerpt(pruneLength: 100)
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
  `);

  return (
    <Fragment>
      <SiteSearch nodes={nodes} />
      <ul className="mt-16 grid gap-8 list-none m-0 mb-8 p-0">
        {nodes.map((node, index) => {
          const {
            fields: { slug },
            excerpt,
            frontmatter: { title, date, dateModified },
            featuredImage: {
              childImageSharp: { thumbnail }
            }
          } = node;

          return (
            <PostCard
              key={index}
              link={slug}
              title={title}
              thumbnail={thumbnail}
              date={date}
              dateModified={dateModified}
              excerpt={excerpt}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};

export default AllPosts;
