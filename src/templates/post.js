import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import MdxParser from '../components/mdx-parser';
import AsideElement from '../components/aside-element';
import DateTimeToRead from '../components/date-time-to-read';
import GenericAside from '../components/generic-aside';
import Seo from '../components/seo';

const Page = ({
  data: {
    mdx: {
      slug,
      excerpt,
      timeToRead,
      frontmatter: { type, title, date, dateModified, author, tags, featuredImage },
      embeddedImages,
      body
    }
  }
}) => {
  console.log('featuredImage: ', featuredImage);
  return (
    <Fragment>
      <Seo
        type="article"
        title={title}
        description={excerpt}
        slug={`${type}s/${slug}`}
        image={featuredImage}
        tags={tags}
      />
      <div className="grid lg:grid-cols-1fr-auto">
        <DateTimeToRead date={dateModified ? dateModified : date} timeToRead={timeToRead} />
        <small className="leading-6 font-semibold text-secondary">Author &bull; {author}</small>
      </div>
      <h1 className="my-12">{title}</h1>
      <MdxParser embedded={embeddedImages}>{body}</MdxParser>
      <AsideElement>
        <GenericAside />
      </AsideElement>
    </Fragment>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      slug
      excerpt
      timeToRead
      frontmatter {
        type
        title
        date
        dateModified
        author
        tags
        featuredImage
      }
      embeddedImages {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      body
    }
  }
`;

export default Page;
