/*
  Warnings:

  - You are about to drop the column `banner` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "banner",
ADD COLUMN     "bannerDetail" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "followersId" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "socialLinks" SET DEFAULT ARRAY[]::TEXT[];
