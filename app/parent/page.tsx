'use client'

import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, ChevronDown, CircleDollarSign,
  Clock3, Download, FileCheck2, Heart, MessageCircle, Mic, Pause, Play, Receipt,
  Send, Sparkles, UserRound, Volume2, WalletCards, X
} from 'lucide-react'

type Tab = 'diary' | 'attendance' | 'fees' | 'ai'

const homework = [
  { subject: 'Math', detail: 'Page 42, Exercise 3.1', tone: 'bg-[#FEF9C3]' },
  { subject: 'Urdu', detail: 'Sabaq #4 Reading', tone: 'bg-[#DCFCE7]' },
  { subject: 'Science', detail: 'Draw the Water Cycle', tone: 'bg-[#FEF9C3]' },
]

const attendanceDays = [
  ['1', 'present'], ['2', 'present'], ['3', 'present'], ['4', 'holiday'], ['5', 'holiday'], ['6', 'present'], ['7', 'present'],
  ['8', 'present'], ['9', 'present'], ['10', 'present'], ['11', 'present'], ['12', 'absent'], ['13', 'present'], ['14', 'present'],
  ['15', 'present'], ['16', 'present'], ['17', 'holiday'], ['18', 'present'], ['19', 'present'], ['20', 'present'], ['21', 'present'],
  ['22', 'present'], ['23', 'present'], ['24', 'present'], ['25', 'present'], ['26', 'present'], ['27', 'present'], ['28', 'present'],
]

