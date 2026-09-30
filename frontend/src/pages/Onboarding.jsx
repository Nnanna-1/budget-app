import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

function Onboarding() {
    const [monthlyIncome, setMonthlyIncome] = useState('')
    const [budgetingStyle, setBudgetingStyle] = useState('balanced')
    const [savingsGoal, setSavingsGoal] = useState('')
    const [goalName, setGoalName] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await API.post('/budget-profile/', {
                monthly_income: parseFloat(monthlyIncome),
                budgeting_style: budgetingStyle,
                savings_goal: parseFloat(savingsGoal),
                goal_name: goalName
            })
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.detail || 'Something went wrong')
        }
    }

return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-lg">
            <h1 className="text-2xl font-bold text-white mb-2">Set up your budget</h1>
            <p className="text-gray-400 text-sm mb-6">Tell us about your finances to get started</p>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="text-gray-400 text-sm mb-1 block">Monthly income (£)</label>
                    <input
                        type="number"
                        placeholder="e.g. 2000"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="text-gray-400 text-sm mb-1 block">Budgeting style</label>
                    <select 
                        value={budgetingStyle} 
                        onChange={(e) => setBudgetingStyle(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                    >
                        <option value="relaxed">Relaxed — 50/30/20</option>
                        <option value="balanced">Balanced — more savings</option>
                        <option value="aggressive">Aggressive — maximum savings</option>
                    </select>
                </div>
                <div>
                    <label className="text-gray-400 text-sm mb-1 block">Savings goal (£)</label>
                    <input
                        type="number"
                        placeholder="e.g. 500"
                        value={savingsGoal}
                        onChange={(e) => setSavingsGoal(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="text-gray-400 text-sm mb-1 block">Goal name</label>
                    <input
                        type="text"
                        placeholder="e.g. Emergency fund"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium transition"
                >
                    Get started
                </button>
            </form>
        </div>
    </div>
)
}

export default Onboarding