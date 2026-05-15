<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-documentation -->
# Catatan Keuangan - Project Context

## 📚 Documentation
Sebelum mengerjakan fitur baru, baca dokumentasi ini:
- `/memories/repo/features.md` - Daftar fitur yang sudah ada & roadmap
- `/memories/repo/architecture.md` - Arsitektur code & design decisions

## 🎯 Project Overview
Aplikasi pencatat pengeluaran harian dengan:
- Smart input parsing (natural language)
- Auto-detect kategori berdasarkan keyword
- Budget tracking dengan visual feedback
- Supabase sebagai backend

## 🛠️ Tech Stack
- Next.js 16.2.4 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- Supabase

## ⚠️ Important Notes
- Semua state ada di `app/page.tsx` (client component)
- Parser logic di `lib/parser.ts`
- Timezone hardcoded: Asia/Jakarta
- Budget daily masih hardcoded: Rp 100,000
<!-- END:project-documentation -->
