CREATE
OR REPLACE FUNCTION get_distinct_stakers_in_channel (channel_id TEXT) RETURNS BIGINT[] AS $$
BEGIN
    RETURN (
        SELECT ARRAY_AGG(DISTINCT fid)
        FROM stake_activity_log
        WHERE "channelId" = channel_id
    );
END;
$$ LANGUAGE plpgsql;
