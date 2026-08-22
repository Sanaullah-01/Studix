# Studix — Project Specification

> Version: 1.0
> Status: Active
> Project Type: AI-Powered Student Management System
> Architecture: Full-Stack Next.js
> Database: Supabase PostgreSQL
> AI Provider: OpenRouter
> Email Provider: Resend
> Monitoring: Sentry
> API Documentation: Swagger / OpenAPI
> Bot Protection: Google reCAPTCHA
> Authentication: Supabase Auth + MFA/2FA
> Deployment Target: Vercel

---

# 1. Project Overview

## 1.1 Project Name

Studix

## 1.2 Project Description

Studix is a modern, secure, AI-powered Student Management System built with Next.js and Supabase.

The system allows students to manage their academic activities from a centralized platform.

Students can:

- Manage their profile
- Manage courses
- Manage assignments
- Create and organize notes
- Track study sessions
- Monitor academic progress
- Use an AI Study Assistant
- Generate summaries
- Generate quizzes
- Generate flashcards
- Generate personalized study plans
- Have general academic conversations with AI

The system also includes production-oriented infrastructure:

- Secure authentication
- Email verification
- MFA/2FA
- Google reCAPTCHA
- Transactional email through Resend
- REST API endpoints
- Swagger/OpenAPI documentation
- Sentry error monitoring
- Row Level Security
- Input validation
- Secure server-side API integrations

---

# 2. Project Goals

The primary goals are:

1. Build a complete full-stack application using Next.js.
2. Use Supabase PostgreSQL as the primary database.
3. Use Supabase Auth for authentication.
4. Implement MFA/2FA.
5. Protect registration using Google reCAPTCHA.
6. Send a welcome email using Resend after first registration.
7. Build REST APIs using Next.js Route Handlers.
8. Document important APIs using Swagger/OpenAPI.
9. Integrate Sentry for monitoring and error tracking.
10. Integrate OpenRouter for AI functionality.
11. Build a dedicated AI Study Assistant page.
12. Implement proper database security using Supabase RLS.
13. Maintain a clean, scalable project architecture.
14. Deploy the application using Vercel.

---

# 3. Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js App Router
- Next.js Route Handlers
- Server Components where appropriate
- Server Actions only where appropriate

## Database

- Supabase
- PostgreSQL

## Authentication

- Supabase Auth
- Email/password authentication
- Email verification
- MFA/2FA

## AI

- OpenRouter API

## Email

- Resend

## Security

- Google reCAPTCHA
- Supabase Row Level Security
- Zod validation

## Monitoring

- Sentry

## API Documentation

- Swagger/OpenAPI

## Version Control

- Git
- GitHub

## Deployment

- Vercel

---

# 4. Architecture

The application is a single Next.js project.

There is no separate Express backend.

Architecture:

    Browser
       |
       v
    Next.js
       |
       +--------------------+
       |                    |
       v                    v
    UI Layer          Route Handlers
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
          Supabase      OpenRouter      Resend
              |
              v
          PostgreSQL

Additional services:

    Google reCAPTCHA
            |
            v
       Authentication

    Sentry
       |
       v
    Frontend + Backend Monitoring

    Swagger/OpenAPI
       |
       v
    API Documentation

---

# 5. Application Structure

The application consists of the following major modules:

1. Authentication
2. Student Profile
3. Dashboard
4. Courses
5. Assignments
6. Notes
7. Study Sessions
8. Progress Analytics
9. AI Study Assistant
10. AI Conversations
11. API Documentation
12. Monitoring

---

# 6. User Roles

## Version 1

Only one role is required:

### Student

Students can:

- Register
- Login
- Logout
- Verify email
- Enable/use MFA
- Manage profile
- Manage courses
- Manage assignments
- Manage notes
- Manage study sessions
- View academic progress
- Use AI Assistant
- Manage AI conversations

Do not implement Admin or Teacher roles in Version 1.

They may be introduced in a future version.

---

# 7. Authentication Requirements

Authentication must use Supabase Auth.

