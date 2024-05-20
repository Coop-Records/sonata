
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."tip_result" AS (
	"used_tip" numeric,
	"total_points" numeric
);

ALTER TYPE "public"."tip_result" OWNER TO "postgres";

CREATE TYPE "public"."tip_update_result" AS (
	"remaining_tip_allocation" numeric,
	"total_tip_on_post" numeric,
	"used_tip" numeric
);

ALTER TYPE "public"."tip_update_result" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."allocate_tip"("wallet_address_input" character varying, "tip_amount" numeric, "post_hash_input" character varying) RETURNS "public"."tip_update_result"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    used_tip NUMERIC;
    new_remaining_tip_allocation NUMERIC;
    total_tip_on_post NUMERIC;
BEGIN
    -- Select the current remaining tip allocation for locking and update it in the transaction
    SELECT remaining_tip_allocation INTO new_remaining_tip_allocation FROM tips WHERE wallet_address = wallet_address_input FOR UPDATE;

    -- Determine the actual tip amount to use
    IF tip_amount <= new_remaining_tip_allocation THEN
        used_tip := tip_amount;
    ELSE
        used_tip := new_remaining_tip_allocation;
    END IF;

    -- Update the remaining_tip_allocation in the tips table
    UPDATE tips SET remaining_tip_allocation = new_remaining_tip_allocation - used_tip WHERE wallet_address = wallet_address_input;

    -- Upsert the tip amount into the posts table
    INSERT INTO posts (post_hash, points)
    VALUES (post_hash_input, used_tip)
    ON CONFLICT (post_hash) DO UPDATE
    SET points = posts.points + EXCLUDED.points
    RETURNING points INTO total_tip_on_post;

    -- Return the remaining tip allocation, total tip on post, and used tip
    RETURN ROW(new_remaining_tip_allocation - used_tip, total_tip_on_post, used_tip)::tip_update_result;
END;
$$;

ALTER FUNCTION "public"."allocate_tip"("wallet_address_input" character varying, "tip_amount" numeric, "post_hash_input" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."allocate_tip_with_fid"("tip_amount" numeric, "post_hash_input" character varying) RETURNS "public"."tip_update_result"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    used_tip NUMERIC;
    new_remaining_tip_allocation NUMERIC;
    total_tip_on_post NUMERIC;
BEGIN
    -- Select the current remaining tip allocation for locking and update it in the transaction
    SELECT remaining_tip_allocation INTO new_remaining_tip_allocation FROM tips WHERE fid = fid_input FOR UPDATE;

    -- Determine the actual tip amount to use
    IF tip_amount <= new_remaining_tip_allocation THEN
        used_tip := tip_amount;
    ELSE
        used_tip := new_remaining_tip_allocation;
    END IF;

    -- Update the remaining_tip_allocation in the tips table
    UPDATE tips SET remaining_tip_allocation = new_remaining_tip_allocation - used_tip WHERE fid = fid_input;

    -- Upsert the tip amount into the posts table
    INSERT INTO posts (post_hash, points)
    VALUES (post_hash_input, used_tip)
    ON CONFLICT (post_hash) DO UPDATE
    SET points = posts.points + EXCLUDED.points
    RETURNING points INTO total_tip_on_post;

    -- Return the remaining tip allocation, total tip on post, and used tip
    RETURN ROW(new_remaining_tip_allocation - used_tip, total_tip_on_post, used_tip)::tip_update_result;
END;
$$;

ALTER FUNCTION "public"."allocate_tip_with_fid"("tip_amount" numeric, "post_hash_input" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."allocate_tip_with_fid"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying) RETURNS "public"."tip_update_result"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    used_tip NUMERIC;
    new_remaining_tip_allocation NUMERIC;
    total_tip_on_post NUMERIC;
BEGIN
    -- Select the current remaining tip allocation for locking and update it in the transaction
    SELECT remaining_tip_allocation INTO new_remaining_tip_allocation FROM tips WHERE fid = fid_input FOR UPDATE;

    -- Determine the actual tip amount to use
    IF tip_amount <= new_remaining_tip_allocation THEN
        used_tip := tip_amount;
    ELSE
        used_tip := new_remaining_tip_allocation;
    END IF;

    -- Update the remaining_tip_allocation in the tips table
    UPDATE tips SET remaining_tip_allocation = new_remaining_tip_allocation - used_tip WHERE fid = fid_input;

    -- Upsert the tip amount into the posts table
    INSERT INTO posts (post_hash, points)
    VALUES (post_hash_input, used_tip)
    ON CONFLICT (post_hash) DO UPDATE
    SET points = posts.points + EXCLUDED.points
    RETURNING points INTO total_tip_on_post;

    -- Return the remaining tip allocation, total tip on post, and used tip
    RETURN ROW(new_remaining_tip_allocation - used_tip, total_tip_on_post, used_tip)::tip_update_result;
END;
$$;

ALTER FUNCTION "public"."allocate_tip_with_fid"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."allocate_tip_with_fid"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying, "reciever_fid" character varying) RETURNS "public"."tip_update_result"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    used_tip NUMERIC;
    new_remaining_tip_allocation NUMERIC;
    total_tip_on_post NUMERIC;
