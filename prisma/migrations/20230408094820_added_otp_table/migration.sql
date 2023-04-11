-- CreateTable
CREATE TABLE "OTPs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" TEXT,
    "otp" TEXT,

    CONSTRAINT "OTPs_pkey" PRIMARY KEY ("id")
);
