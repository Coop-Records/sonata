CREATE
OR REPLACE FUNCTION get_user_tipping_stats () RETURNS TABLE (total_users bigint, total_tippers bigint) AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        COUNT(DISTINCT combined_users.fid) AS total_users,
        COUNT(DISTINCT tips_activity_log.sender) AS total_tippers
    FROM (
        SELECT fid FROM tips
        UNION
        SELECT author->>'fid' AS fid FROM posts WHERE author IS NOT NULL
    ) AS combined_users
    LEFT JOIN tips_activity_log 
    ON combined_users.fid = tips_activity_log.sender;
END;
$$ LANGUAGE plpgsql;