## Registration

Registration requires:

- Full name
- Email
- Password
- Confirm password
- Student ID
- Department
- Semester
- Google reCAPTCHA verification

Flow:

    Registration Form
           |
           v
    Client Validation
           |
           v
    reCAPTCHA
           |
           v
    Server-side reCAPTCHA Verification
           |
           v
    Supabase Auth Sign Up
           |
           v
    Create Profile
           |
           v
    Send Welcome Email
           |
           v
    Email Verification
           |
           v
    Login

---

# 8. Login Requirements

Login uses Supabase Auth.

Required:

- Email
- Password

If MFA is enabled:

    Email + Password
          |
          v
    MFA Challenge
          |
          v
    Verification
          |
          v
    Dashboard

---

# 9. MFA / 2FA

Use Supabase MFA capabilities.

Do NOT build a custom OTP authentication system unless explicitly required.

The application should provide:

- Enable MFA
- Enroll MFA factor
- Verify MFA factor
- Disable MFA where supported
- MFA challenge during login when required

Authentication security must remain server-side where appropriate.

---

# 10. Google reCAPTCHA

Google reCAPTCHA must protect the registration flow.

Flow:

    Registration Form
          |
          v
    reCAPTCHA Token
          |
          v
    Next.js Server
          |
          v
    Google Verification
          |
       +--+--+
       |     |
     Valid Invalid
       |     |
       v     v
    Continue Reject

The secret key must never be exposed to the client.

---

# 11. Resend Email Integration

Resend is used for transactional email.

## Welcome Email

After successful first registration, send a welcome email.

The email must only be sent once.

Use:

    welcome_email_sent

in the profiles table.

Flow:

    Registration Successful
             |
             v
    Check welcome_email_sent
             |
       +-----+-----+
       |           |
     false        true
       |           |
       v           v
    Send Email    Skip
       |
       v
    Set true

The welcome email should contain:

- Student name
- Welcome message
- Studix introduction
- Dashboard link

The Resend API key must remain server-side.

---

# 12. Database Schema

Database: Supabase PostgreSQL

---

## 12.1 profiles

Fields:

    id UUID PRIMARY KEY
    full_name TEXT NOT NULL
    email TEXT NOT NULL
    student_id TEXT UNIQUE
    department TEXT
    semester INTEGER
    avatar_url TEXT
    welcome_email_sent BOOLEAN DEFAULT FALSE
    created_at TIMESTAMPTZ DEFAULT NOW()
    updated_at TIMESTAMPTZ DEFAULT NOW()

The `id` corresponds to the Supabase Auth user ID.

---

# 12.2 courses

Fields:

    id UUID PRIMARY KEY
    student_id UUID NOT NULL
    name TEXT NOT NULL
    code TEXT
    instructor TEXT
    description TEXT
    semester INTEGER
    created_at TIMESTAMPTZ DEFAULT NOW()
    updated_at TIMESTAMPTZ DEFAULT NOW()

Relationship:

    profiles 1 ---- N courses

---

# 12.3 assignments

Fields:

    id UUID PRIMARY KEY
    student_id UUID NOT NULL
    course_id UUID NOT NULL
    title TEXT NOT NULL
    description TEXT
    due_date TIMESTAMPTZ
    priority TEXT
    status TEXT
    created_at TIMESTAMPTZ DEFAULT NOW()
    updated_at TIMESTAMPTZ DEFAULT NOW()

Priority values:

    low
    medium
    high

Status values:

    pending
    in_progress
    completed

Relationship:

    courses 1 ---- N assignments

---

# 12.4 notes

Fields:

    id UUID PRIMARY KEY
    student_id UUID NOT NULL
    course_id UUID
    title TEXT NOT NULL
    content TEXT NOT NULL
    created_at TIMESTAMPTZ DEFAULT NOW()
    updated_at TIMESTAMPTZ DEFAULT NOW()

Relationship:

    courses 1 ---- N notes

---

# 12.5 study_sessions

