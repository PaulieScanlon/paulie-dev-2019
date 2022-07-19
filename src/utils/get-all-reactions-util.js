const faunadb = require('faunadb');
const { reactionsByAmount } = require('./reactions-by-amount');

module.exports.get = async function () {
  const q = faunadb.query;

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY });

  try {
    const response = await client.query(
      // q.Paginate(q.Match(q.Index(`all_reactions_${process.env.NODE_ENV}`)), { size: 1000 })
      q.Paginate(q.Match(q.Index('all_reactions_production')), { size: 1000 })
    );

    const result = response.data.map(([ref, slug, reaction, date]) => ({
      ref: ref.id,
      slug,
      reaction,
      date
    }));

    return {
      message: 'all reactions',
      reactions: reactionsByAmount(result)
    };
  } catch (error) {
    return { message: error.message };
  }
};
