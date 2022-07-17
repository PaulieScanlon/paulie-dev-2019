import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import ArticleCard from '../components/article-card';

const LatestArticles = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { type: { eq: "article" } } }, sort: { order: DESC, fields: slug }) {
        nodes {
          slug
          excerpt(pruneLength: 100)
          timeToRead
          frontmatter {
            title
            date
            publication
          }
          logo {
            childImageSharp {
              logo: gatsbyImageData(width: 24, quality: 100)
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
          frontmatter: { title, date, publication },
          logo: {
            childImageSharp: { logo }
          }
        } = node;

        return (
          <ArticleCard
            key={index}
            link={slug}
            title={title}
            logo={logo}
            publication={publication}
            date={date}
            excerpt={excerpt}
          />
        );
      })}
    </ul>
  );
};

export default LatestArticles;