Fields:

    id UUID PRIMARY KEY
    student_id UUID NOT NULL
    course_id UUID
    topic TEXT
    duration INTEGER
    study_date DATE
    notes TEXT
    created_at TIMESTAMPTZ DEFAULT NOW()

Duration is stored in minutes.

---

# 12.6 ai_conversations

Fields:

    id UUID PRIMARY KEY
    student_id UUID NOT NULL
    title TEXT
    mode TEXT
    created_at TIMESTAMPTZ DEFAULT NOW()
    updated_at TIMESTAMPTZ DEFAULT NOW()

Modes:

    chat
    summarize
    explain
    quiz
    flashcards
    study-plan

---

# 12.7 ai_messages

Fields:

    id UUID PRIMARY KEY
    conversation_id UUID NOT NULL
    role TEXT NOT NULL
    content TEXT NOT NULL
    created_at TIMESTAMPTZ DEFAULT NOW()

Allowed roles:

    user
    assistant
    system

---

# 13. Database Relationships

    profiles
       |
       +---- courses
       |       |
       |       +---- assignments
       |       |
       |       +---- notes
       |
       +---- assignments
       |
       +---- study_sessions
       |
       +---- ai_conversations
                    |
                    +---- ai_messages

Every student-owned record must be associated with the authenticated user's ID.

---

# 14. Row Level Security

Supabase RLS is mandatory.

Students must only access their own data.

Conceptually:

    auth.uid() = student_id

For profiles:

    auth.uid() = id

For courses:

    auth.uid() = student_id

For assignments:

    auth.uid() = student_id

For notes:

    auth.uid() = student_id

For study sessions:

    auth.uid() = student_id

For AI conversations:

    auth.uid() = student_id

AI messages must only be accessible through conversations belonging to the authenticated user.

Never disable RLS simply to make an API work.

---

# 15. API Architecture

All backend APIs use Next.js Route Handlers.

Base:

    /api

---

# 16. API Route Map

## Profile

    GET    /api/profile
    PUT    /api/profile

---

## Courses

    GET    /api/courses
    POST   /api/courses

    GET    /api/courses/[id]
    PUT    /api/courses/[id]
    DELETE /api/courses/[id]

---

## Assignments

    GET    /api/assignments
    POST   /api/assignments

    GET    /api/assignments/[id]
    PUT    /api/assignments/[id]
    DELETE /api/assignments/[id]

---

## Notes

    GET    /api/notes
    POST   /api/notes

    GET    /api/notes/[id]
    PUT    /api/notes/[id]
    DELETE /api/notes/[id]

---

## Study Sessions

    GET    /api/study-sessions
    POST   /api/study-sessions

    GET    /api/study-sessions/[id]
    PUT    /api/study-sessions/[id]
    DELETE /api/study-sessions/[id]

---

## Dashboard

    GET /api/dashboard/stats
    GET /api/dashboard/upcoming
    GET /api/dashboard/activity

---

## AI

    POST /api/ai/chat

    GET  /api/ai/conversations
    POST /api/ai/conversations

    GET    /api/ai/conversations/[id]
    DELETE /api/ai/conversations/[id]

---

# 17. API Standards

All APIs must:

- Validate input
- Authenticate protected requests
- Respect RLS
- Return meaningful HTTP status codes
- Return consistent JSON responses
- Handle errors safely
- Never expose secrets
- Never expose internal stack traces in production

Recommended response format:

Success:

    {
      "success": true,
      "data": {}
    }

Error:

    {
      "success": false,
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid request data"
      }
    }

---

# 18. Validation

Use Zod for request validation.

Validation schemas should exist in:

    validations/

Validate:

- Authentication input
- Course input
- Assignment input
- Note input
- Study session input
- AI requests
- Query parameters where appropriate

Never trust client-side validation alone.

---

# 19. AI Study Assistant

The AI Study Assistant is a major feature.

It should have a dedicated page:

    /ai

The page provides:

