/*
  Warnings:

  - The values [INFO,SUCCESS,WARNING,ERROR] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('NEW_TICKET', 'TICKET_ASSIGNED', 'TICKET_RESOLVED', 'DOCUMENT_UPLOADED', 'AGENT_CREATED', 'AGENT_UPDATED');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "public"."NotificationType_old";
COMMIT;
