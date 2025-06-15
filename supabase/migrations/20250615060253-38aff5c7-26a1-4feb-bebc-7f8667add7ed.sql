
-- Get the first existing profile ID and use it for our sample data
DO $$
DECLARE
    existing_user_id UUID;
    sample_class_id UUID := 'c1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6';
BEGIN
    -- Get the first existing user ID from profiles table
    SELECT id INTO existing_user_id FROM public.profiles LIMIT 1;
    
    -- If no user exists, we'll create sample data without user-specific records
    IF existing_user_id IS NOT NULL THEN
        
        -- Insert sample classes
        INSERT INTO public.classes (id, name, year, section) 
        VALUES (sample_class_id, 'Computer Science - 3rd Year', 3, 'A')
        ON CONFLICT (id) DO NOTHING;

        -- Update the existing profile with more complete information
        UPDATE public.profiles 
        SET 
            name = 'Alex Thompson',
            roll_number = 'CS2021001',
            phone = '+1-555-9876',
            class_id = sample_class_id,
            avatar_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            department = 'Computer Science',
            year = 3
        WHERE id = existing_user_id;

        -- Insert sample faculty members
        INSERT INTO public.faculty (id, name, subject, department, email, phone) 
        VALUES 
            ('f1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Dr. John Smith', 'Data Structures', 'Computer Science', 'john.smith@university.edu', '+1-555-0101'),
            ('f2a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Prof. Sarah Johnson', 'Database Systems', 'Computer Science', 'sarah.johnson@university.edu', '+1-555-0102'),
            ('f3a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Dr. Michael Brown', 'Web Development', 'Computer Science', 'michael.brown@university.edu', '+1-555-0103')
        ON CONFLICT (id) DO NOTHING;

        -- Insert sample subjects
        INSERT INTO public.subjects (id, name, code, department, credits) 
        VALUES 
            ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Data Structures and Algorithms', 'CS301', 'Computer Science', 4),
            ('b1c2d3e4-f5a6-7891-bcde-f21234567891', 'Database Management Systems', 'CS302', 'Computer Science', 3),
            ('c1d2e3f4-a5b6-7892-cdef-321234567892', 'Web Development', 'CS303', 'Computer Science', 3)
        ON CONFLICT (id) DO NOTHING;

        -- Insert timetable entries
        INSERT INTO public.timetable (
            id, subject_id, faculty_id, class_id, day_of_week, start_time, end_time, teacher, class_type, room_location
        ) VALUES 
            ('d1e2f3a4-b5c6-7893-defa-421234567893', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'f1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', sample_class_id, 1, '09:00:00', '10:30:00', 'Dr. John Smith', 'lecture', 'Room 301'),
            ('e1f2a3b4-c5d6-7894-efab-521234567894', 'b1c2d3e4-f5a6-7891-bcde-f21234567891', 'f2a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', sample_class_id, 2, '11:00:00', '12:30:00', 'Prof. Sarah Johnson', 'lecture', 'Room 205'),
            ('f1a2b3c4-d5e6-7895-fabc-621234567895', 'c1d2e3f4-a5b6-7892-cdef-321234567892', 'f3a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', sample_class_id, 3, '14:00:00', '15:30:00', 'Dr. Michael Brown', 'practical', 'Lab 1')
        ON CONFLICT (id) DO NOTHING;

        -- Insert homework assignments
        INSERT INTO public.homework_assignments (
            id, subject, title, description, due_date, priority, status, class_id, faculty_id
        ) VALUES 
            ('a1b2c3d4-e5f6-7896-abcd-721234567896', 'Data Structures', 'Binary Tree Implementation', 'Implement a binary search tree with insert, delete, and search operations', '2024-12-25T23:59:59Z', 'high', 'pending', sample_class_id, 'f1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6'),
            ('b1c2d3e4-f5a6-7897-bcde-821234567897', 'Database Systems', 'SQL Query Assignment', 'Write complex SQL queries for the given database schema', '2024-12-28T23:59:59Z', 'medium', 'pending', sample_class_id, 'f2a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6')
        ON CONFLICT (id) DO NOTHING;

        -- Insert student assignments
        INSERT INTO public.student_assignments (
            id, assignment_id, user_id, status, notes
        ) VALUES 
            ('c1d2e3f4-a5b6-7898-cdef-921234567898', 'a1b2c3d4-e5f6-7896-abcd-721234567896', existing_user_id, 'in-progress', 'Started working on the tree structure'),
            ('d1e2f3a4-b5c6-7899-defa-a21234567899', 'b1c2d3e4-f5a6-7897-bcde-821234567897', existing_user_id, 'pending', 'Need to review the database schema first')
        ON CONFLICT (id) DO NOTHING;

        -- Insert exam records
        INSERT INTO public.exams (
            id, subject_id, exam_type, exam_date, start_time, duration_minutes, max_score, location, type, class_id
        ) VALUES 
            ('e1f2a3b4-c5d6-789a-efab-b21234567890', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'midterm', '2024-12-15T09:00:00Z', '09:00:00', 120, 100.00, 'Exam Hall A', 'Written', sample_class_id),
            ('f1a2b3c4-d5e6-789b-fabc-c21234567891', 'b1c2d3e4-f5a6-7891-bcde-f21234567891', 'final', '2024-12-20T14:00:00Z', '14:00:00', 180, 100.00, 'Exam Hall B', 'Written', sample_class_id)
        ON CONFLICT (id) DO NOTHING;

        -- Insert student results
        INSERT INTO public.student_results (
            id, user_id, subject, current_score, previous_score, max_score, current_grade, exam_type, exam_date, class_rank, total_students
        ) VALUES 
            ('a1b2c3d4-e5f6-789c-abcd-d21234567892', existing_user_id, 'Data Structures', 85.5, 78.0, 100.0, 'A', 'midterm', '2024-12-15', 5, 45),
            ('b1c2d3e4-f5a6-789d-bcde-e21234567893', existing_user_id, 'Database Systems', 92.0, 88.5, 100.0, 'A+', 'final', '2024-12-20', 2, 45)
        ON CONFLICT (id) DO NOTHING;

        -- Insert school events
        INSERT INTO public.school_events (
            id, title, description, event_date, start_time, location, event_type, category, is_featured, is_mandatory
        ) VALUES 
            ('c1d2e3f4-a5b6-789e-cdef-f21234567894', 'Annual Tech Fest 2024', 'Join us for the biggest technology festival of the year featuring competitions, workshops, and exhibitions', '2024-12-15T09:00:00Z', '09:00:00', 'Main Campus Auditorium', 'festival', 'Academic', true, false),
            ('d1e2f3a4-b5c6-789f-defa-021234567895', 'Career Guidance Workshop', 'Learn about career opportunities in computer science and industry trends', '2024-12-30T14:00:00Z', '14:00:00', 'Conference Room 1', 'workshop', 'Career', false, true)
        ON CONFLICT (id) DO NOTHING;

        -- Insert event registrations
        INSERT INTO public.event_registrations (
            id, event_id, student_id, name, email, phone, participation_type, status, message
        ) VALUES 
            ('e1f2a3b4-c5d6-78a0-efab-121234567896', 'c1d2e3f4-a5b6-789e-cdef-f21234567894', existing_user_id, 'Alex Thompson', 'alex.thompson@student.university.edu', '+1-555-9876', 'participant', 'approved', 'Looking forward to participating in the coding competition!'),
            ('f1a2b3c4-d5e6-78a1-fabc-221234567897', 'd1e2f3a4-b5c6-789f-defa-021234567895', existing_user_id, 'Alex Thompson', 'alex.thompson@student.university.edu', '+1-555-9876', 'attendee', 'approved', 'Interested in learning about AI/ML career paths')
        ON CONFLICT (id) DO NOTHING;

        -- Insert attendance records
        INSERT INTO public.attendance (
            id, user_id, class_timetable_id, date, status
        ) VALUES 
            ('a1b2c3d4-e5f6-78a2-abcd-321234567898', existing_user_id, 'd1e2f3a4-b5c6-7893-defa-421234567893', '2024-06-17', 'present'),
            ('b1c2d3e4-f5a6-78a3-bcde-421234567899', existing_user_id, 'e1f2a3b4-c5d6-7894-efab-521234567894', '2024-06-18', 'present'),
            ('c1d2e3f4-a5b6-78a4-cdef-52123456789a', existing_user_id, 'f1a2b3c4-d5e6-7895-fabc-621234567895', '2024-06-19', 'late')
        ON CONFLICT (id) DO NOTHING;

        -- Insert notifications
        INSERT INTO public.notifications (
            id, user_id, title, message, type, is_read
        ) VALUES 
            ('d1e2f3a4-b5c6-78a5-defa-62123456789b', existing_user_id, 'Assignment Due Soon', 'Your Binary Tree Implementation assignment is due in 3 days. Make sure to submit on time!', 'assignment_due', false),
            ('e1f2a3b4-c5d6-78a6-efab-72123456789c', existing_user_id, 'Exam Reminder', 'Database Systems final exam is scheduled for December 20th at 2:00 PM in Exam Hall B', 'exam_reminder', false),
            ('f1a2b3c4-d5e6-78a7-fabc-82123456789d', existing_user_id, 'Event Registration Confirmed', 'Your registration for Annual Tech Fest 2024 has been approved. Get ready for an amazing experience!', 'event_update', true)
        ON CONFLICT (id) DO NOTHING;
        
    END IF;
END $$;
