import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import MdxParser from '../components/mdx-parser';
import AsideElement from '../components/aside/aside-element';
import DateStamp from '../components/date-stamp';
import FeaturedImageAside from '../components/aside/featured-image-aside';
import AddReaction from '../components/add-reaction';
import UtterancesObserver from '../components/utterances-observer';
import Tag from '../components/tag';
import Seo from '../components/seo';
import TableOfContents from '../components/aside/table-of-contents';
import WebmentionAside from '../components/aside/webmention-aside';

const Page = ({
  data: {
    mdx: {
      fields: { slug },
      excerpt,
      frontmatter: { type, title, date, dateModified, author, tags },
      featuredImage: {
        childImageSharp: { thumbnail }
      },
      embeddedImages,
      tableOfContents: { items: toc },
      body
    },
    site: {
      siteMetadata: { siteUrl }
    }
  }
}) => {
  return (
    <Fragment>
      <div className="grid lg:grid-cols-1fr-auto">
        <DateStamp date={dateModified ? dateModified : date} />
        <small className="leading-6 font-semibold text-secondary">Author &bull; {author}</small>
      </div>
      <h1 className="my-12 text-3xl sm:text-5xl">{title}</h1>
      <ul className="list-none m-0 p-0 flex flex-wrap gap-2 mb-12">
        {tags
          ? tags.map((tag, index) => {
              return (
                <li key={index} className="m-0 p-0">
                  <Tag tag={tag} />
                </li>
              );
            })
          : null}
      </ul>
      <MdxParser embedded={embeddedImages}>{body}</MdxParser>
      <AddReaction title={title} slug={slug} />
      <UtterancesObserver />
      <AsideElement>
        <FeaturedImageAside alt={title} thumbnail={thumbnail} shareText={`${title}\n ${siteUrl}${slug}`} />
        {toc ? (
          <div className="px-6">
            <h5 className="mb-3 text-lg leading-6 font-semibold uppercase text-secondary">On this page</h5>
            <TableOfContents slug={slug} items={toc} />
          </div>
        ) : null}
        <WebmentionAside target={`https://worldwildweb.dev${slug}`} />
      </AsideElement>
    </Fragment>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      fields {
        slug
      }
      excerpt
      frontmatter {
        type
        title
        date(formatString: "MMMM DD, YYYY")
        dateModified(formatString: "MMMM DD, YYYY")
        author
        tags
      }
      featuredImage {
        childImageSharp {
          thumbnail: gatsbyImageData(width: 240)
          og: gatsbyImageData(width: 1200)
        }
      }
      embeddedImages {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      tableOfContents
      body
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export default Page;

export const Head = ({
  data: {
    mdx: {
      fields: { slug },
      excerpt,
      frontmatter: { type, title, tags },
      featuredImage: {
        childImageSharp: { og }
      }
    }
  }
}) => {
  return (
    <Seo type="article" title={title} description={excerpt} slug={slug} image={og.images.fallback.src} tags={tags} />
  );
};
