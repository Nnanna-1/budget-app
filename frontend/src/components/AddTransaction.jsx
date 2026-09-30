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
        <div>
            <h3>Add Transaction</h3>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddTransaction