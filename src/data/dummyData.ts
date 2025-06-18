
export const dummyStudent = {
  id: 'dummy-001',
  roll_number: 'DEMO001',
  name: 'Demo Student',
  email: 'demo@student.edu',
  department: 'Computer Science',
  year: 3,
  phone: '+1-555-0100',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  class_id: 'class-001',
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z'
};

export const dummyClassInfo = {
  id: 'class-001',
  name: 'CS Third Year',
  section: 'A',
  year: 3
};

export const dummyResults = [
  {
    id: 'result-001',
    subject: 'Mathematics II',
    current_score: 89.5,
    previous_score: 87.0,
    max_score: 100,
    current_grade: 'A',
    exam_type: 'Final',
    exam_date: '2024-11-15',
    class_rank: 5,
    total_students: 25
  },
  {
    id: 'result-002',
    subject: 'Data Structures',
    current_score: 93.5,
    previous_score: 91.0,
    max_score: 100,
    current_grade: 'A+',
    exam_type: 'Final',
    exam_date: '2024-11-17',
    class_rank: 3,
    total_students: 25
  },
  {
    id: 'result-003',
    subject: 'Digital Logic',
    current_score: 88.5,
    previous_score: 86.5,
    max_score: 100,
    current_grade: 'A',
    exam_type: 'Final',
    exam_date: '2024-11-18',
    class_rank: 6,
    total_students: 25
  },
  {
    id: 'result-004',
    subject: 'Physics II',
    current_score: 85.0,
    previous_score: 83.5,
    max_score: 100,
    current_grade: 'A',
    exam_type: 'Final',
    exam_date: '2024-11-16',
    class_rank: 8,
    total_students: 25
  },
  {
    id: 'result-005',
    subject: 'Technical Writing',
    current_score: 83.0,
    previous_score: 81.0,
    max_score: 100,
    current_grade: 'B+',
    exam_type: 'Final',
    exam_date: '2024-11-19',
    class_rank: 10,
    total_students: 25
  }
];

export const dummyHomework = [
  {
    id: 'hw-001',
    title: 'Linear Algebra Assignment',
    description: 'Solve matrix problems from Chapter 3',
    subject: 'Mathematics II',
    due_date: '2024-12-25T23:59:00.000Z',
    status: 'pending' as const,
    priority: 'high' as const,
    created_at: '2024-12-01T00:00:00.000Z',
    updated_at: '2024-12-01T00:00:00.000Z'
  },
  {
    id: 'hw-002',
    title: 'Binary Tree Implementation',
    description: 'Implement BST with insert, delete, search operations',
    subject: 'Data Structures',
    due_date: '2024-12-28T23:59:00.000Z',
    status: 'pending' as const,
    priority: 'medium' as const,
    created_at: '2024-12-01T00:00:00.000Z',
    updated_at: '2024-12-01T00:00:00.000Z'
  },
  {
    id: 'hw-003',
    title: 'Logic Gates Lab Report',
    description: 'Submit lab report for AND, OR, NOT gates experiment',
    subject: 'Digital Logic',
    due_date: '2024-12-22T23:59:00.000Z',
    status: 'completed' as const,
    priority: 'high' as const,
    created_at: '2024-12-01T00:00:00.000Z',
    updated_at: '2024-12-01T00:00:00.000Z'
  }
];

export const dummyEvents = [
  {
    id: 'event-001',
    title: 'Annual Tech Fest 2024',
    description: 'Three-day technology festival with competitions and exhibitions',
    event_date: '2024-12-28',
    start_time: '09:00',
    location: 'Main Campus',
    category: 'Academic',
    participants_info: 'All students welcome',
    is_featured: true
  },
  {
    id: 'event-002',
    title: 'Career Fair',
    description: 'Meet industry professionals and explore career opportunities',
    event_date: '2025-01-15',
    start_time: '10:00',
    location: 'Auditorium',
    category: 'Professional',
    participants_info: 'Final year students preferred',
    is_featured: false
  },
  {
    id: 'event-003',
    title: 'Winter Sports Meet',
    description: 'Annual inter-department sports competition',
    event_date: '2025-01-20',
    start_time: '08:00',
    location: 'Sports Complex',
    category: 'Sports',
    participants_info: 'All departments',
    is_featured: true
  }
];

export const dummyTimetable = [
  {
    id: 'tt-001',
    day_of_week: 1,
    start_time: '09:00',
    end_time: '10:00',
    room_location: 'Room 101',
    teacher: 'Dr. Smith',
    subjects: { name: 'Mathematics II' },
    faculty: { name: 'Dr. Smith' }
  },
  {
    id: 'tt-002',
    day_of_week: 1,
    start_time: '10:00',
    end_time: '11:00',
    room_location: 'Lab 201',
    teacher: 'Prof. Johnson',
    subjects: { name: 'Data Structures' },
    faculty: { name: 'Prof. Johnson' }
  },
  {
    id: 'tt-003',
    day_of_week: 2,
    start_time: '09:00',
    end_time: '10:00',
    room_location: 'Room 102',
    teacher: 'Dr. Wilson',
    subjects: { name: 'Physics II' },
    faculty: { name: 'Dr. Wilson' }
  },
  {
    id: 'tt-004',
    day_of_week: 2,
    start_time: '11:00',
    end_time: '12:00',
    room_location: 'Lab 301',
    teacher: 'Prof. Brown',
    subjects: { name: 'Digital Logic' },
    faculty: { name: 'Prof. Brown' }
  }
];

export const dummyExams = [
  {
    id: 'exam-001',
    subject: 'Mathematics II',
    exam_date: '2024-12-15',
    start_time: '09:00',
    duration_minutes: 180,
    room: 'Hall A',
    exam_type: 'Final',
    max_score: 100,
    syllabus_coverage: 'Chapters 1-8'
  },
  {
    id: 'exam-002',
    subject: 'Data Structures',
    exam_date: '2024-12-17',
    start_time: '14:00',
    duration_minutes: 180,
    room: 'Hall B',
    exam_type: 'Final',
    max_score: 100,
    syllabus_coverage: 'All practical sessions'
  },
  {
    id: 'exam-003',
    subject: 'Digital Logic',
    exam_date: '2024-12-20',
    start_time: '09:00',
    duration_minutes: 180,
    room: 'Hall C',
    exam_type: 'Final',
    max_score: 100,
    syllabus_coverage: 'Logic gates and circuits'
  }
];