- General Chat
- Summarize Notes
- Explain Topic
- Generate Quiz
- Generate Flashcards
- Generate Study Plan

---

# 20. AI Architecture

Frontend:

    /ai

Backend:

    POST /api/ai/chat

Server:

    Validate User
       |
       v
    Validate Request
       |
       v
    Determine Mode
       |
       v
    Build Prompt
       |
       v
    OpenRouter API
       |
       v
    Validate AI Response
       |
       v
    Save Conversation
       |
       v
    Return Result

The OpenRouter API key must never be exposed to the frontend.

---

# 21. AI Modes

## chat

General academic conversation.

Example:

    Explain TCP vs UDP in simple terms.

---

## summarize

Input:

    Lecture notes

Output:

    Structured summary

---

## explain

Input:

    Topic

Output:

    Beginner-friendly explanation.

---

## quiz

Input:

- Topic
- Difficulty
- Question count

Output should preferably be structured JSON.

Example:

    {
      "questions": [
        {
          "question": "...",
          "options": ["...", "...", "...", "..."],
          "correctAnswer": 0,
          "explanation": "..."
        }
      ]
    }

---

## flashcards

Output:

    [
      {
        "front": "...",
        "back": "..."
      }
    ]

---

## study-plan

Input:

- Subject
- Topics
- Available study time
- Target date

Output:

- Daily plan
- Topics
- Activities
- Recommended duration

---

# 22. AI Conversations

Users can:

- Create conversation
- Send messages
- View previous conversations
- Rename conversation
- Delete conversation
- Continue previous conversation

AI conversations must belong to the authenticated student.

---

# 23. AI Page UI

The AI page should use a modern two-panel layout.

Left panel:

    AI Tools

    + New Chat

    General Chat
    Summarize Notes
    Explain Topic
    Generate Quiz
    Flashcards
    Study Plan

    Conversation History

Right panel:

    AI Study Assistant

    Messages

    Input
    Send Button

The UI should be responsive on desktop, tablet and mobile.

---

# 24. Swagger / OpenAPI

Swagger/OpenAPI documentation is mandatory.

Documentation should cover all important REST APIs.

The documentation should include:

- Endpoint
- HTTP method
- Description
- Authentication
- Request parameters
- Request body
- Response body
- Status codes
- Error responses

Suggested documentation route:

    /api/docs

OpenAPI JSON/YAML should also be available where practical.

---

# 25. Sentry

Sentry must monitor:

- Client-side errors
- Server-side errors
- API errors
- Unexpected exceptions

Integrate Sentry with Next.js using the official supported approach.

Create a controlled test error for verification.

Example:

    GET /api/test/sentry

This endpoint is for development/testing only and must not remain publicly dangerous in production.

The error should be visible in the Sentry dashboard.

---

# 26. Dashboard

Dashboard should display:

## Statistics

- Total courses
- Pending assignments
- Completed assignments
- Study hours
- Overall progress

## Upcoming Assignments

Display upcoming assignments ordered by due date.

## Course Progress

Display course-level progress.

## Recent Activity

Display recent:

- Assignment updates
- Notes
- Study sessions
- AI activity where appropriate

---

# 27. Course Module

Features:

- Course list
- Course details
- Create course
- Edit course
- Delete course
- Course progress
- Course assignments
- Course notes

---

# 28. Assignment Module

Features:

- Assignment list
- Create
- Edit
- Delete
- Mark complete
- Priority
- Deadline
- Status filter
- Priority filter
- Sorting

---

# 29. Notes Module

Features:

- Create notes
- Edit notes
- Delete notes
- Search notes
- Associate with course
- Send note to AI summarizer
- Send note to AI explainer

---

# 30. Study Session Module

Students can record:

- Course
- Topic
- Duration
- Date
- Notes

Duration is stored in minutes.

Dashboard uses study session data for analytics.

---

# 31. Progress Analytics

The application should calculate:

- Assignment completion rate
- Course progress
- Total study hours
- Weekly study activity
- Completed tasks

Avoid hardcoded statistics.

---

