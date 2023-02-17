import { useStaticQuery, graphql } from 'gatsby';

export const useAllMdx = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: { status: { ne: "draft" }, type: { in: ["blog", "project", "hobby"] } }
        }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  `);

  return nodes;
};