export default function ParentPortalPage() {
  const [tab, setTab] = useState<Tab>('diary')
  const [done, setDone] = useState<boolean[]>([false, false, false])
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<'1x' | '1.5x'>('1x')
  const [leaveOpen, setLeaveOpen] = useState(false)
  const [leaveSent, setLeaveSent] = useState(false)
  const [paid, setPaid] = useState(false)
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Assalam-o-alaikum. I’m here to help you understand Sara’s progress.' }])
  const [question, setQuestion] = useState('')

  const sendQuestion = (text = question) => {
    if (!text.trim()) return
    setMessages((current) => [...current, { from: 'parent', text }, { from: 'ai', text: 'Sara is doing wonderfully in reading and class participation. In Math, she can practise fractions and multi-step word problems for 10 minutes each evening. Keep encouraging her — she is making steady progress.' }])
    setQuestion('')
  }

  return (
    <main className="min-h-screen bg-[#FFFCF3] text-slate-800">
      <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3 font-black tracking-tight"><span className="grid size-10 place-items-center rounded-2xl bg-[#FEF9C3] text-emerald-700"><Heart size={20} fill="currentColor" /></span><span className="text-xl">Edu<span className="text-emerald-600">Flow</span></span></a>
          <div className="flex items-center gap-3"><span className="hidden text-right sm:block"><span className="block text-xs font-bold text-slate-400">Parent Portal</span><span className="font-bold">Welcome, Mrs. Ahmed</span></span><button aria-label="Profile" className="grid size-10 place-items-center rounded-full bg-[#DCFCE7] text-emerald-700"><UserRound size={19} /></button></div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-2 text-sm font-bold text-emerald-700">Friday, 28 August 2026</p><h1 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">Sara&apos;s school day, made simple.</h1><p className="mt-2 max-w-xl text-slate-500">Everything you need to stay close to her learning journey, in one calm place.</p></div><button onClick={() => setTab('ai')} className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5"><Sparkles size={16} className="text-[#FEF9C3]" /> Ask EduFlow AI</button></section>

        <section className="mb-8 grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex items-center gap-4 rounded-3xl bg-[#DCFCE7] p-5"><div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white text-2xl font-black text-emerald-700">SA</div><div><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Student</p><h2 className="text-xl font-black">Sara Ahmed</h2><p className="text-sm text-slate-600">Class 5-A · Roll #14</p></div></div>
          <div className="rounded-3xl bg-[#DCFCE7] p-5"><div className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-800"><CheckCircle2 size={18} /> Today&apos;s Attendance</div><p className="text-2xl font-black text-emerald-800">Hazir <span className="text-sm font-bold">(Present)</span></p><p className="mt-1 text-xs text-emerald-700">Marked at 7:55 AM</p></div>
          <div className="rounded-3xl bg-[#FEF9C3] p-5"><div className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-800"><CalendarDays size={18} /> Monthly Haziri</div><p className="text-2xl font-black text-slate-800">94% <span className="text-sm font-bold">(21/22 Days)</span></p><p className="mt-1 text-xs text-slate-600">Fee status: <b>Paid for August</b></p></div>
        </section>

        <nav className="mb-6 flex gap-2 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-2 shadow-sm" aria-label="Parent portal sections">
          {([['diary', 'Daily Diary', Volume2], ['attendance', 'Attendance & Leave', CalendarDays], ['fees', 'Fees & Receipts', Receipt], ['ai', 'Ask EduFlow AI', Sparkles]] as const).map(([key, label, Icon]) => <button key={key} onClick={() => setTab(key)} className={`flex min-w-fit items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${tab === key ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}><Icon size={17} /> {label}</button>)}
        </nav>

        {tab === 'diary' && <section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-900/10"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#DCFCE7]">Today&apos;s Teacher Voice Note</p><h2 className="mt-2 text-2xl font-black">A little note from Ms. Iqra</h2><p className="mt-1 text-sm text-slate-300">Sara had a brilliant day in class. Audio in Urdu.</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">0:35</span></div><div className="my-7 flex items-center gap-3"><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause voice note' : 'Play voice note'} className="grid size-14 shrink-0 place-items-center rounded-full bg-[#FEF9C3] text-slate-900 transition hover:scale-105">{playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}</button><div className="flex flex-1 items-center gap-1" aria-label="Audio waveform">{Array.from({ length: 32 }).map((_, i) => <span key={i} className={`w-1 rounded-full bg-emerald-300/80 ${playing ? 'animate-pulse' : ''}`} style={{ height: `${12 + (i * 17) % 28}px` }} />)}</div></div><div className="flex items-center justify-between text-xs text-slate-400"><span className="flex items-center gap-2"><Mic size={14} /> Ms. Iqra · Urdu diary</span><button onClick={() => setSpeed(speed === '1x' ? '1.5x' : '1x')} className="rounded-full bg-white/10 px-3 py-1.5 font-bold text-white">Speed {speed}</button></div></div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Home practice</p><h2 className="text-2xl font-black">Today&apos;s Homework</h2></div><span className="rounded-full bg-[#FEF9C3] px-3 py-1 text-xs font-bold">{done.filter(Boolean).length}/3 done</span></div><div className="space-y-3">{homework.map((item, i) => <label key={item.subject} className={`flex cursor-pointer items-center gap-3 rounded-2xl p-4 transition ${item.tone} ${done[i] ? 'opacity-60' : ''}`}><input type="checkbox" checked={done[i]} onChange={() => setDone(done.map((value, index) => index === i ? !value : value))} className="size-5 accent-emerald-600" /><span><b className={done[i] ? 'line-through' : ''}>{item.subject}</b><span className="ml-2 text-sm text-slate-600">{item.detail}</span></span></label>)}</div><button onClick={() => setDone([true, true, true])} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-800"><Check size={17} /> Mark Homework Done at Home</button></div>
        </section>}

        {tab === 'attendance' && <section className="grid gap-6 lg:grid-cols-[1fr_.8fr]"><div className="rounded-3xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">August 2026</p><h2 className="text-2xl font-black">Attendance calendar</h2></div><div className="flex gap-2 text-xs font-bold"><span className="flex items-center gap-1"><i className="size-2 rounded-full bg-emerald-500" /> Present</span><span className="flex items-center gap-1"><i className="size-2 rounded-full bg-red-400" /> Absent</span><span className="flex items-center gap-1"><i className="size-2 rounded-full bg-amber-300" /> Holiday</span></div></div><div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => <span key={day}>{day}</span>)}{Array.from({ length: 6 }).map((_, i) => <span key={`blank-${i}`} />)}{attendanceDays.map(([day, status]) => <div key={day} className="grid aspect-square place-items-center rounded-xl bg-slate-50 text-sm text-slate-700"><span className={`mb-1 size-1.5 rounded-full ${status === 'present' ? 'bg-emerald-500' : status === 'absent' ? 'bg-red-400' : 'bg-amber-300'}`} />{day}</div>)}</div></div><div className="rounded-3xl bg-[#FEF9C3] p-6"><CalendarDays className="text-amber-800" /><h2 className="mt-4 text-2xl font-black">Need a day off?</h2><p className="mt-2 text-sm leading-6 text-slate-600">Submit a chutti ki darkhwast directly to the school office.</p>{leaveSent ? <div className="mt-6 rounded-2xl bg-white p-4 text-sm font-bold text-emerald-700"><CheckCircle2 className="mb-2" /> Leave request sent successfully.</div> : <button onClick={() => setLeaveOpen(true)} className="mt-6 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white">Submit Leave Request</button>}</div></section>}

        {tab === 'fees' && <section className="grid gap-6 lg:grid-cols-[1fr_.8fr]"><div className="rounded-3xl bg-[#DCFCE7] p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">August 2026 challan</p><h2 className="mt-2 text-4xl font-black">Rs. 4,500</h2></div><span className={`rounded-full px-3 py-2 text-xs font-black ${paid ? 'bg-emerald-700 text-white' : 'bg-white text-emerald-700'}`}>{paid ? 'Paid' : 'Due 10th'}</span></div><div className="mt-8 flex flex-wrap gap-3"><button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-slate-700"><Download size={16} /> Download 3-Copy Challan</button><button onClick={() => setPaid(true)} className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-3 text-sm font-bold text-white"><WalletCards size={16} /> Pay via JazzCash / Easypaisa</button></div></div><div className="rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black">Payment history</h2><div className="mt-4 space-y-3">{['August 2026 · Rs. 4,500', 'July 2026 · Rs. 4,500', 'June 2026 · Rs. 4,500'].map((payment) => <div key={payment} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><span className="flex items-center gap-3 text-sm font-bold"><FileCheck2 className="text-emerald-600" size={18} /> {payment}</span><button aria-label={`Download receipt for ${payment}`} className="text-slate-400 hover:text-slate-800"><Download size={16} /></button></div>)}</div></div></section>}

        {tab === 'ai' && <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-center gap-3 border-b border-slate-100 pb-5"><span className="grid size-12 place-items-center rounded-2xl bg-[#FEF9C3] text-amber-800"><Sparkles size={22} /></span><div><h2 className="text-xl font-black">Ask EduFlow AI</h2><p className="text-sm text-slate-500">Ask in English or Urdu about Sara&apos;s progress.</p></div></div><div className="min-h-72 space-y-3 py-5">{messages.map((message, i) => <div key={i} className={`flex ${message.from === 'parent' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.from === 'parent' ? 'bg-slate-900 text-white' : 'bg-[#DCFCE7] text-slate-700'}`}>{message.text}</div></div>)}</div><div className="mb-4 flex flex-wrap gap-2">{['Summarize this week’s progress', 'Show upcoming exam dates', 'What does Sara need help with?'].map(prompt => <button key={prompt} onClick={() => sendQuestion(prompt)} className="rounded-full bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-[#FEF9C3]">{prompt}</button>)}</div><div className="flex gap-2 rounded-2xl bg-slate-50 p-2"><input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendQuestion()} placeholder="Sara ki Math me performance kaisi hai?" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" /><button onClick={() => sendQuestion()} aria-label="Send question" className="grid size-10 place-items-center rounded-xl bg-slate-900 text-white"><Send size={16} /></button></div></section>}
      </div>

      {leaveOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-5" role="dialog" aria-modal="true" aria-label="Submit leave request"><div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-black">Chutti ki Darkhwast</h2><button onClick={() => setLeaveOpen(false)} aria-label="Close leave request"><X /></button></div><label className="mt-6 block text-sm font-bold">Leave date<input type="date" className="mt-2 w-full rounded-2xl border border-slate-200 p-3" defaultValue="2026-08-31" /></label><label className="mt-4 block text-sm font-bold">Reason<select className="mt-2 w-full rounded-2xl border border-slate-200 p-3"><option>Illness</option><option>Family emergency</option></select></label><button onClick={() => { setLeaveSent(true); setLeaveOpen(false) }} className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 font-bold text-white">Send Request</button></div></div>}
    </main>
  )
}
