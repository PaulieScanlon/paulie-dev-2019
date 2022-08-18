import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const test_location_1 = await prisma.locations.create({
    data: {
      lat: 51.507351,
      long: -0.127758,
      date: new Date()
    }
  });

  console.log({ test_location_1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
