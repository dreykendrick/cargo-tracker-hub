-- Drop existing policies if they conflict and recreate for team-members bucket specifically
DROP POLICY IF EXISTS "Team member images are publicly accessible" ON storage.objects;

CREATE POLICY "Team member images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-members');