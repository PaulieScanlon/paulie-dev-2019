import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import MdxParser from '../components/mdx-parser';
import AsideElement from '../components/aside-element';
import DateTimeToRead from '../components/date-time-to-read';
import GenericAside from '../components/generic-aside';
import AddReaction from '../components/add-reaction';
import Tag from '../components/tag';
import Seo from '../components/seo';
import TableOfContents from '../components/table-of-contents';

const Page = ({
  data: {
    mdx: {
      slug,
      excerpt,
      timeToRead,
      frontmatter: { type, title, date, dateModified, author, tags, featuredImage },
      embeddedImages,
      body,
      tableOfContents: { items: toc }
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
                <li key={index} className="m-0 p-0">
                  <Tag tag={tag} />
                </li>
              );
            })
          : null}
      </ul>
      <MdxParser embedded={embeddedImages}>{body}</MdxParser>
      <AddReaction title={title} slug={`/posts/${slug}`} />
      <AsideElement>
        <GenericAside />
        {toc ? (
          <div className="px-6">
            <h5 className="mb-3 text-lg leading-6 font-semibold uppercase text-secondary">On this page</h5>
            <TableOfContents items={toc} />
          </div>
        ) : null}
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
      tableOfContents
    }
  }
`;

export default Page;
