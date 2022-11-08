import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import DemoCard from '../components/demo-card';

const LatestDemos = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { status: { ne: "draft" }, type: { eq: "demo" } } }
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
            dateModified(formatString: "MMMM DD, YYYY")
          }
          featuredImage {
            childImageSharp {
              thumbnail: gatsbyImageData(width: 320)
            }
          }
        }
      }
    }
  `);

  return (
    <section>
      <h2 className="m-0 text-2xl uppercase text-salmon">Latest Demos</h2>
      <p className="mt-0 mb-8 text-slate-300 text-base">Here's some bigger projects!</p>
      <ul className="grid gap-8 list-none m-0 mb-8 p-0">
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
            <DemoCard
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
      <div className="flex justify-center">
        <Link to="/demos" className="flex gap-2 items-center no-underline">
          More Demos{' '}
          <span role="img" aria-label="star">
            ⭐
          </span>
        </Link>
      </div>
    </section>
  );
};

export default LatestDemos;
