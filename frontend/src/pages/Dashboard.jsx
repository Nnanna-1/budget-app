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

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            {profile && (
                <div>
                    <h2>Goal: {profile.goal_name}</h2>
                    <p>Monthly income: £{profile.monthly_income}</p>
                    <p>Savings goal: £{profile.savings_goal}</p>
                    <p>Budgeting style: {profile.budgeting_style}</p>
                </div>
            )}
            <AddTransaction onTransactionAdded={fetchTransactions} />
            <h2>Transactions</h2>
            {transactions.length === 0 ? (
                <p>No transactions yet</p>
            ) : (
                transactions.map(t => (
                    <div key={t.id}>
                        <p>{t.category} — £{t.amount} — {t.transaction_type}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default Dashboard