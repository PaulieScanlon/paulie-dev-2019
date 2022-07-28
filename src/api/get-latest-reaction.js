const faunadb = require('faunadb');

export default async function handler(req, res) {
  const q = faunadb.query;

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY });

  try {
    const response = await client.query(
      q.Paginate(q.Match(q.Index(`latest_reaction_${process.env.NODE_ENV}`)), { size: 1000 })
      // q.Paginate(q.Match(q.Index('latest_reaction_production')), { size: 1000 })
    );

    const result = response.data.map(([ref, title, slug, reaction, date]) => ({
      ref: ref.id,
      title,
      slug,
      reaction,
      date
    }));

    res.status(200).json({ message: 'A ok', reaction: result.slice(-1).pop() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
