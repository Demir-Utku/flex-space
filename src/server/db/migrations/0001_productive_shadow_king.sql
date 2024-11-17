CREATE TABLE IF NOT EXISTS "pavotra_bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"solution_type" integer NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(100) NOT NULL,
	"location" varchar(100) NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"company_name" varchar(100),
	"employee_count" integer
);
