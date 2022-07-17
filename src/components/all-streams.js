import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import StreamCard from '../components/stream-card';

const LatestStreams = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { type: { eq: "stream" } } }, sort: { order: DESC, fields: slug }) {
        nodes {
          slug
          excerpt(pruneLength: 100)
          timeToRead
          frontmatter {
            title
            date
            show
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
          frontmatter: { title, date, show },
          logo: {
            childImageSharp: { logo }
          }
        } = node;

        return (
          <StreamCard key={index} link={slug} title={title} logo={logo} show={show} date={date} excerpt={excerpt} />
        );
      })}
    </ul>
  );
};

export default LatestStreams;