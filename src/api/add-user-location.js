import fs from 'fs';
import { PrismaClient } from '@prisma/client';

import { formatDatestamp } from '../utils/format-date-stamp';

// import prismaSchema from 'raw-loader!../../prisma/schema.prisma';

export default async function handler(req, res) {
  const { lat, long, date } = JSON.parse(req.body);

  // if (process.env.GATSBY_CLOUD === 'true') {
  //   console.log('process.env.GATSBY_CLOUD: ', process.env.GATSBY_CLOUD);
  //   fs.writeFileSync('./schema.prisma', prismaSchema);
  // }

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
    res.status(500).json({ message: "Blast! There's been an error.", data: error });
  } finally {
    prisma.$disconnect();
  }
}
