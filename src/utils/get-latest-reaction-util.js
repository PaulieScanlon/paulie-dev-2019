const faunadb = require('faunadb');

module.exports.get = async function () {
  const q = faunadb.query;

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY });

  try {
    const response = await client.query(
      q.Paginate(q.Reverse(q.Match(q.Index(`latest_reaction_${process.env.NODE_ENV}`))), {
        size: 1
      })
      // q.Paginate(q.Reverse(q.Match(q.Index('latest_reaction_production'))), {
      //   size: 1
      // })
    );

    const result = response.data.map(([ref, title, slug, reaction, date]) => ({
      ref: ref.id,
      title,
      slug,
      reaction,
      date
    }));

    return {
      message: 'A ok',
      data: result[0]
    };
  } catch (error) {
    return {
      message: error.message
    };
  }
};
