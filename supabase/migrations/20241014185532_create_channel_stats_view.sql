create or replace view "public"."channel_stats" as  
WITH 
post_stats AS (
SELECT posts."channelId",
    count(DISTINCT posts.post_hash) AS "numberOfSongs",
    count(DISTINCT posts."authorFid") AS "numberOfCurators"
    FROM posts
    WHERE (posts."channelId" IS NOT NULL)
    GROUP BY posts."channelId"
), 
stake_stats AS (
    SELECT subquery."channelId",
    count(DISTINCT subquery.fid) AS stakers,
    sum(subquery.user_total_amount) AS staked
    FROM ( SELECT stake_activity_log."channelId",
            stake_activity_log.fid,
            sum(stake_activity_log.amount) AS user_total_amount
            FROM stake_activity_log
            GROUP BY stake_activity_log."channelId", stake_activity_log.fid
            HAVING (sum(stake_activity_log.amount) > (0)::numeric)) subquery
    GROUP BY subquery."channelId"
), 
tip_stats AS (
    SELECT channel_tips_activity_log."channelId",
    sum(channel_tips_activity_log.amount) AS balance,
    sum(channel_tips_activity_log.amount) FILTER (WHERE (channel_tips_activity_log.created_at >= (CURRENT_TIMESTAMP - '7 days'::interval))) AS "recentTips",
    json_agg(DISTINCT channel_tips_activity_log."channelAddress") AS addresses
    FROM channel_tips_activity_log
    WHERE (channel_tips_activity_log."channelId" IS NOT NULL)
    GROUP BY channel_tips_activity_log."channelId"
)
 SELECT COALESCE(stake_stats."channelId", post_stats."channelId", tip_stats."channelId") AS "channelId",
    post_stats."numberOfCurators",
    post_stats."numberOfSongs",
    (COALESCE(tip_stats.balance, (0)::numeric) + COALESCE(stake_stats.staked, (0)::numeric)) AS "totalNotes",
    tip_stats.balance,
    stake_stats.staked,
    stake_stats.stakers,
    tip_stats."recentTips",
    tip_stats.addresses
FROM ((stake_stats
    FULL JOIN post_stats ON ((stake_stats."channelId" = post_stats."channelId")))
    FULL JOIN tip_stats ON ((tip_stats."channelId" = post_stats."channelId")
));


CREATE OR REPLACE FUNCTION public.get_user_post_count_by_channel(fid integer, "channelIds" text[])
 RETURNS TABLE("channelId" text, "numberOfSongs" bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT posts."channelId" AS "channelId", COUNT(DISTINCT post_hash) AS "numberOfSongs"
    FROM posts
    WHERE (author ->> 'fid')::int = fid
    AND posts."channelId" = ANY("channelIds")
    GROUP BY posts."channelId";
END;
$function$
;
