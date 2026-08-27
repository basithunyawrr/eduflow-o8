'use client'

import { useState } from 'react'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Mic,
  Plus,
  Send,
  Trash2,
  Volume2,
  XCircle,
  AlertCircle,
  FileText,
  BarChart3,
  Users,
  Calendar,
} from 'lucide-react'

type AttendanceStatus = 'present' | 'absent' | 'leave'
type Tab = 'attendance' | 'diary' | 'gradebook'

interface Student {
  id: number
  name: string
  rollNo: number
  avatar: string
  status?: AttendanceStatus
}

interface GradeEntry {
  id: number
  name: string
  rollNo: number
  maxMarks: number
  obtained: number
}

const mockStudents: Student[] = [
  { id: 1, name: 'Ahmed Hassan', rollNo: 1, avatar: '👦', status: 'present' },
  { id: 2, name: 'Fatima Khan', rollNo: 2, avatar: '👧', status: 'present' },
  { id: 3, name: 'Hassan Ali', rollNo: 3, avatar: '👦', status: 'absent' },
  { id: 4, name: 'Ayesha Malik', rollNo: 4, avatar: '👧', status: 'present' },
  { id: 5, name: 'Muhammad Raza', rollNo: 5, avatar: '👦', status: 'leave' },
  { id: 6, name: 'Zainab Ahmed', rollNo: 6, avatar: '👧', status: 'present' },
  { id: 7, name: 'Ali Hussain', rollNo: 7, avatar: '👦', status: 'present' },
  { id: 8, name: 'Saira Nasir', rollNo: 8, avatar: '👧', status: 'present' },
  { id: 9, name: 'Omar Farooq', rollNo: 9, avatar: '👦', status: 'present' },
  { id: 10, name: 'Noor Fatima', rollNo: 10, avatar: '👧', status: 'absent' },
]

const subjects = ['Mathematics', 'Urdu', 'English', 'Science']

function getGradeLetter(percentage: number): string {
  if (percentage >= 90) return 'A+'
  if (percentage >= 80) return 'A'
  if (percentage >= 70) return 'B'
  if (percentage >= 60) return 'C'
  return 'D'
}

function getGradeColor(grade: string): string {
  switch (grade) {
    case 'A+':
    case 'A':
      return 'bg-green-100 text-green-800'
    case 'B':
      return 'bg-blue-100 text-blue-800'
    case 'C':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-red-100 text-red-800'
  }
}

