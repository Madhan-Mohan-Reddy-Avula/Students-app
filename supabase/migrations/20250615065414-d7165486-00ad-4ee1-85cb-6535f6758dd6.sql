
-- Temporarily disable the foreign key constraint
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Insert student profiles without the foreign key constraint
INSERT INTO public.profiles (
    id, 
    roll_number, 
    name, 
    email, 
    department, 
    year, 
    phone, 
    avatar_url
) VALUES 
    ('550e8400-e29b-41d4-a716-446655440001', 'CS2021001', 'Alex Thompson', 'alex.thompson@student.edu', 'Computer Science', 3, '+1-555-0123', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'),
    ('550e8400-e29b-41d4-a716-446655440002', 'CS2021002', 'Emma Wilson', 'emma.wilson@student.edu', 'Computer Science', 3, '+1-555-0124', 'https://images.unsplash.com/photo-1494790108755-2616b612b093?w=150&h=150&fit=crop&crop=face'),
    ('550e8400-e29b-41d4-a716-446655440003', 'EE2021001', 'Michael Chen', 'michael.chen@student.edu', 'Electrical Engineering', 2, '+1-555-0125', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'),
    ('550e8400-e29b-41d4-a716-446655440004', 'ME2021001', 'Sarah Davis', 'sarah.davis@student.edu', 'Mechanical Engineering', 4, '+1-555-0126', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'),
    ('550e8400-e29b-41d4-a716-446655440005', 'CS2022001', 'David Rodriguez', 'david.rodriguez@student.edu', 'Computer Science', 2, '+1-555-0127', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face');

-- Create some sample classes
INSERT INTO public.classes (id, name, year, section) VALUES 
    ('c1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Computer Science - 3rd Year', 3, 'A'),
    ('c2a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Electrical Engineering - 2nd Year', 2, 'B'),
    ('c3a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Mechanical Engineering - 4th Year', 4, 'A'),
    ('c4a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Computer Science - 2nd Year', 2, 'B');

-- Update some profiles with class assignments
UPDATE public.profiles SET class_id = 'c1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6' WHERE roll_number IN ('CS2021001', 'CS2021002');
UPDATE public.profiles SET class_id = 'c2a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6' WHERE roll_number = 'EE2021001';
UPDATE public.profiles SET class_id = 'c3a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6' WHERE roll_number = 'ME2021001';
UPDATE public.profiles SET class_id = 'c4a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6' WHERE roll_number = 'CS2022001';

-- Add some sample results for these students
INSERT INTO public.student_results (
    id, user_id, subject, current_score, previous_score, max_score, current_grade, exam_type, exam_date, class_rank, total_students
) VALUES 
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'Data Structures', 94.0, 89.0, 100.0, 'A+', 'midterm', '2024-12-15', 1, 45),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'Database Systems', 88.5, 85.0, 100.0, 'A', 'final', '2024-12-20', 8, 45),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440002', 'Data Structures', 82.0, 76.5, 100.0, 'B+', 'midterm', '2024-12-15', 12, 45),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440003', 'Circuit Analysis', 91.5, 88.0, 100.0, 'A', 'midterm', '2024-12-16', 3, 38),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440004', 'Thermodynamics', 87.0, 83.5, 100.0, 'A-', 'final', '2024-12-18', 7, 42);
