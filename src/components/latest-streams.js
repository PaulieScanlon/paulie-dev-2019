import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import StreamCard from '../components/stream-card';

const LatestStreams = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { status: { ne: "draft" }, type: { eq: "stream" } } }
        sort: { frontmatter: { date: DESC } }
        limit: 3
      ) {
        nodes {
          fields {
            slug
          }
          excerpt(pruneLength: 100)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
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
            fields: { slug },
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
      <div className="flex justify-center">
        <Link to="/streams" className="flex gap-2 items-center no-underline">
          More Streams{' '}
          <span role="img" aria-label="film projector">
            📽️
          </span>
        </Link>
      </div>
    </section>
  );
};

export default LatestStreams;
