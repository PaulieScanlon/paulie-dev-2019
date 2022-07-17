import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import MdxParser from '../components/mdx-parser';
import AsideElement from '../components/aside-element';
import DateTimeToRead from '../components/date-time-to-read';
import GenericAside from '../components/generic-aside';
import Tag from '../components/tag';
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
      <ul className="list-none m-0 p-0 flex flex-wrap gap-2 mb-12">
        {tags
          ? tags.map((tag, index) => {
              return (
                <li className="m-0 p-0">
                  <Tag tag={tag} />
                </li>
              );
            })
          : null}
      </ul>
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
