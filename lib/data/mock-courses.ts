export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  totalPoints: number;
  courseCode?: string;
  courseName?: string;
  courseId?: string;
}

export interface Course {
  id: string;
  slug: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  progress: number; // 0 to 100
  status: 'active' | 'completed' | 'dropped';
  schedule: string;
  room: string;
  description: string;
  assignments: Assignment[];
}

export const mockCourses: Course[] = [
  {
    id: "c_001",
    slug: "cs101",
    code: "CS101",
    name: "Introduction to Computer Science",
    instructor: "Dr. Alan Turing",
    credits: 4,
    progress: 45,
    status: 'active',
    schedule: "Mon/Wed 10:00 AM - 11:30 AM",
    room: "Building A, Room 102",
    description: "An introductory course to the fundamentals of computer science, algorithms, and programming.",
    assignments: [
      { id: "a_1", title: "Hello World Project", description: "Write your first program in Python that prints 'Hello World' to the console. Submit the .py file.", dueDate: "2023-09-15", status: "graded", score: 100, totalPoints: 100 },
      { id: "a_2", title: "Binary Trees", description: "Implement a Binary Search Tree data structure with insert, delete, and search methods.", dueDate: "2023-10-10", status: "submitted", totalPoints: 100 },
      { id: "a_3", title: "Final Exam", description: "Comprehensive final exam covering all topics from the semester.", dueDate: "2023-12-15", status: "pending", totalPoints: 200 }
    ]
  },
  {
    id: "c_002",
    slug: "math201",
    code: "MATH201",
    name: "Calculus II",
    instructor: "Prof. Isaac Newton",
    credits: 3,
    progress: 70,
    status: 'active',
    schedule: "Tue/Thu 1:00 PM - 2:15 PM",
    room: "Science Center, Room 405",
    description: "Advanced calculus covering integration techniques, sequences, and series.",
    assignments: [
      { id: "m_1", title: "Integration Quiz", description: "In-class quiz on integration by parts and partial fractions.", dueDate: "2023-09-20", status: "graded", score: 85, totalPoints: 100 },
      { id: "m_2", title: "Midterm", description: "Midterm examination covering chapters 1 through 4.", dueDate: "2023-10-25", status: "pending", totalPoints: 100 }
    ]
  },
  {
    id: "c_003",
    slug: "phy105",
    code: "PHY105",
    name: "Physics for Engineers",
    instructor: "Dr. Marie Curie",
    credits: 4,
    progress: 15,
    status: 'active',
    schedule: "Mon/Wed/Fri 9:00 AM - 9:50 AM",
    room: "Lab 3",
    description: "Mechanics, thermodynamics, and waves with laboratory components.",
    assignments: [
      { id: "p_1", title: "Lab Report 1", description: "Submit the lab report for the projectile motion experiment.", dueDate: "2023-09-10", status: "graded", score: 92, totalPoints: 100 },
      { id: "p_2", title: "Dynamics Problem Set", description: "Solve problems 1-15 from Chapter 3 of the textbook.", dueDate: "2023-09-28", status: "pending", totalPoints: 50 }
    ]
  }
];

export function getEnrolledCourses(): Course[] {
  return mockCourses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return mockCourses.find(c => c.slug === slug);
}

export function getAllAssignments(): Assignment[] {
  const allAssignments: Assignment[] = [];
  mockCourses.forEach(course => {
    course.assignments.forEach(assignment => {
      allAssignments.push({
        ...assignment,
        courseCode: course.code,
        courseName: course.name,
        courseId: course.slug
      });
    });
  });
  
  // Sort by due date
  return allAssignments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}

export function getAssignmentById(id: string): Assignment | undefined {
  return getAllAssignments().find(a => a.id === id);
}

// --- NEW MOCK DATA: Notes ---
export interface Note {
  id: string;
  courseId?: string;
  title: string;
  content: string;
  createdAt: string;
}

export const mockNotes: Note[] = [
  { id: "n_1", courseId: "cs101", title: "Variables and Data Types", content: "Python has dynamic typing. Integers, floats, strings, booleans.", createdAt: "2023-09-02" },
  { id: "n_2", courseId: "math201", title: "Integration by Parts Formula", content: "∫ u dv = uv - ∫ v du. Remember LIATE for choosing u.", createdAt: "2023-09-15" }
];

// --- NEW MOCK DATA: Study Sessions ---
export interface StudySession {
  id: string;
  courseId?: string;
  topic: string;
  durationMinutes: number;
  studyDate: string;
  notes: string;
}

export const mockStudySessions: StudySession[] = [
  { id: "s_1", courseId: "phy105", topic: "Projectile Motion Problems", durationMinutes: 120, studyDate: "2023-09-08", notes: "Completed chapter 3 exercises." },
  { id: "s_2", courseId: "cs101", topic: "Binary Search Tree Implementation", durationMinutes: 90, studyDate: "2023-10-09", notes: "Struggled with deletion cases." }
];

// --- NEW MOCK DATA: AI Conversations ---
export interface AIConversation {
  id: string;
  title: string;
  mode: 'chat' | 'summarize' | 'explain' | 'quiz' | 'flashcards' | 'study-plan';
  createdAt: string;
}

export const mockConversations: AIConversation[] = [
  { id: "chat_1", title: "Explain Dynamic Typing", mode: "explain", createdAt: "2023-09-03" },
  { id: "chat_2", title: "Midterm Study Plan", mode: "study-plan", createdAt: "2023-10-20" }
];
