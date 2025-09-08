-- CreateEnum
CREATE TYPE "TicketsTypes" AS ENUM ('VIP', 'REGULAR', 'EARLY_BUYERS');

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "type" "TicketsTypes" NOT NULL DEFAULT 'REGULAR',
    "availableQty" INTEGER NOT NULL,
    "perTicketPrice" DOUBLE PRECISION NOT NULL,
    "salesStart" TIMESTAMP(3) NOT NULL,
    "salesEnd" TIMESTAMP(3) NOT NULL,
    "sold" INTEGER NOT NULL DEFAULT 0,
    "paymentMethod" TEXT NOT NULL,
    "icon" JSONB,
    "discount" JSONB,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
