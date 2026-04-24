'use client'

import { supabase } from '@/lib/supabase'

export default function Home() {

  const categories = [
    { id: 1, name: 'makan' },
    { id: 2, name: 'transportasi' },
    { id: 3, name: 'hiburan' },
  ]

  const randomCategory = () => {
    const randomIndex = Math.floor(Math.random() * categories.length)
    return categories[randomIndex].name
  }

  const notes = [
    { id: 1, name: 'nasi goreng' },
    { id: 2, name: 'bakso' },
    { id: 3, name: 'sate' },
  ]

  const randomNote = () => {
    const randomIndex = Math.floor(Math.random() * notes.length)
    return notes[randomIndex].name
  }

  const amount = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000

  const handleAdd = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        amount: amount,
        category: randomCategory(),
        note: randomNote(),
        created_by: '1',
      })
	  .select()

    if (error) {
      	console.error(error)
      	alert('ERROR: ' + error.message)
    } else {
		// tampilkan respon dari insert data
    	alert('Data Masuk: ' + JSON.stringify(data))
      	console.log(data)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <button 
        onClick={handleAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 active:scale-95"
      >
        Insert Data
      </button>
    </main>
  )
}