BEGIN
    -- Select the current remaining tip allocation for locking and update it in the transaction
    SELECT remaining_tip_allocation INTO new_remaining_tip_allocation FROM tips WHERE fid = fid_input FOR UPDATE;

    -- Determine the actual tip amount to use
    IF tip_amount <= new_remaining_tip_allocation THEN
        used_tip := tip_amount;
    ELSE
        used_tip := new_remaining_tip_allocation;
    END IF;

    -- Update the remaining_tip_allocation in the tips table
    UPDATE tips SET remaining_tip_allocation = new_remaining_tip_allocation - used_tip WHERE fid = fid_input;

    INSERT INTO tips_activity_log (sender, receiver, amount)
    VALUES (fid_input, receiver_fid, used_tip);

    -- Upsert the tip amount into the posts table
    INSERT INTO posts (post_hash, points)
    VALUES (post_hash_input, used_tip)
    ON CONFLICT (post_hash) DO UPDATE
    SET points = posts.points + EXCLUDED.points
    RETURNING points INTO total_tip_on_post;

    -- Return the remaining tip allocation, total tip on post, and used tip
    RETURN ROW(new_remaining_tip_allocation - used_tip, total_tip_on_post, used_tip)::tip_update_result;
END;
$$;

ALTER FUNCTION "public"."allocate_tip_with_fid"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying, "reciever_fid" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."allocate_tip_with_fid_recipient"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying, "receiver_fid" character varying) RETURNS "public"."tip_update_result"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    used_tip NUMERIC;
    new_remaining_tip_allocation NUMERIC;
    total_tip_on_post NUMERIC;
BEGIN
    -- Select the current remaining tip allocation for locking and update it in the transaction
    SELECT remaining_tip_allocation INTO new_remaining_tip_allocation FROM tips WHERE fid = fid_input FOR UPDATE;

    -- Determine the actual tip amount to use
    IF tip_amount <= new_remaining_tip_allocation THEN
        used_tip := tip_amount;
    ELSE
        used_tip := new_remaining_tip_allocation;
    END IF;

    -- Update the remaining_tip_allocation in the tips table
    UPDATE tips SET remaining_tip_allocation = new_remaining_tip_allocation - used_tip WHERE fid = fid_input;

    INSERT INTO tips_activity_log (sender, receiver, amount, post_hash)
    VALUES (fid_input, receiver_fid, used_tip, post_hash_input);

    -- Upsert the tip amount into the posts table
    INSERT INTO posts (post_hash, points)
    VALUES (post_hash_input, used_tip)
    ON CONFLICT (post_hash) DO UPDATE
    SET points = posts.points + EXCLUDED.points
    RETURNING points INTO total_tip_on_post;

    -- Return the remaining tip allocation, total tip on post, and used tip
    RETURN ROW(new_remaining_tip_allocation - used_tip, total_tip_on_post, used_tip)::tip_update_result;
END;
$$;

ALTER FUNCTION "public"."allocate_tip_with_fid_recipient"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying, "receiver_fid" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."degen_tip_post"("tip_amount" numeric, "post_hash_input" character varying) RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    new_degen_amount NUMERIC;  -- Variable to hold the new degen amount
BEGIN

    INSERT INTO posts (post_hash, degen)
    VALUES (post_hash_input, tip_amount)
    ON CONFLICT (post_hash) DO UPDATE
    SET degen = posts.degen + tip_amount
    RETURNING degen INTO new_degen_amount;  -- Capture the updated degen amount

    -- Return the remaining tip allocation, total tip on post, and used tip
    RETURN new_degen_amount;
