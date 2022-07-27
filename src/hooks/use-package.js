import { useStaticQuery, graphql } from 'gatsby';

export const usePackage = () => {
  const { packageJson } = useStaticQuery(graphql`
    {
      packageJson {
        dependencies {
          gatsby
        }
      }
    }
  `);

  return packageJson;
};
