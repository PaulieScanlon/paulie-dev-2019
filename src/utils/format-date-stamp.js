// Don't use this on the client, Dates and React 18.0.0 don't play well together, server time and clinet time will be different becauseof the toLocaleString
// https://github.com/vercel/next.js/discussions/39425

export const formatDatestamp = (dateString) => {
  const date = new Date(dateString);

  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getUTCFullYear();
  const time = date.toLocaleTimeString();

  return `${month} ${day}, ${year} ${`@${time}`}`;
};