export default function TeacherPortal() {
  const [activeTab, setActiveTab] = useState<Tab>('attendance')
  const [selectedClass, setSelectedClass] = useState('Class 5-A')
  const [showClassDropdown, setShowClassDropdown] = useState(false)
  const [students, setStudents] = useState(mockStudents)
  const [recordingSubject, setRecordingSubject] = useState<string | null>(null)
  const [diaryEntries, setDiaryEntries] = useState<Record<string, string>>({})
  const [gradeEntries, setGradeEntries] = useState<GradeEntry[]>(
    mockStudents.map((s) => ({
      id: s.id,
      name: s.name,
      rollNo: s.rollNo,
      maxMarks: 100,
      obtained: 0,
    }))
  )
  const [sendAlert, setSendAlert] = useState(true)

  const classes = ['Class 5-A', 'Class 5-B', 'Class 6-A', 'Class 6-B']

  const presentCount = students.filter((s) => s.status === 'present').length
  const absentCount = students.filter((s) => s.status === 'absent').length

  const handleMarkAllPresent = () => {
    setStudents(students.map((s) => ({ ...s, status: 'present' })))
  }

  const toggleAttendance = (id: number, status: AttendanceStatus) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, status: s.status === status ? 'present' : status } : s))
    )
  }

  const handleDiaryChange = (subject: string, value: string) => {
    setDiaryEntries({ ...diaryEntries, [subject]: value })
  }

  const toggleRecording = (subject: string) => {
    setRecordingSubject(recordingSubject === subject ? null : subject)
  }

  const updateGradeEntry = (id: number, field: 'obtained' | 'maxMarks', value: number) => {
    setGradeEntries(
      gradeEntries.map((g) => (g.id === id ? { ...g, [field]: Math.max(0, value) } : g))
    )
  }

  const getTodayDate = () => 'Friday, August 28, 2026'

  return (
    <main className="min-h-screen bg-[#fffdf5] text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#FEF9C3] to-[#DCFCE7] text-slate-700">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-tight">Ms. Iqra</h1>
                <p className="text-xs text-slate-500">Class Teacher · {selectedClass}</p>
              </div>
            </div>

            {/* Class Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowClassDropdown(!showClassDropdown)}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                {selectedClass}
                <ChevronDown size={16} className={showClassDropdown ? 'rotate-180' : ''} />
              </button>
              {showClassDropdown && (
                <div className="absolute right-0 top-full mt-2 w-40 rounded-2xl border border-slate-200 bg-white shadow-lg">
                  {classes.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => {
                        setSelectedClass(cls)
                        setShowClassDropdown(false)
                      }}
                      className="block w-full px-4 py-2.5 text-left text-sm font-bold text-slate-700 transition hover:bg-emerald-50 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="hidden items-center gap-3 sm:flex">
              <div className="rounded-xl bg-gradient-to-br from-[#FEF9C3]/40 to-transparent px-3 py-2 text-center">
                <p className="text-xs font-bold text-slate-600">Total</p>
                <p className="text-lg font-bold text-slate-800">{students.length}</p>
              </div>
              <div className="rounded-xl bg-green-50 px-3 py-2 text-center">
                <p className="text-xs font-bold text-green-700">Present</p>
                <p className="text-lg font-bold text-green-700">{presentCount}</p>
              </div>
              <div className="rounded-xl bg-red-50 px-3 py-2 text-center">
                <p className="text-xs font-bold text-red-700">Absent</p>
                <p className="text-lg font-bold text-red-700">{absentCount}</p>
              </div>
            </div>
          </div>

          {/* Date Display */}
          <p className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-500">
            <Calendar size={14} />
            Today: {getTodayDate()}
          </p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div role="tablist" aria-label="Portal sections" className="flex gap-1 overflow-x-auto">
            {[
              { id: 'attendance', label: 'Fast Attendance', icon: CheckCircle2 },
              { id: 'diary', label: 'Homework & Diary', icon: BookOpen },
              { id: 'gradebook', label: 'Gradebook', icon: BarChart3 },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                onClick={() => setActiveTab(id as Tab)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition ${
                  activeTab === id
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold">Mark Attendance</h2>
              <button
                onClick={handleMarkAllPresent}
                className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 py-3 font-bold text-white transition hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30"
              >
                <CheckCircle2 size={19} />
                Mark All Present
              </button>
            </div>

            {/* Student Grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{student.avatar}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-500">Roll No. {student.rollNo}</p>
                        <p className="text-sm font-bold text-slate-800">{student.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => toggleAttendance(student.id, 'present')}
                      className={`flex flex-col items-center gap-1 rounded-xl py-2 px-1 text-xs font-bold transition ${
                        student.status === 'present'
                          ? 'bg-green-100 text-green-700 shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-green-50'
                      }`}
                      aria-label={`Mark ${student.name} present`}
                    >
                      <CheckCircle2 size={17} />
                      <span>Hazir</span>
                    </button>
                    <button
                      onClick={() => toggleAttendance(student.id, 'absent')}
                      className={`flex flex-col items-center gap-1 rounded-xl py-2 px-1 text-xs font-bold transition ${
                        student.status === 'absent'
                          ? 'bg-red-100 text-red-700 shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-red-50'
                      }`}
                      aria-label={`Mark ${student.name} absent`}
                    >
                      <XCircle size={17} />
                      <span>Ghair</span>
                    </button>
                    <button
                      onClick={() => toggleAttendance(student.id, 'leave')}
                      className={`flex flex-col items-center gap-1 rounded-xl py-2 px-1 text-xs font-bold transition ${
                        student.status === 'leave'
                          ? 'bg-yellow-100 text-yellow-700 shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-yellow-50'
                      }`}
                      aria-label={`Mark ${student.name} leave`}
                    >
                      <AlertCircle size={17} />
                      <span>Chutti</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Bar */}
            <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/95 backdrop-blur-xl">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={sendAlert}
                    onChange={(e) => setSendAlert(e.target.checked)}
                    className="size-4 rounded border-slate-300 accent-emerald-600"
                  />
                  Send SMS/WhatsApp alert to absent parents
                </label>
                <button className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30">
                  <Send size={17} />
                  Submit Attendance
                </button>
              </div>
            </div>
            <div className="h-20" />
          </section>
        )}

        {/* Homework & Diary Tab */}
        {activeTab === 'diary' && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Homework & Audio Diary</h2>

            <div className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">{subject}</h3>
                    <span className="text-xs font-bold text-slate-500">Daily Entry</span>
                  </div>

                  <textarea
                    value={diaryEntries[subject] || ''}
                    onChange={(e) => handleDiaryChange(subject, e.target.value)}
                    placeholder={`Write daily homework and notes for ${subject}...`}
                    className="mb-4 w-full rounded-xl border border-slate-200 bg-[#fffdf5] p-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    rows={3}
                  />

                  {/* Audio Recorder Widget */}
                  <div className="mb-4 rounded-2xl bg-gradient-to-br from-[#DCFCE7]/30 to-[#FEF9C3]/30 p-4">
                    <p className="mb-3 text-sm font-bold text-slate-700">Record 30-second Voice Note</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleRecording(subject)}
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                          recordingSubject === subject
                            ? 'animate-pulse bg-red-500 text-white'
                            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        }`}
                        aria-label={recordingSubject === subject ? 'Stop recording' : 'Start recording'}
                      >
                        <Mic size={20} />
                      </button>
                      {recordingSubject === subject && (
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className="h-6 w-1 rounded-full bg-emerald-400"
                              style={{
                                animation: `pulse ${0.3 + i * 0.1}s infinite`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                      {!recordingSubject && (
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Volume2 size={16} />
                          <span>Ready to record</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Attach Homework */}
                  <div className="mb-4 rounded-2xl border-2 border-dashed border-slate-300 p-4 text-center">
                    <input type="file" id={`file-${subject}`} className="hidden" accept="image/*,.pdf" />
                    <label
                      htmlFor={`file-${subject}`}
                      className="flex flex-col items-center gap-2 cursor-pointer text-sm font-bold text-slate-600 transition hover:text-emerald-700"
                    >
                      <FileText size={20} />
                      <span>Attach PDF / Image Homework</span>
                    </label>
                  </div>

                  <button className="w-full rounded-2xl bg-gradient-to-r from-[#FEF9C3] to-[#DCFCE7] px-4 py-3 font-bold text-slate-800 transition hover:shadow-md hover:shadow-emerald-200/50">
                    Publish {subject} Diary
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gradebook Tab */}
        {activeTab === 'gradebook' && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Gradebook / Marks Entry</h2>
              <button className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700">
                <BarChart3 size={16} />
                Generate Report Cards
              </button>
            </div>

            {/* Gradebook Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-gradient-to-r from-[#FEF9C3]/40 to-[#DCFCE7]/40">
                    <th className="px-4 py-3 text-left font-bold text-slate-700">Roll</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-700">Student Name</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-700">Max Marks</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-700">Obtained</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-700">%</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-700">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeEntries.map((entry, idx) => {
                    const percentage = entry.maxMarks > 0 ? (entry.obtained / entry.maxMarks) * 100 : 0
                    const grade = getGradeLetter(percentage)
                    return (
                      <tr key={entry.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-4 py-3 font-bold text-slate-600">{entry.rollNo}</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{entry.name}</td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            value={entry.maxMarks}
                            onChange={(e) => updateGradeEntry(entry.id, 'maxMarks', parseInt(e.target.value) || 0)}
                            className="w-16 rounded border border-slate-200 bg-[#fffdf5] px-2 py-1 text-center text-sm font-bold outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            value={entry.obtained}
                            onChange={(e) => updateGradeEntry(entry.id, 'obtained', parseInt(e.target.value) || 0)}
                            className="w-16 rounded border border-slate-200 bg-[#fffdf5] px-2 py-1 text-center text-sm font-bold outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                          />
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-slate-700">{Math.round(percentage)}%</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`rounded-lg px-2.5 py-1.5 text-xs font-bold ${getGradeColor(grade)}`}>
                            {grade}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Auto-Calculate Button */}
            <button className="w-full rounded-2xl bg-blue-100 px-5 py-4 font-bold text-blue-800 transition hover:bg-blue-200">
              Auto-Calculate Percentages & Generate Report Cards
            </button>
          </section>
        )}
      </div>
    </main>
  )
}
