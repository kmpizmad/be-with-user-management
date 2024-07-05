-- AlterTable
ALTER TABLE "users" ALTER COLUMN "last_login" DROP NOT NULL,
ALTER COLUMN "last_login" DROP DEFAULT;
