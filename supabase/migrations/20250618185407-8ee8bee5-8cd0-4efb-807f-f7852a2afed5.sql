
-- First, let's add more student profiles
INSERT INTO public.profiles (
    id, 
    roll_number, 
    name, 
    email, 
    department, 
    year, 
    phone, 
    avatar_url,
    password_hash,
    created_at,
    updated_at
) VALUES 
    (gen_random_uuid(), 'CS2021003', 'John Smith', 'john.smith@student.edu', 'Computer Science', 3, '+1-555-0128', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face', 'student123', now(), now()),
    (gen_random_uuid(), 'CS2021004', 'Lisa Johnson', 'lisa.johnson@student.edu', 'Computer Science', 3, '+1-555-0129', 'https://images.unsplash.com/photo-1494790108755-2616b612b093?w=150&h=150&fit=crop&crop=face', 'student123', now(), now()),
    (gen_random_uuid(), 'EE2021002', 'Robert Brown', 'robert.brown@student.edu', 'Electrical Engineering', 2, '+1-555-0130', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'student123', now(), now()),
    (gen_random_uuid(), 'ME2021002', 'Anna Wilson', 'anna.wilson@student.edu', 'Mechanical Engineering', 4, '+1-555-0131', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'student123', now(), now()),
    (gen_random_uuid(), 'CS2022002', 'Kevin Lee', 'kevin.lee@student.edu', 'Computer Science', 2, '+1-555-0132', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 'student123', now(), now())
ON CONFLICT (roll_number) DO NOTHING;

-- Add more comprehensive student results with different modules/semesters
INSERT INTO public.student_results (
    id,
    user_id,
    subject,
    current_score,
    previous_score,
    max_score,
    current_grade,
    exam_type,
    exam_date,
    class_rank,
    total_students,
    created_at,
    updated_at
) 
SELECT 
    gen_random_uuid(),
    p.id,
    subjects.subject_name,
    subjects.score,
    subjects.prev_score,
    100.00,
    CASE 
        WHEN subjects.score >= 90 THEN 'A+'
        WHEN subjects.score >= 85 THEN 'A'
        WHEN subjects.score >= 80 THEN 'B+'
        WHEN subjects.score >= 75 THEN 'B'
        WHEN subjects.score >= 70 THEN 'C+'
        WHEN subjects.score >= 65 THEN 'C'
        WHEN subjects.score >= 60 THEN 'D'
        ELSE 'F'
    END,
    subjects.exam_type,
    subjects.exam_date::date,
    subjects.rank,
    25,
    now(),
    now()
FROM public.profiles p
CROSS JOIN (
    VALUES 
    -- Semester 1 - Mid Term
    ('Mathematics I', 85.5, 80.0, 'Mid Term', '2024-03-15', 8),
    ('Physics I', 78.0, 75.5, 'Mid Term', '2024-03-16', 12),
    ('Programming Fundamentals', 92.5, 88.0, 'Mid Term', '2024-03-17', 3),
    ('Engineering Drawing', 88.0, 85.0, 'Mid Term', '2024-03-18', 6),
    ('English Communication', 76.5, 72.0, 'Mid Term', '2024-03-19', 15),
    
    -- Semester 1 - Final
    ('Mathematics I', 88.0, 85.5, 'Final', '2024-05-15', 7),
    ('Physics I', 82.5, 78.0, 'Final', '2024-05-16', 10),
    ('Programming Fundamentals', 94.0, 92.5, 'Final', '2024-05-17', 2),
    ('Engineering Drawing', 90.5, 88.0, 'Final', '2024-05-18', 4),
    ('English Communication', 79.0, 76.5, 'Final', '2024-05-19', 13),
    
    -- Semester 2 - Mid Term
    ('Mathematics II', 87.0, 84.0, 'Mid Term', '2024-09-15', 6),
    ('Physics II', 83.5, 80.0, 'Mid Term', '2024-09-16', 9),
    ('Data Structures', 91.0, 87.5, 'Mid Term', '2024-09-17', 4),
    ('Digital Logic', 86.5, 82.0, 'Mid Term', '2024-09-18', 7),
    ('Technical Writing', 81.0, 78.5, 'Mid Term', '2024-09-19', 11),
    
    -- Semester 2 - Final
    ('Mathematics II', 89.5, 87.0, 'Final', '2024-11-15', 5),
    ('Physics II', 85.0, 83.5, 'Final', '2024-11-16', 8),
    ('Data Structures', 93.5, 91.0, 'Final', '2024-11-17', 3),
    ('Digital Logic', 88.5, 86.5, 'Final', '2024-11-18', 6),
    ('Technical Writing', 83.0, 81.0, 'Final', '2024-11-19', 10)
) AS subjects(subject_name, score, prev_score, exam_type, exam_date, rank)
WHERE p.roll_number IN ('CS2021001', 'CS2021002', 'EE2021001', 'ME2021001', 'CS2022001')
ON CONFLICT DO NOTHING;

-- Add some homework assignments
INSERT INTO public.homework_assignments (
    id,
    title,
    description,
    subject,
    due_date,
    status,
    priority,
    created_at,
    updated_at
) VALUES 
    (gen_random_uuid(), 'Linear Algebra Assignment', 'Solve matrix problems from Chapter 3', 'Mathematics II', '2024-12-25 23:59:00+00', 'pending', 'high', now(), now()),
    (gen_random_uuid(), 'Binary Tree Implementation', 'Implement BST with insert, delete, search operations', 'Data Structures', '2024-12-28 23:59:00+00', 'pending', 'medium', now(), now()),
    (gen_random_uuid(), 'Logic Gates Lab Report', 'Submit lab report for AND, OR, NOT gates experiment', 'Digital Logic', '2024-12-22 23:59:00+00', 'completed', 'high', now(), now()),
    (gen_random_uuid(), 'Technical Documentation', 'Write technical documentation for your project', 'Technical Writing', '2024-12-30 23:59:00+00', 'pending', 'low', now(), now());

-- Add some school events with correct event_type values
INSERT INTO public.school_events (
    id,
    title,
    description,
    event_date,
    end_date,
    location,
    event_type,
    is_mandatory,
    category,
    created_at,
    updated_at
) VALUES 
    (gen_random_uuid(), 'Annual Tech Fest 2024', 'Three-day technology festival with competitions and exhibitions', '2024-12-28 09:00:00+00', '2024-12-30 18:00:00+00', 'Main Campus', 'general', false, 'Academic', now(), now()),
    (gen_random_uuid(), 'Winter Break Begins', 'Academic calendar event - Winter break starts', '2024-12-24 00:00:00+00', '2025-01-06 00:00:00+00', 'All Campus', 'general', true, 'Academic', now(), now()),
    (gen_random_uuid(), 'Career Fair', 'Meet industry professionals and explore career opportunities', '2025-01-15 10:00:00+00', '2025-01-15 16:00:00+00', 'Auditorium', 'general', false, 'Academic', now(), now());

-- Verify all data was inserted
SELECT 'Profiles' as table_name, COUNT(*) as count FROM public.profiles
UNION ALL
SELECT 'Student Results' as table_name, COUNT(*) as count FROM public.student_results
UNION ALL
SELECT 'Homework Assignments' as table_name, COUNT(*) as count FROM public.homework_assignments
UNION ALL
SELECT 'School Events' as table_name, COUNT(*) as count FROM public.school_events;
