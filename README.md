# 💰 Catatan Keuangan

Aplikasi pencatat pengeluaran harian dengan smart input dan budget tracking.

## ✨ Features

- **Smart Input Parsing**: Tulis `makan 20k` langsung terparse
- **Auto-Detect Kategori**: Otomatis mengenali kategori dari keyword
- **Budget Tracking**: Monitor pengeluaran harian dengan visual feedback
- **Real-time Updates**: Semua perubahan langsung tersimpan dan terupdate
- **10 Kategori**: Makan & minum, transportasi, tagihan, dll.
- **Insight Dashboard**: Lihat status budget (aman/hati-hati/boros)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account

### Installation

1. Clone repository
```bash
git clone <repo-url>
cd catatan-keuangan
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Setup Supabase table
```sql
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount INTEGER NOT NULL,
  note TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📖 Usage

### Input Format
- `makan 20k` → Rp 20,000
- `bensin 50rb` → Rp 50,000
- `kopi 15000` → Rp 15,000

### Kategori Auto-Detect
Aplikasi akan otomatis mendeteksi kategori berdasarkan keyword:
- **Makan & Minum**: makan, kopi, snack, nasi, dll.
- **Transportasi**: bensin, grab, gojek, parkir, tol
- **Tagihan**: listrik, air, wifi, pulsa
- **Dan 7 kategori lainnya**

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **UI Components**: Sonner (Toast)
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
catatan-keuangan/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main app
│   └── globals.css       # Styles
├── lib/
│   ├── supabase.ts       # Supabase client
│   └── parser.ts         # Input parser
└── .env.local            # Environment variables
```

## 🔧 Development

### Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Documentation
- [Features & Roadmap](/memories/repo/features.md)
- [Architecture](/memories/repo/architecture.md)

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**MA Fahmi**

---

⭐ Star this repo if you find it useful!
