import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { login } = useAuth()
    const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const formData = new FormData()
        formData.append('username', email)
        formData.append('password', password)
        const res = await API.post('/auth/login', formData)
        const token = res.data.access_token
        localStorage.setItem('token', token)
        login(null, token)
        
        try {
            await API.get('/budget-profile/')
            navigate('/dashboard')
        } catch {
            navigate('/onboarding')
        }
    } catch (err) {
        setError('Invalid email or password')
    }
}

return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold text-white mb-6">Login</h1>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                    required
                />
                <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium transition"
                >
                    Login
                </button>
            </form>
            <p className="text-gray-400 text-sm mt-4 text-center">
                Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
            </p>
        </div>
    </div>
)
}

export default Login