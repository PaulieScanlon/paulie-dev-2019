export const stripLeadingSlash = (string) => {
  const newUrl = string.replace(/^\/|\/$/g, '');
  return newUrl;
};
