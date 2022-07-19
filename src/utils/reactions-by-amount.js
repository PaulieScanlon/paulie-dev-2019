export const reactionsByAmount = (array) => {
  return array
    .filter((item) => {
      if (item.slug !== null) {
        return item;
      }
    })
    .map((item) => {
      const { reaction, date, slug } = item;
      return {
        reaction,
        date,
        slug
      };
    })
    .reduce((rv, x) => {
      (rv[x.reaction] = rv[x.reaction] || []).push(x);
      return rv;
    }, {});
};
