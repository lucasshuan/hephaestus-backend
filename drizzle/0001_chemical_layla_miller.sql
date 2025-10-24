CREATE TYPE "public"."source_trust_levels" AS ENUM('official', 'verified', 'community', 'unverified');--> statement-breakpoint
CREATE TYPE "public"."source_vendor_types" AS ENUM('retailer', 'marketplace', 'manufacturer', 'distributor', 'aggregator');--> statement-breakpoint
ALTER TYPE "public"."component_tiers" ADD VALUE 'budget' BEFORE 'entry';--> statement-breakpoint
CREATE TABLE "favorite_component" (
	"id" text PRIMARY KEY NOT NULL,
	"component_id" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "favorite_component" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "source" ADD COLUMN "vendor_type" "source_vendor_types" DEFAULT 'retailer' NOT NULL;--> statement-breakpoint
ALTER TABLE "source" ADD COLUMN "trust_level" "source_trust_levels" DEFAULT 'unverified' NOT NULL;--> statement-breakpoint
ALTER TABLE "favorite_component" ADD CONSTRAINT "fk_fc_component" FOREIGN KEY ("component_id") REFERENCES "public"."component"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_component" ADD CONSTRAINT "fk_fc_user" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;