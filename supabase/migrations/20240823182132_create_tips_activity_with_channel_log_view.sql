CREATE VIEW tips_activity_with_channel_log AS
SELECT
  tal.*,
  p."channelId" as channel_id
FROM
  tips_activity_log tal
  LEFT JOIN posts p ON tal.post_hash = p.post_hash