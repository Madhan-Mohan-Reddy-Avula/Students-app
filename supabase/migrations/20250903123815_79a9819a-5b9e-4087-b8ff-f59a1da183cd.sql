-- Update exam dates to future dates so they appear in the timetable
UPDATE exam_timetable 
SET exam_date = '2025-01-15' 
WHERE subject = 'Data Structures';

UPDATE exam_timetable 
SET exam_date = '2025-01-17' 
WHERE subject = 'Database Systems';

UPDATE exam_timetable 
SET exam_date = '2025-01-19' 
WHERE subject = 'Operating Systems';

UPDATE exam_timetable 
SET exam_date = '2025-01-21' 
WHERE subject = 'Computer Networks';

UPDATE exam_timetable 
SET exam_date = '2025-01-23' 
WHERE subject = 'Software Engineering';

-- Add more comprehensive timetable data for all weekdays
INSERT INTO class_timetable (class_id, day_of_week, start_time, end_time, room, faculty, subject) VALUES
-- Wednesday
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Wednesday', '09:00', '10:00', 'CS-101', 'Dr. Smith', 'Data Structures'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Wednesday', '10:00', '11:00', 'CS-102', 'Prof. Johnson', 'Database Systems'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Wednesday', '11:30', '12:30', 'CS-103', 'Dr. Williams', 'Operating Systems'),

-- Thursday
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Thursday', '09:00', '10:00', 'CS-104', 'Prof. Brown', 'Computer Networks'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Thursday', '10:00', '11:00', 'CS-105', 'Dr. Davis', 'Software Engineering'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Thursday', '14:00', '15:00', 'CS-106', 'Prof. Miller', 'Web Development'),

-- Friday
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Friday', '09:00', '10:00', 'CS-107', 'Dr. Wilson', 'Machine Learning'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Friday', '10:00', '11:00', 'CS-108', 'Prof. Garcia', 'Computer Graphics'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Friday', '11:30', '12:30', 'CS-109', 'Dr. Martinez', 'Artificial Intelligence');