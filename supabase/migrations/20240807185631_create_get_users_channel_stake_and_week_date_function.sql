CREATE
OR REPLACE FUNCTION get_users_channel_stake_and_week_date (channel_id TEXT) RETURNS TABLE (
  "channelId" TEXT,
  fid BIGINT,
  amount NUMERIC,
  earliest_week_stake DATE
) AS $$
BEGIN
    RETURN QUERY
    WITH total_amounts AS (
        SELECT
            t."channelId",
            t.fid,
            SUM(t.amount) AS total_amount
        FROM
            stake_activity_log t
        WHERE 
            t."channelId" = channel_id
        GROUP BY
            t."channelId", t.fid
        HAVING
            SUM(t.amount) > 0
    ),
    week_stakes AS (
        SELECT
            t."channelId",
            t.fid,
            MIN(t.created_at::DATE) AS earliest_week_stake
        FROM
            stake_activity_log t
        WHERE
            t."channelId" = channel_id
            AND t.amount > 0
            AND t.created_at >= NOW() - INTERVAL '7 days'
        GROUP BY
            t."channelId", t.fid
    )
    SELECT
        ta."channelId",
        ta.fid,
        ta.total_amount AS amount,
        rd.earliest_week_stake
    FROM
        total_amounts ta
    LEFT JOIN
        week_stakes rd ON ta."channelId" = rd."channelId" AND ta.fid = rd.fid;
END;
$$ LANGUAGE plpgsql;