-- Update homework assignment dates to current/future dates
UPDATE homework_assignments 
SET assigned_date = '2025-01-06', due_date = '2025-01-13'
WHERE subject = 'Data Structures';

UPDATE homework_assignments 
SET assigned_date = '2025-01-07', due_date = '2025-01-15'  
WHERE subject = 'Database Systems';

UPDATE homework_assignments 
SET assigned_date = '2025-01-08', due_date = '2025-01-18'
WHERE subject = 'Operating Systems';

UPDATE homework_assignments 
SET assigned_date = '2025-01-09', due_date = '2025-01-22'
WHERE subject = 'Computer Networks';

UPDATE homework_assignments 
SET assigned_date = '2025-01-10', due_date = '2025-01-25'
WHERE subject = 'Software Engineering';

-- Add more homework assignments with future dates
INSERT INTO homework_assignments (class_id, title, description, subject, assigned_date, due_date, status) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Linear Algebra Assignment', 'Solve matrix operations and eigenvalue problems', 'Mathematics', '2025-01-11', '2025-01-20', 'pending'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Physics Lab Report', 'Write report on wave interference experiment', 'Physics', '2025-01-12', '2025-01-19', 'in_progress'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Web Development Project', 'Create responsive website using React', 'Web Development', '2025-01-13', '2025-01-27', 'pending'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'AI Research Paper', 'Write paper on machine learning algorithms', 'Machine Learning', '2025-01-14', '2025-01-30', 'pending');