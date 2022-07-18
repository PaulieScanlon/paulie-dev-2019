import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import Seo from '../components/seo';
import SsrPageLayout from '../components/ssr-page-layout';
import ArticleCard from '../components/article-card';
import AsideElement from '../components/aside-element';
import GenericAside from '../components/generic-aside';

const Page = ({
  data: {
    allPagesJson: { nodes },
    allMdx: { nodes: articles }
  }
}) => {
  const { slug, title, body } = nodes[0];

  return (
    <Fragment>
      <Seo title={title} description={title} slug={slug} />
      <SsrPageLayout slug={slug} title={title} body={body} />
      <ul className="mt-16 grid gap-8 list-none m-0 mb-8 p-0">
        {articles.map((article, index) => {
          const {
            slug,
            excerpt,
            frontmatter: { title, date, publication },
            logo: {
              childImageSharp: { logo }
            }
          } = article;

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
      <AsideElement>
        <GenericAside />
      </AsideElement>
    </Fragment>
  );
};

export const query = graphql`
  query {
    allPagesJson(filter: { slug: { eq: "articles" } }) {
      nodes {
        slug
        title
        body
      }
    }
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
`;

export default Page;
