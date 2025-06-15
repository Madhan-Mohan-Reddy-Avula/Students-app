
-- Update the existing profiles with password hashes
-- For demo purposes, we'll use a simple hash of 'student123'
-- In production, you should use proper password hashing like bcrypt
UPDATE public.profiles 
SET password_hash = 'student123'
WHERE roll_number IN ('CS2021001', 'CS2021002', 'EE2021001', 'ME2021001', 'CS2022001');

-- Verify the passwords were set
SELECT roll_number, name, password_hash FROM public.profiles WHERE password_hash IS NOT NULL;
