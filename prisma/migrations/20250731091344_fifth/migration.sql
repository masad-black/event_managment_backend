/*
  Warnings:

  - The `bannerDetail` column on the `organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "bannerDetail",
ADD COLUMN     "bannerDetail" JSONB DEFAULT '{}';
