CREATE
OR REPLACE FUNCTION total_posts_points_of_embeds (search_embeds TEXT[]) RETURNS NUMERIC AS $$
DECLARE
    total_points NUMERIC;
BEGIN
    SELECT SUM(points) INTO total_points
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
    RETURN COALESCE(total_points, 0);
END;
$$ LANGUAGE plpgsql;