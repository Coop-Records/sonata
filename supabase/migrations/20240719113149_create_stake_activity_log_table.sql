CREATE TABLE IF NOT EXISTS "public"."stake_activity_log" (
    "id" SERIAL PRIMARY KEY,
    "channelId" text,
    "channelAddress" text,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "fid" bigint,
    "amount" numeric
);

CREATE INDEX idx_stake_activity_log_channelId ON "public"."stake_activity_log" ("channelId");
CREATE INDEX idx_stake_activity_log_fid ON "public"."stake_activity_log" ("fid");

ALTER TABLE "public"."stake_activity_log" OWNER TO "postgres";

GRANT SELECT ON TABLE "public"."stake_activity_log" TO "anon";
GRANT ALL ON TABLE "public"."stake_activity_log" TO "authenticated";
GRANT ALL ON TABLE "public"."stake_activity_log" TO "service_role";

ALTER TABLE "public"."stake_activity_log" ENABLE ROW LEVEL SECURITY;