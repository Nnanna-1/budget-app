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
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    )
}

export default Login