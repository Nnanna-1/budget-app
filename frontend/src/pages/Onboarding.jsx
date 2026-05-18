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
        <div>
            <h1>Set up your budget</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Monthly income (£)</label>
                    <input
                        type="number"
                        placeholder="e.g. 2000"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                    />
                </div>
                <div>
                    <label>Budgeting style</label>
                    <select value={budgetingStyle} onChange={(e) => setBudgetingStyle(e.target.value)}>
                        <option value="relaxed">Relaxed — 50/30/20</option>
                        <option value="balanced">Balanced — more savings</option>
                        <option value="aggressive">Aggressive — maximum savings</option>
                    </select>
                </div>
                <div>
                    <label>Savings goal (£)</label>
                    <input
                        type="number"
                        placeholder="e.g. 500"
                        value={savingsGoal}
                        onChange={(e) => setSavingsGoal(e.target.value)}
                    />
                </div>
                <div>
                    <label>Goal name</label>
                    <input
                        type="text"
                        placeholder="e.g. Emergency fund"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                    />
                </div>
                <button type="submit">Get started</button>
            </form>
        </div>
    )
}

export default Onboarding