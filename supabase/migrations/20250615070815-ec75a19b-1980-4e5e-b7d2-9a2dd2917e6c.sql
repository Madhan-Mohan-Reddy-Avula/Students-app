
-- First, let's check if the profiles table exists and clear any existing data
DELETE FROM public.profiles WHERE roll_number IN ('CS2021001', 'CS2021002', 'EE2021001', 'ME2021001', 'CS2022001');

-- Insert student profiles
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

-- Verify the data was inserted
SELECT roll_number, name, email FROM public.profiles ORDER BY roll_number;
