import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../utilities/useAuth';
import './Login.css';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return; // Prevent multiple submissions

        setError('');
        setIsLoading(true);

        if (!username || !password || !confirmPassword) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        const result = await register(username, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }

        setIsLoading(false);
    }; return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1 className="auth-title text-white font-bold">Create Account</h1>
                    <p className="auth-subtitle text-gray">Register to get started</p>
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
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            data-testid="name-input"
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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            data-testid="password-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label text-white">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="form-input"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            data-testid="confirm-password-input"
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button bg-blue text-white font-bold"
                        data-testid="register-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="text-gray">
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link text-blue">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