END;
$$;

ALTER FUNCTION "public"."degen_tip_post"("tip_amount" numeric, "post_hash_input" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."redeem_airdrop"("wallet_address_input" character varying) RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    previous_notes NUMERIC;
BEGIN
    -- Select the current notes for the given wallet_address
    SELECT notes INTO previous_notes FROM airdrop
    WHERE wallet_address ILIKE wallet_address_input;

    -- Check if a record was found
    IF FOUND THEN
        -- Update the notes to 0 where the wallet_address matches
        UPDATE airdrop SET notes = 0
        WHERE wallet_address ILIKE wallet_address_input;
    END IF;

    -- Return the previous notes value
    RETURN previous_notes;
END;
$$;

ALTER FUNCTION "public"."redeem_airdrop"("wallet_address_input" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_daily_tip_allocation"() RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  user_stats RECORD;
BEGIN
  -- Update all rows in the 'tips' table
  UPDATE tips
  SET daily_tip_allocation = ROUND(LOG(10, GREATEST(EXTRACT(EPOCH FROM (NOW() - first_post_date)) / 86400, 1)) * EXP(LOG(3.3, 1000 * ((num_posts * 3) + (total_likes / num_posts))))), 
  remaining_tip_allocation=  ROUND(LOG(10, GREATEST(EXTRACT(EPOCH FROM (NOW() - first_post_date)) / 86400, 1)) * EXP(LOG(3.3, 1000 * ((num_posts * 3) + (total_likes / num_posts)))))
  WHERE num_posts > 0; 
  UPDATE tips
  SET daily_tip_allocation = 0, remaining_tip_allocation = 0 
  WHERE num_posts = 0 OR daily_tip_allocation IS NULL or power_badge = false;  -- Adding IS NULL check to catch any missed updates
END;
$$;

ALTER FUNCTION "public"."update_daily_tip_allocation"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_daily_tip_allocation"("wallet_address" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  user_stats RECORD;
BEGIN
  -- Update all rows in the 'tips' table
  UPDATE tips
  SET daily_tip_allocation = LOG(10, EXTRACT(EPOCH FROM (NOW() - first_post_date)) / 86400) * EXP(LOG(3.3, 1000 * ((num_posts * 3) + (total_likes / num_posts))))
  WHERE num_posts > 0; -- To avoid division by zero
END;
$$;

ALTER FUNCTION "public"."update_daily_tip_allocation"("wallet_address" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  INSERT INTO tips (wallet_address, total_likes, num_posts, first_post_date)
  VALUES (p_wallet_address, p_total_likes, p_num_posts, p_first_post_date)
  ON CONFLICT (wallet_address) DO UPDATE
  SET total_likes = tips.total_likes + EXCLUDED.total_likes,
      num_posts = tips.num_posts + EXCLUDED.num_posts,
      first_post_date = EXCLUDED.first_post_date;
END;
$$;

ALTER FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_fid" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  INSERT INTO tips (wallet_address, fid, total_likes, num_posts, first_post_date)
  VALUES (p_wallet_address, p_fid, p_total_likes, p_num_posts, p_first_post_date)
  ON CONFLICT (wallet_address) DO UPDATE
  SET total_likes = tips.total_likes + EXCLUDED.total_likes,
      num_posts = tips.num_posts + EXCLUDED.num_posts,
      first_post_date = EXCLUDED.first_post_date;
END;
$$;

ALTER FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_fid" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_fid" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone, "p_power_badge" boolean) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  INSERT INTO tips (wallet_address, fid, total_likes, num_posts, first_post_date, power_badge)
  VALUES (p_wallet_address, p_fid, p_total_likes, p_num_posts, p_first_post_date, p_power_badge)
  ON CONFLICT (wallet_address) DO UPDATE
  SET total_likes = tips.total_likes + EXCLUDED.total_likes,
      num_posts = tips.num_posts + EXCLUDED.num_posts,
      first_post_date = LEAST(tips.first_post_date, EXCLUDED.first_post_date),
      power_badge = p_power_badge;
END;
$$;

ALTER FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_fid" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone, "p_power_badge" boolean) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."tips_activity_log" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "sender" "text",
    "receiver" "text",
    "amount" numeric,
    "post_hash" "text"
);

ALTER TABLE "public"."tips_activity_log" OWNER TO "postgres";

ALTER TABLE "public"."tips_activity_log" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."activity_log_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."airdrop" (
    "id" bigint NOT NULL,
    "wallet_address" "text" NOT NULL,
    "notes" numeric DEFAULT '0'::numeric
);

