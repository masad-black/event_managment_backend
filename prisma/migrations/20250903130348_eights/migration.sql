/*
  Warnings:

  - You are about to drop the column `icon` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticketDetails` on the `events` table. All the data in the column will be lost.
  - The `coverImages` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "icon";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "ticketDetails",
DROP COLUMN "coverImages",
ADD COLUMN     "coverImages" JSONB[] DEFAULT ARRAY[]::JSONB[];
