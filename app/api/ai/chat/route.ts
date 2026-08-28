import { NextResponse } from 'next/server'

const systemInstruction =
  'You are EduFlow AI Companion for Pakistani schools. You speak friendly, empathetic Roman Urdu / English. You provide clear updates about student attendance, homework completion, exam performance, and constructive tips for parents. Keep responses concise, clear, and reassuring.'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    const studentName = typeof body.studentName === 'string' ? body.studentName.trim() : 'Sara'
    const classContext = typeof body.classContext === 'string' ? body.classContext.trim() : 'Class 5-A'

    if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
    if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: 'AI service is not configured.' }, { status: 503 })

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: 'user', parts: [{ text: `Student: ${studentName}\nClass context: ${classContext}\nParent question: ${message}` }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 450 },
      }),
    })

    if (!response.ok) return NextResponse.json({ error: 'AI service is temporarily unavailable.' }, { status: 502 })
    const data = await response.json()
    const reply = data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join('').trim()
    if (!reply) return NextResponse.json({ error: 'AI did not return a response.' }, { status: 502 })

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ error: 'Unable to reach EduFlow AI right now.' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

// Gemini requests are intentionally server-side so GEMINI_API_KEY never reaches the browser.
// Preview mode is handled by the Parent Portal fallback response when this route is unavailable.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _routeContract = { studentName: 'string', classContext: 'string', message: 'string', reply: 'string' }

void _routeContract
