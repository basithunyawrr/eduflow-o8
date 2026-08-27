'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, KeyRound, ShieldCheck } from 'lucide-react'

export default function SuperAdminPage() {
  const [pin, setPin] = useState('')
  const [message, setMessage] = useState('')

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-800 px-5 py-10 text-white">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-700/70 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <Link href="/login" className="mb-12 inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-white"><ArrowLeft size={16} /> Back to login</Link>
        <div className="mb-8 grid size-14 place-items-center rounded-2xl bg-[#FEF9C3] text-slate-800"><ShieldCheck size={27} /></div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#DCFCE7]">Restricted access</p>
        <h1 className="text-4xl font-bold tracking-[-0.04em]">Super Admin Portal</h1>
        <p className="mt-3 leading-7 text-slate-300">Enter your secure access PIN to manage EduFlow platform settings.</p>
        <form onSubmit={(event) => { event.preventDefault(); setMessage('Demo mode: PIN verification is ready to connect.') }} className="mt-8 space-y-4">
          <label className="block"><span className="mb-2 block text-sm font-bold text-slate-200">Secure PIN</span><span className="relative block"><KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input value={pin} onChange={(event) => setPin(event.target.value)} type="password" inputMode="numeric" placeholder="••••••" className="w-full rounded-2xl border border-white/10 bg-slate-800 px-11 py-4 text-sm outline-none transition placeholder:text-slate-500 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-200/10" required /></span></label>
          <button className="w-full rounded-2xl bg-[#DCFCE7] px-5 py-4 text-sm font-bold text-emerald-950 transition hover:bg-emerald-200">Unlock secure portal <ArrowRight size={16} className="ml-1 inline" /></button>
          {message && <p role="status" className="rounded-xl bg-white/10 px-3 py-2 text-center text-xs font-bold text-[#FEF9C3]">{message}</p>}
        </form>
      </section>
    </main>
  )
}
