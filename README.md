# 🎓 Studix

Studix is an intelligent, modern dashboard designed exclusively for students. Built with Next.js 15 and powered by AI, it seamlessly blends course management, note-taking, and an integrated AI Assistant into a beautiful, performant workspace. 

## 🚀 Features

- **🤖 Intelligent AI Assistant:** Chat with your notes! Ask questions, get summaries, and interact with course materials in real-time. Built on the Vercel AI SDK with dynamic routing to OpenAI or OpenRouter models.
- **🔐 Secure Authentication:** Enterprise-grade security out-of-the-box powered by Supabase.
- **📚 Course & Notes Management:** Effortlessly manage your curriculum. Upload PDFs, organize course notes, and let the built-in PDF parsing automatically digitize your documents.
- **📅 Assignment Tracking:** Never miss a deadline. Track upcoming assignments, filter by status, and monitor progress across all your courses.
- **💅 Beautiful UI:** Designed with a sleek, modern aesthetic using Tailwind CSS and Radix Primitives (shadcn/ui), supporting full dark/light mode functionality.
- **🐛 Bulletproof Reliability:** Deep integration with Sentry.io ensures immediate, automated bug tracking and error reporting.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **AI Infrastructure:** [Vercel AI SDK](https://sdk.vercel.ai/) 
- **Email:** [Resend](https://resend.com/)
- **Monitoring:** [Sentry](https://sentry.io/)

## 💻 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sanaullah-01/Studix.git
   cd Studix
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # AI Provider (Set one of these)
   OPENAI_API_KEY=your_openai_api_key
   OPENROUTER_API_KEY=your_openrouter_api_key

   # Email & Monitoring
   RESEND_API_KEY=your_resend_api_key
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser!

## 🚀 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). 
Simply push to your main branch, connect the GitHub repository to Vercel, inject the environment variables into the Vercel dashboard, and click deploy!
