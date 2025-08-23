
export const dummyStudent = {
  id: 'student-cs2022001',
  roll_number: 'CS2022001',
  name: 'Alexandra Johnson',
  email: 'alexandra.johnson@techuniv.edu',
  department: 'Computer Science & Engineering',
  year: 3,
  phone: '+1-555-2024',
  avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  class_id: 'cse-2022-batch-a',
  created_at: '2022-08-15T00:00:00.000Z',
  updated_at: '2024-12-23T08:30:00.000Z'
};

export const dummyClassInfo = {
  id: 'cse-2022-batch-a',
  name: 'Computer Science & Engineering - 2022 Batch',
  section: 'A',
  year: 3
};

export const dummyResults = [
  {
    id: 'result-001',
    subject: 'Advanced Mathematics',
    current_score: 92.5,
    previous_score: 89.0,
    max_score: 100,
    current_grade: 'A+',
    exam_type: 'Mid-Semester',
    exam_date: '2024-11-15',
    class_rank: 3,
    total_students: 42
  },
  {
    id: 'result-002',
    subject: 'Data Structures & Algorithms',
    current_score: 95.5,
    previous_score: 93.0,
    max_score: 100,
    current_grade: 'A+',
    exam_type: 'Mid-Semester',
    exam_date: '2024-11-17',
    class_rank: 1,
    total_students: 42
  },
  {
    id: 'result-003',
    subject: 'Computer Networks',
    current_score: 88.5,
    previous_score: 86.5,
    max_score: 100,
    current_grade: 'A',
    exam_type: 'Mid-Semester',
    exam_date: '2024-11-18',
    class_rank: 6,
    total_students: 42
  },
  {
    id: 'result-004',
    subject: 'Database Management Systems',
    current_score: 91.0,
    previous_score: 88.5,
    max_score: 100,
    current_grade: 'A+',
    exam_type: 'Mid-Semester',
    exam_date: '2024-11-16',
    class_rank: 4,
    total_students: 42
  },
  {
    id: 'result-005',
    subject: 'Software Engineering',
    current_score: 87.0,
    previous_score: 84.0,
    max_score: 100,
    current_grade: 'A',
    exam_type: 'Mid-Semester',
    exam_date: '2024-11-19',
    class_rank: 7,
    total_students: 42
  },
  {
    id: 'result-006',
    subject: 'Operating Systems',
    current_score: 89.5,
    previous_score: 87.0,
    max_score: 100,
    current_grade: 'A',
    exam_type: 'Mid-Semester',
    exam_date: '2024-11-20',
    class_rank: 5,
    total_students: 42
  },
  {
    id: 'result-007',
    subject: 'Computer Graphics',
    current_score: 93.0,
    previous_score: 90.5,
    max_score: 100,
    current_grade: 'A+',
    exam_type: 'Mid-Semester',
    exam_date: '2024-11-21',
    class_rank: 2,
    total_students: 42
  },
  {
    id: 'result-008',
    subject: 'Machine Learning Fundamentals',
    current_score: 85.5,
    previous_score: 83.0,
    max_score: 100,
    current_grade: 'A',
    exam_type: 'Mid-Semester',
    exam_date: '2024-11-22',
    class_rank: 8,
    total_students: 42
  }
];

