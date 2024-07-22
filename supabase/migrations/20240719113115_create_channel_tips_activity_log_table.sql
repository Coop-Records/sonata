CREATE TABLE IF NOT EXISTS "public"."channel_tips_activity_log" (
    "id" SERIAL PRIMARY KEY,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "sender" text,
    "channelId" text,
    "channelAddress" text,
    "amount" numeric,
    "post_hash" text
);

ALTER TABLE "public"."channel_tips_activity_log" OWNER TO "postgres";

GRANT SELECT ON TABLE "public"."stake_activity_log" TO "anon";
GRANT ALL ON TABLE "public"."stake_activity_log" TO "authenticated";
GRANT ALL ON TABLE "public"."stake_activity_log" TO "service_role";

ALTER TABLE "public"."channel_tips_activity_log" ENABLE ROW LEVEL SECURITY;