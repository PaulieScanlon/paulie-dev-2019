export const reactionsByAmount = (array) => {
  const result = array.reduce((items, item) => {
    const { slug, reaction } = item;
    items[slug] = items[slug] || { slug: slug, reactions: [] };
    items[slug].reactions.push(reaction);

    return items;
  }, {});

  return Object.values(result)
    .sort((a, b) => b.reactions.length - a.reactions.length)
    .map((post) => {
      const { slug, reactions } = post;
      return {
        slug,
        reactions: reactions
          .reduce((items, item) => {
            const existingItem = items.find((index) => index.name === item);

            if (existingItem) {
              existingItem.count += 1;
            } else {
              items.push({ name: item, count: 1 });
            }
            return items;
          }, [])
          .sort((a, b) => b.count - a.count)
      };
    });
};
