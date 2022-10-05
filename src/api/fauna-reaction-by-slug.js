const faunadb = require('faunadb');

export default async function handler(req, res) {
  const { slug } = JSON.parse(req.body);

  const q = faunadb.query;

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY });

  try {
    const response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index(`reactions_by_slug_${process.env.NODE_ENV}`), `${slug}`)),
        q.Lambda(['ref', 'slug', 'reaction', 'date'], q.Get(q.Var('ref')))
      )
    );

    const count_reactions = response.data.reduce((items, item) => {
      items[item.data.reaction] = items[item.data.reaction] || { count: 0 };

      if (items[item.data.reaction]) {
        items[item.data.reaction].count++;
      }

      return items;
    }, {});

    res.status(200).json({ message: `Reactions for ${slug}`, reactions: count_reactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
