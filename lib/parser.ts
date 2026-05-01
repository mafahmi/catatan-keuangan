export function parseInput(input: string) {
  const lower = input.toLowerCase()

  // ambil angka + k / rb
  const match = lower.match(/(\d+)(k|rb)?/)

  let amount = 0

  if (match) {
    amount = parseInt(match[1])

    if (match[2] === 'k' || match[2] === 'rb') {
      amount *= 1000
    }
  }

  // hapus angka dari text → jadi note
  const note = lower.replace(/(\d+)(k|rb)?/, '').trim()

  return {
    amount,
    note
  }
}