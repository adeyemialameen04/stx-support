ALTER TABLE "support-transaction" ALTER COLUMN "is_private" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "support-transaction" ALTER COLUMN "is_private" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "support-transaction" DROP COLUMN IF EXISTS "id";