# 32. Folder Structure

The expected project structure is:

    Studix/
    │
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/
    │   │   ├── register/
    │   │   ├── verify-email/
    │   │   └── mfa/
    │   │
    │   ├── dashboard/
    │   ├── courses/
    │   ├── assignments/
    │   ├── notes/
    │   ├── study/
    │   ├── ai/
    │   ├── profile/
    │   ├── settings/
    │   │
    │   ├── api/
    │   │   ├── auth/
    │   │   ├── profile/
    │   │   ├── courses/
    │   │   ├── assignments/
    │   │   ├── notes/
    │   │   ├── study-sessions/
    │   │   ├── dashboard/
    │   │   └── ai/
    │   │
    │   ├── docs/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    │
    ├── components/
    │   ├── ui/
    │   ├── layout/
    │   ├── dashboard/
    │   ├── courses/
    │   ├── assignments/
    │   ├── notes/
    │   ├── ai/
    │   └── auth/
    │
    ├── lib/
    │   ├── supabase/
    │   ├── openrouter/
    │   ├── resend/
    │   ├── recaptcha/
    │   ├── sentry/
    │   └── swagger/
    │
    ├── hooks/
    ├── types/
    ├── validations/
    │
    ├── supabase/
    │   ├── migrations/
    │   └── seed.sql
    │
    ├── public/
    │
    ├── middleware.ts
    ├── next.config.ts
    ├── sentry.client.config.ts
    ├── sentry.server.config.ts
    ├── instrumentation.ts
    ├── openapi.yaml
    ├── .env.local
    ├── .env.example
    ├── package.json
    └── README.md

The exact structure may be adjusted if required by the current Next.js version, but architectural separation must be preserved.

---

# 33. Environment Variables

Required environment variables include:

    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=

    SUPABASE_SERVICE_ROLE_KEY=

    OPENROUTER_API_KEY=

    RESEND_API_KEY=
    RESEND_FROM_EMAIL=

    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
    RECAPTCHA_SECRET_KEY=

    NEXT_PUBLIC_SENTRY_DSN=
    SENTRY_AUTH_TOKEN=
    SENTRY_ORG=
    SENTRY_PROJECT=

Never commit real values to Git.

`.env.example` must contain variable names but no secrets.

---

# 34. Security Requirements

Security is a first-class requirement.

## Never expose:

- OpenRouter API key
- Resend API key
- Supabase service role key
- reCAPTCHA secret
- Sentry auth token

## Must implement:

- Supabase Auth
- MFA
- Email verification
- RLS
- Server-side reCAPTCHA verification
- Zod validation
- Protected API routes
- Proper authorization
- Safe error responses
- Secure environment variables

---

# 35. Error Handling

Use centralized error handling patterns.

Expected error categories:

    VALIDATION_ERROR
    AUTHENTICATION_ERROR
    AUTHORIZATION_ERROR
    NOT_FOUND
    CONFLICT
    RATE_LIMITED
    AI_ERROR
    DATABASE_ERROR
    INTERNAL_ERROR

Never expose sensitive implementation details to users.

Detailed errors should be available through server logs/Sentry.

---

# 36. UI/UX Requirements

The interface should be:

- Modern
- Clean
- Responsive
- Accessible
- Consistent
- Student-focused

Use:

- Responsive sidebar
- Dashboard cards
- Tables where appropriate
- Cards for courses
- Modal/dialog forms
- Toast notifications
- Loading states
- Empty states
- Error states
- Confirmation dialogs for destructive actions

Do not overuse animations.

---

# 37. Coding Standards

Use:

- TypeScript
- Functional React components
- Server Components where appropriate
- Client Components only when required
- Reusable components
- Reusable utility functions
- Zod schemas
- Strong typing

Avoid:

- `any`
- Duplicate code
- Hardcoded API keys
- Hardcoded user data
- Hardcoded dashboard statistics
- Giant components
- Unnecessary dependencies

---

# 38. Testing Requirements

Every implemented feature must be tested.

Test:

