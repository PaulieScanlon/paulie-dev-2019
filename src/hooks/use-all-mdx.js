import { useStaticQuery, graphql } from 'gatsby';

export const useAllMdx = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: { status: { ne: "draft" }, type: { in: ["post", "article", "demo", "stream", "opensource"] } }
        }
        sort: { order: DESC, fields: frontmatter___date }
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