export const dummyHomework = [
  {
    id: 'hw-001',
    title: 'Advanced Calculus Problem Set',
    description: 'Complete differential equations and vector calculus problems from Chapter 7-9. Include detailed step-by-step solutions.',
    subject: 'Advanced Mathematics',
    due_date: '2024-12-26T23:59:00.000Z',
    status: 'pending' as const,
    priority: 'high' as const,
    created_at: '2024-12-15T00:00:00.000Z',
    updated_at: '2024-12-23T10:30:00.000Z'
  },
  {
    id: 'hw-002',
    title: 'Graph Algorithms Implementation',
    description: 'Implement Dijkstra\'s shortest path and Kruskal\'s MST algorithms in C++. Include time complexity analysis.',
    subject: 'Data Structures & Algorithms',
    due_date: '2024-12-28T23:59:00.000Z',
    status: 'pending' as const,
    priority: 'high' as const,
    created_at: '2024-12-10T00:00:00.000Z',
    updated_at: '2024-12-23T10:30:00.000Z'
  },
  {
    id: 'hw-003',
    title: 'Network Protocol Analysis',
    description: 'Analyze TCP/IP packet structure and create a detailed report on network security protocols.',
    subject: 'Computer Networks',
    due_date: '2024-12-30T23:59:00.000Z',
    status: 'pending' as const,
    priority: 'medium' as const,
    created_at: '2024-12-12T00:00:00.000Z',
    updated_at: '2024-12-23T10:30:00.000Z'
  },
  {
    id: 'hw-004',
    title: 'Database Design Project',
    description: 'Design and implement a complete e-commerce database with ER diagrams, normalization, and SQL queries.',
    subject: 'Database Management Systems',
    due_date: '2025-01-05T23:59:00.000Z',
    status: 'pending' as const,
    priority: 'high' as const,
    created_at: '2024-12-05T00:00:00.000Z',
    updated_at: '2024-12-23T10:30:00.000Z'
  },
  {
    id: 'hw-005',
    title: 'Software Testing Report',
    description: 'Complete unit testing and integration testing for the library management system project.',
    subject: 'Software Engineering',
    due_date: '2024-12-27T23:59:00.000Z',
    status: 'completed' as const,
    priority: 'medium' as const,
    created_at: '2024-12-01T00:00:00.000Z',
    updated_at: '2024-12-20T16:45:00.000Z'
  },
  {
    id: 'hw-006',
    title: 'Process Scheduling Simulation',
    description: 'Implement and compare FCFS, SJF, and Round Robin scheduling algorithms in C.',
    subject: 'Operating Systems',
    due_date: '2025-01-02T23:59:00.000Z',
    status: 'pending' as const,
    priority: 'medium' as const,
    created_at: '2024-12-08T00:00:00.000Z',
    updated_at: '2024-12-23T10:30:00.000Z'
  },
  {
    id: 'hw-007',
    title: '3D Graphics Rendering',
    description: 'Create a 3D scene with lighting, textures, and animation using OpenGL. Submit source code and demo video.',
    subject: 'Computer Graphics',
    due_date: '2025-01-10T23:59:00.000Z',
    status: 'pending' as const,
    priority: 'high' as const,
    created_at: '2024-12-18T00:00:00.000Z',
    updated_at: '2024-12-23T10:30:00.000Z'
  },
  {
    id: 'hw-008',
    title: 'Linear Regression Analysis',
    description: 'Implement linear regression from scratch and analyze housing price dataset. Include performance metrics.',
    subject: 'Machine Learning Fundamentals',
    due_date: '2024-12-29T23:59:00.000Z',
    status: 'completed' as const,
    priority: 'medium' as const,
    created_at: '2024-12-03T00:00:00.000Z',
    updated_at: '2024-12-22T14:20:00.000Z'
  }
];

export const dummyEvents = [
  {
    id: 'event-001',
    title: 'TechnoVision 2025 - Annual Tech Festival',
    description: 'The biggest technology festival featuring AI competitions, robotics showcase, coding marathons, and guest lectures by industry leaders from Google, Microsoft, and Tesla.',
    event_date: '2025-01-15',
    start_time: '09:00',
    location: 'Central Campus & Innovation Hub',
    category: 'Academic',
    participants_info: 'Open to all students, registration required for competitions',
    is_featured: true
  },
  {
    id: 'event-002',
    title: 'Industry Connect Career Fair',
    description: 'Meet recruiters from top tech companies including Amazon, Meta, Apple, and startups. CV review sessions, mock interviews, and networking opportunities.',
    event_date: '2025-01-22',
    start_time: '10:00',
    location: 'Grand Auditorium Complex',
    category: 'Professional',
    participants_info: 'Final year students, bring multiple copies of CV',
    is_featured: true
  },
  {
    id: 'event-003',
    title: 'Inter-University Coding Championship',
    description: 'Compete with students from 50+ universities in algorithmic programming. Prizes worth $10,000 and internship opportunities.',
    event_date: '2025-02-05',
    start_time: '09:00',
    location: 'Computer Science Building - Labs 201-210',
    category: 'Competition',
    participants_info: 'Team of 3 students maximum, registration closes Jan 30',
    is_featured: true
  },
  {
    id: 'event-004',
    title: 'Research Symposium on AI & Machine Learning',
    description: 'Student research presentations, faculty talks on cutting-edge AI research, and poster sessions. Guest speaker: Dr. Yann LeCun.',
    event_date: '2025-02-12',
    start_time: '14:00',
    location: 'Research Center Auditorium',
    category: 'Academic',
    participants_info: 'Abstract submission deadline: Feb 1st',
    is_featured: false
  },
  {
    id: 'event-005',
    title: 'Annual Sports Carnival',
    description: 'Inter-department sports competition including cricket, football, basketball, badminton, and e-sports tournaments.',
    event_date: '2025-02-20',
    start_time: '08:00',
    location: 'University Sports Complex',
    category: 'Sports',
    participants_info: 'Register through department sports coordinators',
    is_featured: false
  },
  {
    id: 'event-006',
    title: 'Startup Pitch Competition',
    description: 'Present your innovative startup ideas to investors and industry experts. Winner gets ₹5,00,000 seed funding and mentorship.',
    event_date: '2025-03-01',
    start_time: '11:00',
    location: 'Innovation Hub - Pitch Room',
    category: 'Competition',
    participants_info: 'Business plan submission required by Feb 20',
    is_featured: true
  }
];

