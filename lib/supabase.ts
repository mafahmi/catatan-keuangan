import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
	console.error('Missing Supabase environment variables')
	throw new Error('Supabase URL and Key must be provided')
}

export const supabase = createClient(supabaseUrl, supabaseKey)