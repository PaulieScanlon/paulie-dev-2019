import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import StreamCard from '../components/stream-card';

const LatestStreams = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { type: { eq: "stream" } } }, sort: { order: DESC, fields: slug }, limit: 3) {
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
    <section>
      <h2 className="m-0 text-2xl uppercase text-salmon">Latest Streams</h2>
      <p className="mt-0 mb-8 text-slate-300 text-base">
        I prefer to write, but occasionally you'll catch me on stream.
      </p>
      <ul className="grid gap-8 list-none m-0 mb-8 p-0">
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
            <StreamCard
              key={index}
              link={`streams/${slug}`}
              title={title}
              logo={logo}
              show={show}
              date={date}
              excerpt={excerpt}
            />
          );
        })}
      </ul>
      <div className="flex justify-center">
        <Link to="/articles" className="flex gap-2 items-center no-underline">
          More Streams{' '}
          <span role="img" aria-label="television">
            📺
          </span>
        </Link>
      </div>
    </section>
  );
};

export default LatestStreams;
