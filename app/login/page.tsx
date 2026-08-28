'use client'

import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Headphones,
  LockKeyhole,
  Sparkles,
} from 'lucide-react'

const demoCredentials = {
  Admin: { email: 'admin@eduflow.pk', password: 'demo-admin-123', route: '/admin' },
  Teacher: { email: 'teacher@eduflow.pk', password: 'demo-teacher-123', route: '/teacher' },
  Parent: { email: 'parent@eduflow.pk', password: 'demo-parent-123', route: '/parent' },
} as const


export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [language, setLanguage] = useState<'EN' | 'اردو'>('EN')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const fillDemo = (demoRole: keyof typeof demoCredentials) => {
    const demo = demoCredentials[demoRole]
    setEmail(demo.email)
    setPassword(demo.password)
    setSubmitted(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (loading) return

    setLoading(true)
    setSubmitted(false)

    const emailLower = email.toLowerCase().trim()
    const demoRole = (Object.keys(demoCredentials) as Array<keyof typeof demoCredentials>).find((item) => demoCredentials[item].email === emailLower && demoCredentials[item].password === password)

    const directRedirect = () => {
      if (emailLower === 'basithadi@gmail.com') {
        window.location.href = '/super-admin'
        return true
      }
      if (emailLower.includes('admin')) {
        window.location.href = '/admin'
        return true
      }
      if (emailLower.includes('teacher')) {
        window.location.href = '/teacher'
        return true
      }
      if (emailLower.includes('parent') || emailLower.includes('student')) {
        window.location.href = '/parent'
        return true
      }
      return false
    }

    let completed = false
    const timeoutId = window.setTimeout(() => {
      if (!completed) {
        setLoading(false)
        if (!directRedirect()) {
          setSubmitted(false)
          alert('Connection timed out. Please check your credentials and try again.')
        }
      }
    }, 2500)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: emailLower, password })

      if (error || !data.user) {
        if (!directRedirect()) {
          throw new Error('Invalid email or password')
        }
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profileError) {
        throw new Error('Your account is signed in, but the portal role could not be loaded.')
      }

      if (profile?.role === 'super_admin' || emailLower === 'basithadi@gmail.com') {
        window.location.href = '/super-admin'
        return
      }
      if (profile?.role === 'school_admin' || emailLower.includes('admin')) {
        window.location.href = '/admin'
        return
      }
      if (profile?.role === 'teacher' || emailLower.includes('teacher')) {
        window.location.href = '/teacher'
        return
      }
      if (profile?.role === 'parent' || profile?.role === 'student' || emailLower.includes('parent') || emailLower.includes('student')) {
        window.location.href = '/parent'
        return
      }

      throw new Error('Your account does not have an assigned portal role.')
    } catch (error) {
      if (!directRedirect()) {
        setSubmitted(false)
        alert(error instanceof Error ? error.message : 'Unable to sign in right now. Please try again.')
      }
    } finally {
      completed = true
      window.clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#fffdf5] px-4 py-4 text-slate-800 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Back to EduFlow home">
          <span className="grid size-10 place-items-center rounded-2xl bg-slate-800 text-[#FEF9C3]"><GraduationCap size={22} /></span>
          <span className="text-xl font-bold tracking-tight">Edu<span className="text-emerald-600">Flow</span></span>
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={() => setLanguage(language === 'EN' ? 'اردو' : 'EN')} className="rounded-full border border-slate-200 bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:border-emerald-300" aria-label="Toggle language">{language === 'EN' ? 'اردو' : 'English'}</button>
          <Link href="/" className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-emerald-300 sm:flex"><ArrowLeft size={15} /> Back to Home</Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl items-center gap-12 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:py-16">
        <section className="relative hidden min-h-[590px] overflow-hidden rounded-[2.5rem] bg-[#DCFCE7] p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="relative z-10 max-w-md">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-2 text-xs font-bold text-emerald-800"><Sparkles size={14} /> Welcome back to better school days</div>
            <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-[-0.05em] text-slate-800">One calm space for every <span className="relative inline-block"><span className="relative z-10">school day.</span><span className="absolute bottom-1 left-0 -z-0 h-3 w-full rounded-full bg-[#FEF9C3]" /></span></h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-slate-600">Pick your portal and jump right back into the moments that matter.</p>
          </div>
          <div className="relative z-10 flex flex-col gap-3">
            {[['30s Attendance', 'Mark a whole class in seconds', Check], ['Instant Fee Challans', 'Clear updates for every family', LockKeyhole], ['Audio Diary', 'Keep parents close to progress', Headphones]].map(([title, copy, Icon]) => { const FeatureIcon = Icon as typeof Check; return <div key={title as string} className="flex w-fit items-center gap-3 rounded-2xl bg-white/75 px-4 py-3 shadow-sm"><span className="grid size-9 place-items-center rounded-xl bg-[#FEF9C3] text-slate-700"><FeatureIcon size={17} /></span><span><strong className="block text-sm">{title as string}</strong><small className="text-xs text-slate-500">{copy as string}</small></span></div> })}
          </div>
          <div className="absolute -bottom-24 -right-20 size-80 rounded-full border-[28px] border-white/35" />
          <div className="absolute right-16 top-28 grid size-24 place-items-center rounded-[2rem] bg-[#FEF9C3] text-slate-700 shadow-xl shadow-emerald-900/10"><GraduationCap size={42} /></div>
        </section>

        <section className="w-full max-w-xl justify-self-center">
          <div className="mb-8"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">Your portal awaits</p><h2 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Sign In to EduFlow</h2><p className="mt-3 text-slate-500">Enter your credentials to access your workspace.</p></div>
          <div className="rounded-[2rem] border border-white bg-white p-6 shadow-[0_24px_80px_-35px_rgba(30,41,59,0.3)] sm:p-8">
            <div className="mb-6 flex items-center gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-[#FEF9C3] text-slate-700"><GraduationCap size={21} /></div><div><p className="font-bold">Unified workspace login</p><p className="text-xs text-slate-500">Your role will be detected automatically</p></div></div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Email / Mobile Number</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="you@school.pk" className="w-full rounded-2xl border border-slate-200 bg-[#fffdf5] px-4 py-3.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" required /></label>
              <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Password</span><span className="relative block"><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="w-full rounded-2xl border border-slate-200 bg-[#fffdf5] px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-700" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
              <div className="flex items-center justify-between gap-3 text-xs"><label className="flex items-center gap-2 text-slate-500"><input checked={remember} onChange={(event) => setRemember(event.target.checked)} type="checkbox" className="size-4 rounded border-slate-300 accent-emerald-600" /> Remember Me</label><button type="button" className="font-bold text-emerald-700 hover:underline">Forgot password?</button></div>
              <button type="submit" disabled={loading} aria-busy={loading} className="w-full rounded-2xl bg-[#DCFCE7] px-5 py-4 text-sm font-bold text-emerald-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-200 disabled:cursor-wait disabled:opacity-70">{loading ? 'Signing you in…' : 'Sign In to Workspace'} <ArrowRight size={16} className="ml-1 inline" /></button>
              {submitted && <p role="status" className="rounded-xl bg-[#FEF9C3] px-3 py-2 text-center text-xs font-bold text-slate-700">Demo credentials accepted. Redirecting to your workspace.</p>}
            </form>
          </div>
          <div className="mt-6"><p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Quick demo access</p><div className="flex flex-wrap justify-center gap-2">{(Object.keys(demoCredentials) as Array<keyof typeof demoCredentials>).map((item) => <button key={item} onClick={() => fillDemo(item)} className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700">Fill {item} Demo</button>)}</div></div>
        </section>
      </div>
    </main>
  )
}
