'use client'

import { supabase } from '@/lib/supabase'
import { parseInput } from '@/lib/parser'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Home() {
	const [input, setInput] = useState('')
	const [category, setCategory] = useState('')
	const [transactions, setTransactions] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	// ambil data dari supabase
	const fetchData = async () => {
		setLoading(true)
		const { data, error } = await supabase
			.from('transactions')
			.select('*')
			.order('created_at', { ascending: false })

		if (error) {
			console.error(error)
		} else {
			setTransactions(data)
		}
		setLoading(false)
	}

	// jalan pertama kali
	useEffect(() => {
		fetchData()
	}, [])

	const handleAdd = async () => {
		const parsed = parseInput(input)

		// tampilkan di logs
		console.log('Parsed Input:', parsed)
		console.log('Selected Category:', category)

		// validasi sederhana
		if (!parsed) {
			toast.error('Format salah. Contoh: makan 20k')
			return
		}

		if (parsed.amount <= 0) {
			toast.error('Berikan Informasi Harga yang Benar, Contoh "makan 20k"')
			return
		}

		if (!parsed.note) {
			toast.error('Catatan tidak boleh kosong')
			return
		}

		// Tambahkan category ke data
		const dataToInsert = {
			...parsed,
			category: category || 'lainnya' // default ke 'lainnya' jika kosong
		}

		const { error } = await supabase
			.from('transactions')
			.insert(dataToInsert)

		if (error) {
			toast.error(error.message)
		} else {
			setInput('')
			setCategory('') // reset kategori juga
			
			// Hitung sisa budget
			const newTotal = todayStats.total + parsed.amount
			const remaining = DAILY_BUDGET - newTotal
			
			toast.success('Tersimpan!', {
				description: `Sisa budget: Rp ${formatRupiah(remaining)}`
			})
			
			fetchData() // refresh list
		}
	}

	// kategori utama untuk dropdown, nanti bisa ditambah dengan subkategori jika perlu
	const MAIN_CATEGORIES = [
		'makan_minum',
		'transportasi',
		'rumah_tangga',
		'tagihan',
		'kesehatan',
		'hiburan',
		'cicilan',
		'investasi',
		'sedekah',
		'lainnya'
	] as const

	type Category = typeof MAIN_CATEGORIES[number]

	// Auto-detect kategori berdasarkan keyword
	const detectCategory = (text: string): string => {
		const lower = text.toLowerCase()
		
		// Keywords untuk setiap kategori
		const keywords: Record<string, string[]> = {
			makan_minum: ['makan', 'minum', 'kopi', 'snack', 'nasi', 'resto', 'warung', 'jajan', 'sarapan', 'minum'],
			transportasi: ['bensin', 'grab', 'gojek', 'parkir', 'tol', 'ojek', 'taxi', 'bus', 'kereta'],
			rumah_tangga: ['beras', 'sabun', 'deterjen', 'belanja', 'pasar', 'supermarket', 'tisu', 'shampoo'],
			tagihan: ['listrik', 'air', 'wifi', 'internet', 'pulsa', 'token', 'pdam', 'pln'],
			kesehatan: ['obat', 'dokter', 'rumah sakit', 'apotek', 'vitamin', 'medical', 'klinik'],
			hiburan: ['nonton', 'bioskop', 'game', 'netflix', 'spotify', 'hiburan', 'rekreasi'],
			cicilan: ['cicilan', 'angsuran', 'kredit', 'paylater', 'installment'],
			investasi: ['tabungan', 'emas', 'saham', 'reksadana', 'crypto', 'invest', 'deposito'],
			sedekah: ['sedekah', 'donasi', 'infaq', 'zakat', 'amal', 'sumbangan'],
		}
		
		// Cek setiap kategori
		for (const [cat, words] of Object.entries(keywords)) {
			if (words.some(word => lower.includes(word))) {
				return cat
			}
		}
		
		return 'lainnya' // default
	}

	// Handler untuk input dengan auto-detect
	const handleInputChange = (text: string) => {
		setInput(text)
		const detectedCat = detectCategory(text)
		setCategory(detectedCat)
		console.log('Detected category:', detectedCat) // debug
	}

	// helper format
	const formatRupiah = (angka: number) => {
		return angka.toLocaleString('id-ID')
	}

	const formatDate = (date: string) => {
		return new Date(date).toLocaleString('id-ID', {
			timeZone: 'Asia/Jakarta',
		})
	}

	// hitung total dan jumlah transaksi hari ini
	const todayStats = transactions.reduce(
		(acc, item) => {
			const today = new Date()
			const createdAt = new Date(item.created_at)

			const isToday =
				createdAt.getDate() === today.getDate() &&
				createdAt.getMonth() === today.getMonth() &&
				createdAt.getFullYear() === today.getFullYear()

			if (isToday) {
				acc.total += item.amount
				acc.count += 1
			}

			return acc
		},
		{ total: 0, count: 0 }
	)

	// Budget & Insight
	const DAILY_BUDGET = 100000 // hardcode 100k dulu
	const usagePercentage = (todayStats.total / DAILY_BUDGET) * 100
	
	// Status berdasarkan persentase
	const getStatus = () => {
		if (usagePercentage < 50) return { label: 'aman', color: 'text-green-600' }
		if (usagePercentage < 80) return { label: 'hati-hati', color: 'text-yellow-600' }
		return { label: 'boros', color: 'text-red-600' }
	}
	
	const status = getStatus()

	return (
		<main className="p-4 max-w-md mx-auto">
			{/* INPUT */}

			<div className='shadow-xl p-4 mb-6 rounded-lg'>

				<div className="flex flex-row mb-2">
					<div className="basis-full">
						<label className="block text-sm font-medium mb-1">Keterangan & Harga</label>
						<input
							className="border p-2 flex-1 rounded w-full"
							value={input}
							onChange={(e) => handleInputChange(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
							placeholder="contoh: makan 20k"
							autoFocus
						/>
					</div>
				</div>		
				<div className="flex flex-row mb-2">
					<div className="basis-full">
						<label className="block text-sm font-medium mb-1">Kategori</label>
						<select 
							className="border p-2 rounded w-full"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							<option value="">Pilih Kategori</option>
							{MAIN_CATEGORIES.map((cat) => (
								<option key={cat} value={cat}>
									{cat.replace('_', ' ')}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="flex flex-row mb-2 justify-center">
					<div className="basis-50">
						<button
							onClick={handleAdd}
							className="bg-blue-500 shadow-lg shadow-blue-500/50 text-white px-4 rounded w-full py-2"
						>
							Simpan
						</button>
					</div>
				</div>
			</div>

			{/* hitung total hari ini dan jumlah transaksi */}
			<div className="mb-4 text-lg font-semibold">
				Total hari ini: Rp {formatRupiah(todayStats.total)} ({todayStats.count} transaksi)
			</div>

			{/* INSIGHT SECTION - "otak" aplikasi */}
			<div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
				<div className="text-sm text-gray-600 mb-2">💡 Insight</div>

				{ loading ? (
					<div className="animate-pulse h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
				) : (
					<>
					<div className="font-semibold text-gray-800 mb-3">
						Kamu sudah pakai {usagePercentage.toFixed(0)}% budget hari ini
					</div>
					
					<div className="flex items-center gap-2">
						<div className="flex-1 bg-gray-200 rounded-full h-2">
							<div 
								className={`h-2 rounded-full ${
									usagePercentage < 50 ? 'bg-green-500' : 
									usagePercentage < 80 ? 'bg-yellow-500' : 
									'bg-red-500'
								}`}
								style={{ width: `${Math.min(usagePercentage, 100)}%` }}
							/>
						</div>
						<span className={`text-sm font-semibold ${status.color}`}>
							{status.label}
						</span>
					</div>
				</>
				) }

				<div className="text-xs text-gray-500 mt-2">
					Budget harian: Rp {formatRupiah(DAILY_BUDGET)}
				</div>
			</div>

			{/* LIST */}
			<div>
				{loading ? (
					// Loading skeleton dengan pulse animation
					<div className="space-y-2">
						{[1, 2, 3].map((n) => (
							<div key={n} className="animate-pulse p-3 border rounded-xl mb-2">
								<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
								<div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
								<div className="h-3 bg-gray-200 rounded w-1/4"></div>
							</div>
						))}
					</div>
				) : transactions.length === 0 ? (
					<p className="text-gray-500 animate-in fade-in duration-500">Belum ada transaksi</p>
				) : (
					transactions.map((item, index) => (
						<div
							key={item.id}
							className="animate-in fade-in slide-in-from-bottom-2 duration-300 p-3 border rounded-xl mb-2"
							style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
						>
							<div className="flex justify-between items-start">
								<div className="font-semibold">{item.note}</div>
								{item.category && (
									<span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
										{item.category.replace('_', ' ')}
									</span>
								)}
							</div>
							<div>Rp {formatRupiah(item.amount)}</div>
							<div className="text-xs text-gray-500">
								{formatDate(item.created_at)}
							</div>
						</div>
					))
				)}
			</div>
		</main>
	)
}