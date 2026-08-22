import { NextResponse } from 'next/server';

export async function GET() {
  throw new Error('Sentry Integration Test Error from AI Assistant');
  return NextResponse.json({ success: true });
}
