CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"contact_phone" varchar(20),
	"phone_verified" boolean,
	"email" varchar(256),
	"email_verified" boolean,
	"confirmation_code" varchar(256),
	"password" varchar(256),
	"created_at" varchar(256)
);
