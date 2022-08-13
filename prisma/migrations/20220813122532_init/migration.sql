-- CreateTable
CREATE TABLE "user_locations" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "location_id" INT8 NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "user_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "lat" FLOAT8 NOT NULL,
    "long" FLOAT8 NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_locations_date" ON "user_locations"("date");

-- CreateIndex
CREATE INDEX "user_locations_location_id" ON "user_locations"("location_id");

-- AddForeignKey
ALTER TABLE "user_locations" ADD CONSTRAINT "fk_location" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
