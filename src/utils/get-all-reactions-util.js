const faunadb = require('faunadb');
const { groupBy } = require('./group-by');

module.exports.get = async function () {
  const q = faunadb.query;

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY });

  try {
    const response = await client.query(
      q.Paginate(q.Match(q.Index(`all_reactions_${process.env.NODE_ENV}`)), { size: 1000 })
      // q.Paginate(q.Match(q.Index('all_reactions_production')), { size: 1000 })
    );

    const result = response.data.map(([ref, slug, reaction, date]) => ({
      ref: ref.id,
      slug,
      reaction,
      date
    }));

    const format = (array) => {
      return result
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
        });
    };

    const formatted = format(result);

    const byReaction = groupBy(formatted, 'reaction');

    const grouped = Object.keys(byReaction)
      .filter((key) => key !== null)
      .map((key) => {
        const bySlug = groupBy(byReaction[key], 'slug');

        return {
          title: key,
          total: byReaction[key].length,
          posts: bySlug
        };
      });

    return {
      message: 'all reactions',
      data: grouped
    };
  } catch (error) {
    return { message: error.message };
  }
};
