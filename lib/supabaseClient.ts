import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://zensegkhzepjyxdentkm.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'sb_publishable_RKCuHr-9cL67xp7IqbY_yw_ae07sUru'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
