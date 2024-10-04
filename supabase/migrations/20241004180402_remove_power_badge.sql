alter table "public"."posts" add column "alternativeEmbeds" text[];

alter table "public"."posts" add column "authorFid" numeric;

alter table "public"."tips" drop column "power_badge";

CREATE OR REPLACE FUNCTION public.update_daily_tip_allocation()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
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
  WHERE num_posts = 0 OR daily_tip_allocation IS NULL;  -- Adding IS NULL check to catch any missed updates
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_tips(p_wallet_address text, p_fid text, p_total_likes integer, p_num_posts integer, p_first_post_date timestamp with time zone)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO tips (wallet_address, fid, total_likes, num_posts, first_post_date, power_badge)
  VALUES (p_wallet_address, p_fid, p_total_likes, p_num_posts, p_first_post_date, p_power_badge)
  ON CONFLICT (wallet_address) DO UPDATE
  SET total_likes = tips.total_likes + EXCLUDED.total_likes,
      num_posts = tips.num_posts + EXCLUDED.num_posts,
      first_post_date = LEAST(tips.first_post_date, EXCLUDED.first_post_date);
END;
$function$
;
