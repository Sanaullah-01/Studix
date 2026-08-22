import * as React from 'react';

interface WelcomeEmailProps {
  fullName: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  fullName,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '40px 20px', maxWidth: '600px', margin: '0 auto', color: '#333' }}>
    <h1 style={{ color: '#000', fontSize: '24px', marginBottom: '20px' }}>Welcome to Studix, {fullName}! 🎓</h1>
    
    <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
      We are thrilled to have you onboard. You've just taken the first step towards a more organized and productive academic journey.
    </p>
    
    <h3 style={{ marginTop: '30px', fontSize: '18px' }}>Here is what you can do right away:</h3>
    <ul style={{ fontSize: '16px', lineHeight: '1.6', paddingLeft: '20px' }}>
      <li><strong>✨ AI-Powered Assistant:</strong> Get instant help with your studies, summarize notes, and prepare for exams.</li>
      <li><strong>📚 Centralized Courses:</strong> Keep all your assignments, deadlines, and course materials in one beautiful workspace.</li>
      <li><strong>⏱️ Study Sessions:</strong> Track your focus time and build better academic habits.</li>
    </ul>

    <p style={{ fontSize: '16px', lineHeight: '1.5', marginTop: '30px' }}>
      Log in to your dashboard to customize your profile and start adding your current semester courses!
    </p>
    
    <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eaeaea' }}>
      <p style={{ fontSize: '14px', color: '#666' }}>Best regards,<br/><strong>The Studix Team</strong></p>
    </div>
  </div>
);

