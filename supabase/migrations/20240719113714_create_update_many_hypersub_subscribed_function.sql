CREATE TYPE "public"."fid_hypersub_subscribed_since" AS (
	"fid" text,
	"subscribed_since" timestamptz
);

CREATE OR REPLACE FUNCTION "public"."update_many_hypersub_subscribed"(
  updates fid_hypersub_subscribed_since[]
) RETURNS VOID
LANGUAGE "plpgsql"
AS $$
BEGIN
    UPDATE tips t
    SET hypersub_subscribed_since = u.subscribed_since
    FROM unnest(updates) AS u
    WHERE t.fid = u.fid AND t.hypersub_subscribed_since IS NULL;
END;
$$;

GRANT EXECUTE ON FUNCTION "public"."update_many_hypersub_subscribed" TO "authenticated";
GRANT EXECUTE ON FUNCTION "public"."update_many_hypersub_subscribed" TO "service_role";
REVOKE EXECUTE ON FUNCTION "public"."update_many_hypersub_subscribed" FROM "anon";