- Authentication
- Authorization
- CRUD operations
- RLS
- Validation
- AI
- reCAPTCHA
- Resend
- Swagger
- Sentry

Also test failure cases.

Examples:

- Invalid login
- Invalid registration
- Unauthorized API request
- Invalid course ID
- Missing fields
- Unauthorized record access
- AI failure
- Email failure
- reCAPTCHA failure

---

# 39. Implementation Phases

## Phase 0 — Planning

- Read specification
- Establish architecture
- Establish coding conventions

## Phase 1 — Next.js Foundation

- Next.js
- TypeScript
- Tailwind
- Layout
- Navigation
- UI foundation

## Phase 2 — Supabase Foundation

- Supabase connection
- Database schema
- Migrations
- RLS
- Types

## Phase 3 — Authentication

- Registration
- Login
- Logout
- Email verification
- Protected routes
- Session management
- Profile creation
- MFA/2FA foundation

## Phase 4 — Security Services

- Google reCAPTCHA
- Resend
- Welcome email
- MFA completion

## Phase 5 — Student Profile

- Profile page
- Edit profile
- Avatar
- Student information

## Phase 6 — Courses

- Complete CRUD
- Course details
- Course progress

## Phase 7 — Assignments

- Complete CRUD
- Status
- Priority
- Due dates
- Filtering

## Phase 8 — Notes

- Complete CRUD
- Search
- Course association

## Phase 9 — Study Sessions and Analytics

- Study sessions
- Dashboard calculations
- Progress analytics

## Phase 10 — AI Foundation

- OpenRouter
- `/api/ai/chat`
- General chat
- AI error handling

## Phase 11 — AI Features

- Summarizer
- Explainer
- Quiz generator
- Flashcards
- Study planner

## Phase 12 — AI Conversations

- Conversation creation
- History
- Persistence
- Rename
- Delete

## Phase 13 — Swagger

- OpenAPI specification
- API documentation
- Swagger UI
- Test APIs

## Phase 14 — Sentry

- Client integration
- Server integration
- API monitoring
- Test error

## Phase 15 — Security Hardening

- RLS review
- Authorization review
- Validation review
- Secret review
- Rate limiting where appropriate

## Phase 16 — Testing

- Feature testing
- Error testing
- Security testing
- Production build

## Phase 17 — Deployment

- GitHub
- Vercel
- Production environment variables
- Production verification

## Phase 18 — Documentation

- README
- Architecture
- Setup instructions
- API documentation
- Screenshots
- Deployment instructions

---

# 40. Phase Discipline

The complete specification describes the final product.

However, the AI coding agent MUST only implement the phase explicitly requested by the user.

For example:

If the user requests Phase 6, do not automatically implement:

- Assignments
- AI
- Swagger
- Sentry

unless they are required dependencies for Phase 6.

---

# 41. Future Features

Potential future features:

- Teacher accounts
- Admin dashboard
- Attendance
- Grades
- Classrooms
- Announcements
- Calendar
- Notifications
- File uploads
- Advanced analytics
- AI personalized tutoring
- AI document processing

These are NOT part of Version 1.

---

# 42. Definition of Done

A phase is complete only when:

1. Requested functionality is implemented.
2. Existing functionality still works.
3. TypeScript errors are resolved.
4. Lint errors are resolved.
5. Production build succeeds where applicable.
6. Feature has been manually tested.
7. Security implications have been reviewed.
8. No unrelated features were implemented.
9. Changes are clearly reported.

---

# 43. Project Completion Criteria

Studix is considered complete when:

- Authentication works
- MFA works
- Email verification works
- reCAPTCHA works
- Welcome email works
- Profile management works
- Courses CRUD works
- Assignments CRUD works
- Notes CRUD works
- Study sessions work
- Dashboard analytics work
- AI Assistant works
- AI conversations work
- Swagger documents APIs
- Sentry captures errors
- RLS protects student data
- Application is deployed
- README is complete

---

# END OF PROJECT SPECIFICATION

