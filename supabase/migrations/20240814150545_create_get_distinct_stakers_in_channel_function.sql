CREATE
OR REPLACE FUNCTION get_posts_by_embeds (search_embeds TEXT[])
RETURNS SETOF posts AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM posts
    WHERE EXISTS (
        SELECT 1
        FROM unnest(embeds) AS embed
        WHERE 
            -- Check if any search term is found within the embed
            EXISTS (
                SELECT 1
                FROM unnest(search_embeds) AS term
                WHERE embed LIKE '%' || term || '%'
            )
    );
END;
$$ LANGUAGE plpgsql;