export const dummyTimetable = [
  // Monday
  {
    id: 'tt-001',
    day_of_week: 1,
    start_time: '09:00',
    end_time: '10:00',
    room_location: 'CS-301',
    teacher: 'Dr. Sarah Mitchell',
    subjects: { name: 'Advanced Mathematics' },
    faculty: { name: 'Dr. Sarah Mitchell' }
  },
  {
    id: 'tt-002',
    day_of_week: 1,
    start_time: '10:15',
    end_time: '11:15',
    room_location: 'CS-Lab-A',
    teacher: 'Prof. David Kumar',
    subjects: { name: 'Data Structures & Algorithms Lab' },
    faculty: { name: 'Prof. David Kumar' }
  },
  {
    id: 'tt-003',
    day_of_week: 1,
    start_time: '11:30',
    end_time: '12:30',
    room_location: 'CS-205',
    teacher: 'Dr. Emily Chen',
    subjects: { name: 'Computer Networks' },
    faculty: { name: 'Dr. Emily Chen' }
  },
  {
    id: 'tt-004',
    day_of_week: 1,
    start_time: '14:00',
    end_time: '15:00',
    room_location: 'CS-302',
    teacher: 'Prof. Michael Rodriguez',
    subjects: { name: 'Database Management Systems' },
    faculty: { name: 'Prof. Michael Rodriguez' }
  },
  
  // Tuesday
  {
    id: 'tt-005',
    day_of_week: 2,
    start_time: '09:00',
    end_time: '10:00',
    room_location: 'CS-303',
    teacher: 'Dr. Lisa Thompson',
    subjects: { name: 'Software Engineering' },
    faculty: { name: 'Dr. Lisa Thompson' }
  },
  {
    id: 'tt-006',
    day_of_week: 2,
    start_time: '10:15',
    end_time: '11:15',
    room_location: 'CS-201',
    teacher: 'Prof. James Wilson',
    subjects: { name: 'Operating Systems' },
    faculty: { name: 'Prof. James Wilson' }
  },
  {
    id: 'tt-007',
    day_of_week: 2,
    start_time: '11:30',
    end_time: '12:30',
    room_location: 'CS-Graphics-Lab',
    teacher: 'Dr. Angela Park',
    subjects: { name: 'Computer Graphics Lab' },
    faculty: { name: 'Dr. Angela Park' }
  },
  {
    id: 'tt-008',
    day_of_week: 2,
    start_time: '15:15',
    end_time: '16:15',
    room_location: 'CS-AI-Lab',
    teacher: 'Prof. Robert Singh',
    subjects: { name: 'Machine Learning Fundamentals' },
    faculty: { name: 'Prof. Robert Singh' }
  },

  // Wednesday
  {
    id: 'tt-009',
    day_of_week: 3,
    start_time: '09:00',
    end_time: '10:00',
    room_location: 'CS-301',
    teacher: 'Dr. Sarah Mitchell',
    subjects: { name: 'Advanced Mathematics' },
    faculty: { name: 'Dr. Sarah Mitchell' }
  },
  {
    id: 'tt-010',
    day_of_week: 3,
    start_time: '10:15',
    end_time: '11:15',
    room_location: 'CS-205',
    teacher: 'Dr. Emily Chen',
    subjects: { name: 'Computer Networks' },
    faculty: { name: 'Dr. Emily Chen' }
  },
  {
    id: 'tt-011',
    day_of_week: 3,
    start_time: '11:30',
    end_time: '12:30',
    room_location: 'CS-DB-Lab',
    teacher: 'Prof. Michael Rodriguez',
    subjects: { name: 'Database Management Systems Lab' },
    faculty: { name: 'Prof. Michael Rodriguez' }
  },
  {
    id: 'tt-012',
    day_of_week: 3,
    start_time: '14:00',
    end_time: '15:00',
    room_location: 'CS-303',
    teacher: 'Dr. Lisa Thompson',
    subjects: { name: 'Software Engineering' },
    faculty: { name: 'Dr. Lisa Thompson' }
  },

  // Thursday
  {
    id: 'tt-013',
    day_of_week: 4,
    start_time: '09:00',
    end_time: '10:00',
    room_location: 'CS-Lab-B',
    teacher: 'Prof. David Kumar',
    subjects: { name: 'Data Structures & Algorithms' },
    faculty: { name: 'Prof. David Kumar' }
  },
  {
    id: 'tt-014',
    day_of_week: 4,
    start_time: '10:15',
    end_time: '11:15',
    room_location: 'CS-201',
    teacher: 'Prof. James Wilson',
    subjects: { name: 'Operating Systems' },
    faculty: { name: 'Prof. James Wilson' }
  },
  {
    id: 'tt-015',
    day_of_week: 4,
    start_time: '11:30',
    end_time: '12:30',
    room_location: 'CS-304',
    teacher: 'Dr. Angela Park',
    subjects: { name: 'Computer Graphics' },
    faculty: { name: 'Dr. Angela Park' }
  },
  {
    id: 'tt-016',
    day_of_week: 4,
    start_time: '15:15',
    end_time: '16:15',
    room_location: 'CS-AI-Lab',
    teacher: 'Prof. Robert Singh',
    subjects: { name: 'Machine Learning Fundamentals Lab' },
    faculty: { name: 'Prof. Robert Singh' }
  },

  // Friday
  {
    id: 'tt-017',
    day_of_week: 5,
    start_time: '09:00',
    end_time: '10:00',
    room_location: 'CS-302',
    teacher: 'Prof. Michael Rodriguez',
    subjects: { name: 'Database Management Systems' },
    faculty: { name: 'Prof. Michael Rodriguez' }
  },
  {
    id: 'tt-018',
    day_of_week: 5,
    start_time: '10:15',
    end_time: '11:15',
    room_location: 'CS-Networks-Lab',
    teacher: 'Dr. Emily Chen',
    subjects: { name: 'Computer Networks Lab' },
    faculty: { name: 'Dr. Emily Chen' }
  },
  {
    id: 'tt-019',
    day_of_week: 5,
    start_time: '11:30',
    end_time: '12:30',
    room_location: 'CS-305',
    teacher: 'Dr. Lisa Thompson',
    subjects: { name: 'Software Engineering Project' },
    faculty: { name: 'Dr. Lisa Thompson' }
  }
];

