import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import AddTransaction from '../components/AddTransaction'

function Dashboard() {
    const [profile, setProfile] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const { logout } = useAuth()
    const navigate = useNavigate()

    const fetchTransactions = async () => {
        const res = await API.get('/transactions/')
        setTransactions(res.data)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, transactionsRes] = await Promise.all([
                    API.get('/budget-profile/'),
                    API.get('/transactions/')
                ])
                setProfile(profileRes.data)
                setTransactions(transactionsRes.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    const handleDelete = async (id) => {
    try {
        await API.delete(`/transactions/${id}`)
        fetchTransactions()
    } catch (err) {
        console.error(err)
    }
}

    if (loading) return <div>Loading...</div>

return (
    <div className="min-h-screen bg-gray-950 text-white">
        <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">BudgetApp</h1>
            <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
                Logout
            </button>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-8">
            {profile && (
                <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
                    <h2 className="text-2xl font-bold mb-4">Goal: {profile.goal_name}</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                            <p className="text-gray-400 text-sm">Monthly income</p>
                            <p className="text-2xl font-bold text-green-400">£{profile.monthly_income}</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4">
                            <p className="text-gray-400 text-sm">Savings goal</p>
                            <p className="text-2xl font-bold text-blue-400">£{profile.savings_goal}</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4">
                            <p className="text-gray-400 text-sm">Budgeting style</p>
                            <p className="text-2xl font-bold text-purple-400 capitalize">{profile.budgeting_style}</p>
                        </div>
                    </div>
                </div>
            )}

            <AddTransaction onTransactionAdded={fetchTransactions} />

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Transactions</h2>
                {transactions.length === 0 ? (
                    <p className="text-gray-400">No transactions yet</p>
                ) : (
                    transactions.map(t => (
                        <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-lg px-5 py-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium">{t.category}</p>
                                <p className="text-gray-400 text-sm">{t.description || 'No description'}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className={`text-lg font-bold ${t.transaction_type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                                    {t.transaction_type === 'income' ? '+' : '-'}£{t.amount}
                                </p>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="text-gray-600 hover:text-red-400 transition text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
)
}

export default Dashboard