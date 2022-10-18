import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import ArticleCard from '../components/article-card';

const LatestArticles = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { status: { ne: "draft" }, type: { eq: "article" } } }
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
    <section>
      <h2 className="m-0 text-2xl uppercase text-salmon">Latest Articles</h2>
      <p className="mt-0 mb-8 text-slate-300 text-base">
        Here's the latest articles I've written that have been published elsewhere.
      </p>
      <ul className="grid gap-8 list-none m-0 mb-8 p-0">
        {nodes.map((node, index) => {
          const {
            fields: { slug },
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
      <div className="flex justify-center">
        <Link to="/articles" className="flex gap-2 items-center no-underline">
          More Articles{' '}
          <span role="img" aria-label="file folder">
            📁
          </span>
        </Link>
      </div>
    </section>
  );
};

export default LatestArticles;