ALTER TABLE "public"."airdrop" OWNER TO "postgres";

ALTER TABLE "public"."airdrop" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."airdrop_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."cast_query_date" (
    "id" bigint NOT NULL,
    "last_checked" "text" NOT NULL,
    "lastcheck" "text"
);

ALTER TABLE "public"."cast_query_date" OWNER TO "postgres";

COMMENT ON TABLE "public"."cast_query_date" IS 'This is a duplicate of tip_query_date';

ALTER TABLE "public"."cast_query_date" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."cast_query_date_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."posts" (
    "id" bigint NOT NULL,
    "post_hash" "text" NOT NULL,
    "points" numeric DEFAULT '0'::numeric,
    "version" numeric DEFAULT '1'::numeric,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "degen" numeric DEFAULT '0'::numeric,
    "likes" numeric DEFAULT '0'::numeric,
    "author" "jsonb",
    "embeds" "text"[],
    "channelId" "text"
);

ALTER TABLE "public"."posts" OWNER TO "postgres";

ALTER TABLE "public"."posts" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."posts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."tip_query_date" (
    "id" bigint NOT NULL,
    "last_checked" "text" NOT NULL
);

ALTER TABLE "public"."tip_query_date" OWNER TO "postgres";

ALTER TABLE "public"."tip_query_date" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."tip_query_date_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."tips" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "wallet_address" "text" NOT NULL,
    "daily_tip_allocation" bigint,
    "remaining_tip_allocation" bigint,
    "version" numeric DEFAULT '1'::numeric,
    "first_post_date" "date",
    "num_posts" numeric,
    "total_likes" numeric,
    "fid" "text" NOT NULL,
    "power_badge" boolean DEFAULT false
);

ALTER TABLE "public"."tips" OWNER TO "postgres";

ALTER TABLE "public"."tips" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."tips_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE OR REPLACE VIEW "public"."trending_posts" AS
 SELECT "posts"."id",
    "posts"."post_hash",
    "posts"."points",
    "posts"."version",
    "posts"."created_at",
    "posts"."degen",
    "posts"."likes",
    "posts"."author",
    "posts"."embeds",
    "posts"."channelId",
    ("posts"."points" / ((1)::numeric + (((EXTRACT(epoch FROM ("now"() - "posts"."created_at")) / (3600)::numeric) / (24)::numeric) ^ (2)::numeric))) AS "score"
   FROM "public"."posts"
  WHERE ("posts"."points" IS NOT NULL);

ALTER TABLE "public"."trending_posts" OWNER TO "postgres";

ALTER TABLE ONLY "public"."tips_activity_log"
    ADD CONSTRAINT "activity_log_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."airdrop"
    ADD CONSTRAINT "airdrop_pkey" PRIMARY KEY ("id", "wallet_address");

ALTER TABLE ONLY "public"."airdrop"
    ADD CONSTRAINT "airdrop_wallet_address_key" UNIQUE ("wallet_address");

ALTER TABLE ONLY "public"."cast_query_date"
    ADD CONSTRAINT "cast_query_date_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id", "post_hash");

ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_post_hash_key" UNIQUE ("post_hash");

ALTER TABLE ONLY "public"."tip_query_date"
    ADD CONSTRAINT "tip_query_date_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."tips"
    ADD CONSTRAINT "tips_fid_key" UNIQUE ("fid");

ALTER TABLE ONLY "public"."tips"
    ADD CONSTRAINT "tips_pkey" PRIMARY KEY ("id", "wallet_address", "fid");

ALTER TABLE ONLY "public"."tips"
    ADD CONSTRAINT "tips_wallet_address_key" UNIQUE ("wallet_address");

