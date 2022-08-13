const { PrismaClient, Decimal } = require('@prisma/client');
import { formatDatestamp } from '../utils/format-date-stamp';

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

    res.status(200).json({
      message: 'A ok!',
      data: {
        lat: response.lat,
        long: response.long,
        date: formatDatestamp(response.date)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    prisma.$disconnect();
  }
}
