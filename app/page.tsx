'use client'

import { supabase } from '@/lib/supabase'
import { parseInput } from '@/lib/parser'
import { useEffect, useState } from 'react'

export default function Home() {
	const [input, setInput] = useState('')
	const [transactions, setTransactions] = useState<any[]>([])

	// ambil data dari supabase
	const fetchData = async () => {
		const { data, error } = await supabase
			.from('transactions')
			.select('*')
			.order('created_at', { ascending: false })

		if (error) {
			console.error(error)
		} else {
			setTransactions(data)
		}
	}

	// jalan pertama kali
	useEffect(() => {
		fetchData()
	}, [])

	const handleAdd = async () => {
		const parsed = parseInput(input)

		const { error } = await supabase
			.from('transactions')
			.insert(parsed)

		if (error) {
			alert(error.message)
		} else {
			setInput('')
			fetchData() // refresh list
		}
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

	return (
		<main className="p-4 max-w-md mx-auto">
			{/* INPUT */}
			<div className="flex gap-2 mb-4">
				<input
					className="border p-2 flex-1 rounded"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="contoh: makan 20k"
				/>

				<button
					onClick={handleAdd}
					className="bg-blue-500 text-white px-4 rounded"
				>
					Simpan
				</button>
			</div>

			{/* LIST */}
			<div>
				{transactions.length === 0 && (
					<p className="text-gray-500">Belum ada transaksi</p>
				)}

				{transactions.map((item) => (
					<div
						key={item.id}
						className="p-3 border rounded-xl mb-2"
					>
						<div className="font-semibold">{item.note}</div>
						<div>Rp {formatRupiah(item.amount)}</div>
						<div className="text-xs text-gray-500">
							{formatDate(item.created_at)}
						</div>
					</div>
				))}
			</div>
		</main>
	)
}