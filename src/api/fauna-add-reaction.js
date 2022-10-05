const faunadb = require('faunadb');

export default async function handler(req, res) {
  const { title, slug, reaction, date } = JSON.parse(req.body);

  const q = faunadb.query;

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY });

  try {
    await client.query(
      q.Create(q.Collection(`reactions_${process.env.NODE_ENV}`), {
        data: { title: title, slug: slug, reaction: reaction, date: date }
      })
    );

    setTimeout(() => {
      res.status(200).json({ message: 'Lovely stuff, your reaction has been added!' });
    }, 500);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
