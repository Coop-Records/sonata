CREATE VIEW channel_stake_stats AS
SELECT
    "channelId",
    COUNT(DISTINCT fid) AS stakers,
    SUM(user_total_amount) AS staked
FROM (
    SELECT
        "channelId",
        fid,
        SUM(amount) AS user_total_amount
    FROM
        stake_activity_log
    GROUP BY
        "channelId", fid
    HAVING SUM(amount) > 0
) subquery
GROUP BY
    "channelId";