CREATE TABLE "demo_events" (
	"id" serial PRIMARY KEY,
	"type" text NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
