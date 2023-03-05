import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import HobbyCard from './hobby-card';

const AllHobbies = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { status: { ne: "draft" }, type: { eq: "hobby" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          fields {
            slug
          }
          excerpt(pruneLength: 100)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            category
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
          fields: { slug },
          excerpt,
          frontmatter: { title, date, category },
          logo: {
            childImageSharp: { logo }
          }
        } = node;

        return (
          <HobbyCard key={index} link={slug} title={title} logo={logo} category={category} date={date} excerpt={excerpt} />
        );
      })}
    </ul>
  );
};

export default AllHobbies;