CREATE POLICY "Enable read access for all users" ON "public"."airdrop" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."cast_query_date" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."posts" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."tips" FOR SELECT USING (true);

ALTER TABLE "public"."airdrop" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."cast_query_date" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."posts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."tip_query_date" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."tips" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."tips_activity_log" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."allocate_tip"("wallet_address_input" character varying, "tip_amount" numeric, "post_hash_input" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."allocate_tip"("wallet_address_input" character varying, "tip_amount" numeric, "post_hash_input" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."allocate_tip"("wallet_address_input" character varying, "tip_amount" numeric, "post_hash_input" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid"("tip_amount" numeric, "post_hash_input" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid"("tip_amount" numeric, "post_hash_input" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid"("tip_amount" numeric, "post_hash_input" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying, "reciever_fid" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying, "reciever_fid" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying, "reciever_fid" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid_recipient"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying, "receiver_fid" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid_recipient"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying, "receiver_fid" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."allocate_tip_with_fid_recipient"("fid_input" character varying, "tip_amount" numeric, "post_hash_input" character varying, "receiver_fid" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."degen_tip_post"("tip_amount" numeric, "post_hash_input" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."degen_tip_post"("tip_amount" numeric, "post_hash_input" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."degen_tip_post"("tip_amount" numeric, "post_hash_input" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."redeem_airdrop"("wallet_address_input" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."redeem_airdrop"("wallet_address_input" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."redeem_airdrop"("wallet_address_input" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."update_daily_tip_allocation"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_daily_tip_allocation"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_daily_tip_allocation"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_daily_tip_allocation"("wallet_address" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."update_daily_tip_allocation"("wallet_address" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_daily_tip_allocation"("wallet_address" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone) TO "anon";
GRANT ALL ON FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone) TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone) TO "service_role";

GRANT ALL ON FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_fid" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone) TO "anon";
GRANT ALL ON FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_fid" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone) TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_fid" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone) TO "service_role";

GRANT ALL ON FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_fid" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone, "p_power_badge" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_fid" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone, "p_power_badge" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_tips"("p_wallet_address" "text", "p_fid" "text", "p_total_likes" integer, "p_num_posts" integer, "p_first_post_date" timestamp with time zone, "p_power_badge" boolean) TO "service_role";

GRANT ALL ON TABLE "public"."tips_activity_log" TO "anon";
GRANT ALL ON TABLE "public"."tips_activity_log" TO "authenticated";
GRANT ALL ON TABLE "public"."tips_activity_log" TO "service_role";

GRANT ALL ON SEQUENCE "public"."activity_log_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."activity_log_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."activity_log_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."airdrop" TO "anon";
GRANT ALL ON TABLE "public"."airdrop" TO "authenticated";
GRANT ALL ON TABLE "public"."airdrop" TO "service_role";

GRANT ALL ON SEQUENCE "public"."airdrop_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."airdrop_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."airdrop_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."cast_query_date" TO "anon";
GRANT ALL ON TABLE "public"."cast_query_date" TO "authenticated";
GRANT ALL ON TABLE "public"."cast_query_date" TO "service_role";

GRANT ALL ON SEQUENCE "public"."cast_query_date_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."cast_query_date_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."cast_query_date_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."posts" TO "anon";
GRANT ALL ON TABLE "public"."posts" TO "authenticated";
GRANT ALL ON TABLE "public"."posts" TO "service_role";

GRANT ALL ON SEQUENCE "public"."posts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."posts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."posts_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."tip_query_date" TO "anon";
GRANT ALL ON TABLE "public"."tip_query_date" TO "authenticated";
GRANT ALL ON TABLE "public"."tip_query_date" TO "service_role";

GRANT ALL ON SEQUENCE "public"."tip_query_date_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tip_query_date_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tip_query_date_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."tips" TO "anon";
GRANT ALL ON TABLE "public"."tips" TO "authenticated";
GRANT ALL ON TABLE "public"."tips" TO "service_role";

GRANT ALL ON SEQUENCE "public"."tips_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tips_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tips_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."trending_posts" TO "anon";
GRANT ALL ON TABLE "public"."trending_posts" TO "authenticated";
GRANT ALL ON TABLE "public"."trending_posts" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
