import { PublicHeader } from "@/components/layout/public-header";
import { BotMessageSquare, Sparkles, BookText } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />
      <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Everything you need to succeed.</h1>
          <p className="text-lg text-muted-foreground">Studix combines traditional academic management with cutting-edge artificial intelligence to give you a personalized study experience.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-4 bg-muted/30 p-8 rounded-2xl border">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary">
              <BotMessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">AI Study Assistant</h3>
            <p className="text-muted-foreground leading-relaxed">Chat directly with your study materials. Our OpenRouter-powered AI can explain difficult concepts, summarize long texts, and generate practice quizzes in seconds.</p>
            <ul className="space-y-2 text-sm font-medium mt-4">
              <li className="flex items-center"><Sparkles className="h-4 w-4 mr-2 text-primary" /> Auto-generate Flashcards</li>
              <li className="flex items-center"><Sparkles className="h-4 w-4 mr-2 text-primary" /> Personalized Study Plans</li>
              <li className="flex items-center"><Sparkles className="h-4 w-4 mr-2 text-primary" /> Multi-model AI support (Llama, Gemini, Claude)</li>
            </ul>
          </div>

          <div className="space-y-4 bg-muted/30 p-8 rounded-2xl border">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary">
              <BookText className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">Notes & Organization</h3>
            <p className="text-muted-foreground leading-relaxed">Keep all your lecture notes in one place. Associate notes directly with your enrolled courses and access them from any device, anywhere.</p>
          </div>
        </div>
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-muted/20">
        <p>© {new Date().getFullYear()} Studix.</p>
      </footer>
    </div>
  );
}