export const dummyExams = [
  {
    id: 'exam-001',
    subject: 'Advanced Mathematics',
    exam_date: '2025-01-08',
    start_time: '09:00',
    duration_minutes: 180,
    room: 'Examination Hall - A',
    exam_type: 'End Semester',
    max_score: 100,
    syllabus_coverage: 'Differential Equations, Vector Calculus, Complex Analysis (Chapters 1-12)'
  },
  {
    id: 'exam-002',
    subject: 'Data Structures & Algorithms',
    exam_date: '2025-01-10',
    start_time: '14:00',
    duration_minutes: 180,
    room: 'Examination Hall - B',
    exam_type: 'End Semester',
    max_score: 100,
    syllabus_coverage: 'Trees, Graphs, Dynamic Programming, Advanced Sorting (All modules)'
  },
  {
    id: 'exam-003',
    subject: 'Computer Networks',
    exam_date: '2025-01-12',
    start_time: '09:00',
    duration_minutes: 180,
    room: 'Examination Hall - C',
    exam_type: 'End Semester',
    max_score: 100,
    syllabus_coverage: 'OSI Model, TCP/IP, Network Security, Wireless Networks'
  },
  {
    id: 'exam-004',
    subject: 'Database Management Systems',
    exam_date: '2025-01-14',
    start_time: '14:00',
    duration_minutes: 180,
    room: 'Examination Hall - A',
    exam_type: 'End Semester',
    max_score: 100,
    syllabus_coverage: 'SQL, Normalization, Transactions, NoSQL (Complete syllabus)'
  },
  {
    id: 'exam-005',
    subject: 'Software Engineering',
    exam_date: '2025-01-16',
    start_time: '09:00',
    duration_minutes: 180,
    room: 'Examination Hall - B',
    exam_type: 'End Semester',
    max_score: 100,
    syllabus_coverage: 'SDLC, Agile, Testing, Project Management (Modules 1-8)'
  },
  {
    id: 'exam-006',
    subject: 'Operating Systems',
    exam_date: '2025-01-18',
    start_time: '14:00',
    duration_minutes: 180,
    room: 'Examination Hall - C',
    exam_type: 'End Semester',
    max_score: 100,
    syllabus_coverage: 'Process Management, Memory Management, File Systems, Deadlocks'
  },
  {
    id: 'exam-007',
    subject: 'Computer Graphics',
    exam_date: '2025-01-20',
    start_time: '09:00',
    duration_minutes: 180,
    room: 'Examination Hall - D',
    exam_type: 'End Semester',
    max_score: 100,
    syllabus_coverage: '2D/3D Transformations, Rendering, Animation, OpenGL (Full syllabus)'
  },
  {
    id: 'exam-008',
    subject: 'Machine Learning Fundamentals',
    exam_date: '2025-01-22',
    start_time: '14:00',
    duration_minutes: 180,
    room: 'Examination Hall - A',
    exam_type: 'End Semester',
    max_score: 100,
    syllabus_coverage: 'Supervised Learning, Unsupervised Learning, Neural Networks, Evaluation Metrics'
  }
];
