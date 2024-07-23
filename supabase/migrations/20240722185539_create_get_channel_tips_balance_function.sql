CREATE
OR REPLACE FUNCTION "public"."get_channel_tips_balance" ("p_channelId" text) RETURNS numeric LANGUAGE "plpgsql" AS $$
DECLARE
  total_amount numeric;
BEGIN
  SELECT
    SUM(amount)
  INTO
    total_amount
  FROM
    channel_tips_activity_log
  WHERE
    "channelId" = "p_channelId";
  
  RETURN COALESCE(total_amount, 0);
END;
$$;