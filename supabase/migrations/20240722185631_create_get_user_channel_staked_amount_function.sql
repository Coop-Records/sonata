CREATE
OR REPLACE FUNCTION "public"."get_user_channel_staked_amount" ("p_fid" bigint, "p_channelId" text) RETURNS numeric LANGUAGE "plpgsql" AS $$
DECLARE
  total_amount numeric;
BEGIN
  SELECT
    SUM(amount)
  INTO
    total_amount
  FROM
    stake_activity_log
  WHERE
    fid = "p_fid" AND "channelId" = "p_channelId";
  
  RETURN COALESCE(total_amount, 0);
END;
$$;