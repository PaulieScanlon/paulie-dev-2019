import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import PostCard from '../components/post-card';

const LatestPosts = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { status: { ne: "draft" }, type: { eq: "post" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
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
  `);

  return (
    <ul className="mt-16 grid gap-8 list-none m-0 mb-8 p-0">
      {nodes.map((node, index) => {
        const {
          slug,
          excerpt,
          timeToRead,
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
            timeToRead={timeToRead}
            date={date}
            dateModified={dateModified}
            excerpt={excerpt}
          />
        );
      })}
    </ul>
  );
};

export default LatestPosts;
