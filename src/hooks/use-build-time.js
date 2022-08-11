import { useStaticQuery, graphql } from 'gatsby';

export const useBuildTime = () => {
  const {
    site: { buildTime }
  } = useStaticQuery(graphql`
    {
      site {
        buildTime(formatString: "MMMM DD, YYYY @HH:MM:SS")
      }
    }
  `);

  return buildTime;
};
