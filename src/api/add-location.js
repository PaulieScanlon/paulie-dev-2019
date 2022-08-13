const { PrismaClient, Decimal } = require('@prisma/client');

export default async function handler(req, res) {
  const { lat, long, date } = JSON.parse(req.body);

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

  try {
    const response = await prisma.locations.create({
      data: {
        lat: parseFloat(lat),
        long: parseFloat(long),
        date: new Date(date)
      }
    });

    console.log(response);

    res.status(200).json({
      message: 'A ok!',
      data: JSON.stringify({
        lat: response.lat,
        long: response.long,
        date: response.date
      })
      // data: JSON.stringify(this, (key, value) => (typeof value === 'bigint' ? value.toString() : value), 2)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    prisma.$disconnect();
  }
}
