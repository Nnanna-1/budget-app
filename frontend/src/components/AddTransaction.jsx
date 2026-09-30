import { useState } from 'react'
import API from '../api'

function AddTransaction({ onTransactionAdded }) {
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [transactionType, setTransactionType] = useState('expense')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await API.post('/transactions/', {
                amount: parseFloat(amount),
                category,
                description,
                transaction_type: transactionType
            })
            setAmount('')
            setCategory('')
            setDescription('')
            setTransactionType('expense')
            onTransactionAdded()
        } catch (err) {
            setError('Failed to add transaction')
        }
    }

return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4">Add Transaction</h3>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap">
            <select 
                value={transactionType} 
                onChange={(e) => setTransactionType(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm w-28"
                required
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm w-36"
                required
            />
            <input
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm flex-1"
            />
            <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
            >
                Add
            </button>
        </form>
    </div>
)
}

export default AddTransaction