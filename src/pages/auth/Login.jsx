import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../utilities/useAuth';
import './Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        const result = await login(username, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1 className="auth-title text-white font-bold">Welcome Back</h1>
                    <p className="auth-subtitle text-gray">Login to your account</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-message bg-red text-white">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username" className="form-label text-white">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="form-input"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label text-white">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="auth-button bg-blue text-white font-bold">
                        Login
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="text-gray">
                        Don't have an account?{' '}
                        <Link to="/register" className="auth-link text-blue">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
