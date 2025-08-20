/*
  Warnings:

  - You are about to drop the column `isActive` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `services` table. All the data in the column will be lost.
  - Added the required column `short_description` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ServiceStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DRAFT');

-- AlterTable - Add new columns first with defaults
ALTER TABLE "public"."services"
ADD COLUMN     "short_description" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "basic_price" DOUBLE PRECISION,
ADD COLUMN     "premium_price" DOUBLE PRECISION,
ADD COLUMN     "enterprise_price" DOUBLE PRECISION,
ADD COLUMN     "popularity" INTEGER DEFAULT 0,
ADD COLUMN     "clients" INTEGER DEFAULT 0,
ADD COLUMN     "rating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "status" "public"."ServiceStatus" NOT NULL DEFAULT 'ACTIVE';

-- Update existing records with default values
UPDATE "public"."services" SET
  "short_description" = SUBSTRING("description", 1, 100),
  "icon" = '🛠️',
  "basic_price" = 5000,
  "premium_price" = 15000,
  "enterprise_price" = 50000,
  "popularity" = 85,
  "clients" = 100,
  "rating" = 4.5
WHERE "short_description" IS NULL;

-- Make short_description NOT NULL after updating
ALTER TABLE "public"."services" ALTER COLUMN "short_description" SET NOT NULL;

-- Drop old columns
ALTER TABLE "public"."services" DROP COLUMN "isActive",
DROP COLUMN "price";
