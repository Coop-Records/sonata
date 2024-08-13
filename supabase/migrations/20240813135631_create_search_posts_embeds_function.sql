CREATE
OR REPLACE FUNCTION search_posts_embeds (search_string TEXT, limit_per_row INT) RETURNS TABLE (post_hash text, author jsonb) AS $$
BEGIN
  RETURN QUERY
  SELECT posts.post_hash, posts.author
  FROM posts
  WHERE EXISTS (
    SELECT 1
    FROM unnest(embeds) AS embed
    WHERE embed ILIKE '%' || search_string || '%'
    LIMIT limit_per_row
  )
  LIMIT limit_per_row;
END;
$$ LANGUAGE plpgsql;
