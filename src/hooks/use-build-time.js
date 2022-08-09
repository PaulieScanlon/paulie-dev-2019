import { useStaticQuery, graphql } from 'gatsby';
import { formatDatestamp } from '../utils/format-date-stamp';

export const useBuildTime = () => {
  const {
    site: { buildTime }
  } = useStaticQuery(graphql`
    {
      site {
        buildTime
      }
    }
  `);

  return formatDatestamp(buildTime, true);
};
