-- Create the storage bucket for notes files if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('notes_files', 'notes_files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view files (since they are public)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'notes_files');

-- Allow authenticated users to upload files to the notes_files bucket
CREATE POLICY "Auth Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'notes_files');

-- Allow users to update and delete their own files
CREATE POLICY "Auth Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'notes_files' AND (auth.uid())::text = (storage.foldername(name))[1]);

CREATE POLICY "Auth Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'notes_files' AND (auth.uid())::text = (storage.foldername(name))[1]);
