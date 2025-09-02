/*
  Warnings:

  - You are about to drop the column `followedAt` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `followersId` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "followers" DROP COLUMN "followedAt";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "followersId";
