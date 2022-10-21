const faunadb = require('faunadb');
const { formatDatestamp } = require('./format-date-stamp');

module.exports = async function () {
  const q = faunadb.query;

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY });

  try {
    const response = await client.query(
      q.Paginate(q.Reverse(q.Match(q.Index(`latest_reaction_${process.env.NODE_ENV}`))), {
        size: 1
      })
    );

    const result = response.data.map(([ref, title, slug, reaction, date]) => ({
      ref: ref.id,
      title,
      slug,
      reaction,
      date: formatDatestamp(date)
    }));

    return {
      message: 'Latest Reaction ok!',
      data: result[0]
    };
  } catch (error) {
    return {
      message: error.message
    };
  }
};
