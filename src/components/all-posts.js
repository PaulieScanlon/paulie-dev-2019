import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import PostCard from '../components/post-card';

const AllPosts = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { status: { ne: "draft" }, type: { eq: "post" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          fields {
            slug
          }
          excerpt(pruneLength: 100)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            dateModified(formatString: "MMMM DD, YYYY")
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
    <ul className="mt-8 grid gap-8 list-none m-0 mb-8 p-0">
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
  );
};

export default AllPosts;
