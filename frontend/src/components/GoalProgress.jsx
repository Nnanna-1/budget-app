function GoalProgress({ transactions, profile }) {
    const totalIncome = transactions
        .filter(t => t.transaction_type === 'income')
        .reduce((acc, t) => acc + t.amount, 0)

    const totalExpenses = transactions
        .filter(t => t.transaction_type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0)

    const saved = totalIncome - totalExpenses
    const percentage = Math.min((saved / profile.savings_goal) * 100, 100)
    const isOnTrack = saved >= 0

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-1">Goal progress</h3>
            <p className="text-gray-400 text-sm mb-4">{profile.goal_name}</p>
            <div className="flex justify-between text-sm mb-2">
                <span className={isOnTrack ? 'text-green-400' : 'text-red-400'}>
                    £{saved.toFixed(2)} saved
                </span>
                <span className="text-gray-400">Goal: £{profile.savings_goal}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
                <div
                    className={`h-3 rounded-full transition-all ${isOnTrack ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.max(percentage, 0)}%` }}
                />
            </div>
            <p className="text-gray-400 text-sm mt-2">{percentage.toFixed(0)}% of goal reached</p>
        </div>
    )
}

export default GoalProgress